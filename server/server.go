package server

import (
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

// Server handles HTTP requests for the AHK Builder
type Server struct {
	port       int
	mux        *http.ServeMux
	server     *http.Server
	saveDir    string
}

// New creates a new Server instance
func New() *Server {
	s := &Server{
		mux:    http.NewServeMux(),
		saveDir: ".",
	}
	s.routes()
	return s
}

func (s *Server) routes() {
	// Serve embedded frontend
	s.mux.Handle("/", http.FileServer(getFrontendFS()))

	// API endpoints
	s.mux.HandleFunc("/api/save-ahk", s.handleSaveAHK)
	s.mux.HandleFunc("/api/run", s.handleRun)
	s.mux.HandleFunc("/api/save-project", s.handleSaveProject)
	s.mux.HandleFunc("/api/load-project", s.handleLoadProject)
}

// SaveAHKRequest is the request to save an AHK file
type SaveAHKRequest struct {
	Code     string `json:"code"`
	Filename string `json:"filename"`
}

// SaveProjectRequest is the request to save a project
type SaveProjectRequest struct {
	XML       string `json:"xml"`
	ProjectName string `json:"projectName"`
}

// handleSaveAHK saves the generated AHK code to a file
func (s *Server) handleSaveAHK(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SaveAHKRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	filename := req.Filename
	if filename == "" {
		filename = "output.ahk"
	}
	if !strings.HasSuffix(strings.ToLower(filename), ".ahk") {
		filename += ".ahk"
	}

	// Sanitize filename
	filename = filepath.Base(filename)
	filePath := filepath.Join(s.saveDir, filename)

	if err := os.WriteFile(filePath, []byte(req.Code), 0644); err != nil {
		http.Error(w, fmt.Sprintf("Failed to save file: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":   "ok",
		"filename": filename,
		"path":     filePath,
	})
}

// handleRun runs the AHK script using AutoHotkey
func (s *Server) handleRun(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read body", http.StatusBadRequest)
		return
	}

	var req struct {
		Code    string `json:"code"`
		Version string `json:"version"`
	}
	if err := json.Unmarshal(body, &req); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Save to a temp file in a more persistent location
	tmpDir := os.TempDir()
	tmpFile, err := os.CreateTemp(tmpDir, "ahk-*.ahk")
	if err != nil {
		http.Error(w, "Failed to create temp file", http.StatusInternalServerError)
		return
	}

	if _, err := tmpFile.WriteString(req.Code); err != nil {
		tmpFile.Close()
		os.Remove(tmpFile.Name())
		http.Error(w, "Failed to write temp file", http.StatusInternalServerError)
		return
	}
	tmpFile.Close()

	// Schedule cleanup of the temp file after 30 seconds
	// This gives AHK enough time to read and compile the script
	tmpPath := tmpFile.Name()
	go func() {
		// Wait, then delete
		for i := 0; i < 30; i++ {
			time.Sleep(1 * time.Second)
			// Check if file still exists and if AHK still has it open
			if _, err := os.Stat(tmpPath); os.IsNotExist(err) {
				return // already deleted
			}
		}
		os.Remove(tmpPath)
	}()

	// Try to find AutoHotkey - check for v2 first if version is v2
	ahkPath := findAutoHotkey(req.Version)

	var cmd *exec.Cmd
	if ahkPath != "" {
		cmd = exec.Command(ahkPath, tmpPath)
	} else {
		// Try running the .ahk file via Windows association
		cmd = exec.Command("cmd", "/c", "start", "", ""+tmpPath+"")
	}

	if err := cmd.Start(); err != nil {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "error",
			"message": fmt.Sprintf("Failed to run: %v. AutoHotkey not found.", err),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "ok",
		"message": "Script started! The temp script will be cleaned up after 30 seconds.",
		"path":    tmpPath,
	})
}

// findAutoHotkey looks for AutoHotkey installation
// If version is "v2", it prefers the v2 executable
func findAutoHotkey(version string) string {
	// Common AutoHotkey installation paths
	v1Names := []string{"AutoHotkey.exe", "AutoHotkey32.exe", "AutoHotkeyA32.exe", "AutoHotkeyU32.exe", "AutoHotkeyU64.exe"}
	v2Names := []string{"AutoHotkey64.exe", "AutoHotkey32.exe", "AutoHotkey.exe"}
	
	paths := []string{
		"C:\\Program Files\\AutoHotkey",
		"C:\\Program Files (x86)\\AutoHotkey",
		filepath.Join(os.Getenv("LOCALAPPDATA"), "AutoHotkey"),
	}

	var names []string
	if version == "v2" {
		names = v2Names
		// Also try AutoHotkey64.exe from the v2 directory
		paths = append(paths, "C:\\Program Files\\AutoHotkey\\v2")
	} else {
		names = v1Names
	}

	for _, dir := range paths {
		for _, name := range names {
			fullPath := filepath.Join(dir, name)
			if _, err := os.Stat(fullPath); err == nil {
				return fullPath
			}
		}
	}

	// Try to find via where command
	for _, name := range names {
		cmd := exec.Command("where", name)
		if output, err := cmd.Output(); err == nil {
			path := strings.TrimSpace(string(output))
			if path != "" {
				// Take the first line only
				if idx := strings.Index(path, "\n"); idx > 0 {
					path = path[:idx]
				}
				return strings.TrimSpace(path)
			}
		}
	}

	return ""
}

// handleSaveProject saves the Blockly workspace XML
func (s *Server) handleSaveProject(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SaveProjectRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	name := req.ProjectName
	if name == "" {
		name = "untitled"
	}
	name = filepath.Base(name)
	if !strings.HasSuffix(strings.ToLower(name), ".xml") {
		name += ".xml"
	}

	filePath := filepath.Join(s.saveDir, name)
	if err := os.WriteFile(filePath, []byte(req.XML), 0644); err != nil {
		http.Error(w, "Failed to save project", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status": "ok",
		"path":   filePath,
	})
}

// handleLoadProject loads a Blockly workspace XML file
func (s *Server) handleLoadProject(w http.ResponseWriter, r *http.Request) {
	filename := r.URL.Query().Get("file")
	if filename == "" {
		// List available project files
		files, _ := filepath.Glob("*.xml")
		if files == nil {
			files = []string{}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"files": files,
		})
		return
	}

	filename = filepath.Base(filename)
	data, err := os.ReadFile(filename)
	if err != nil {
		http.Error(w, "File not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"xml": string(data),
	})
}



// findAvailablePort finds an available TCP port
func findAvailablePort() (int, error) {
	listener, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return 0, err
	}
	defer listener.Close()
	addr := listener.Addr().(*net.TCPAddr)
	return addr.Port, nil
}

// Start starts the HTTP server and returns the port
func (s *Server) Start() (int, error) {
	port, err := findAvailablePort()
	if err != nil {
		return 0, fmt.Errorf("could not find available port: %v", err)
	}

	s.port = port
	s.server = &http.Server{
		Addr:    fmt.Sprintf("127.0.0.1:%d", port),
		Handler: s.mux,
	}

	go func() {
		if err := s.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Fprintf(os.Stderr, "Server error: %v\n", err)
		}
	}()

	return port, nil
}

// Port returns the server port
func (s *Server) Port() int {
	return s.port
}

// URL returns the full URL to the server
func (s *Server) URL() string {
	return fmt.Sprintf("http://127.0.0.1:%d", s.port)
}

// Stop gracefully stops the server
func (s *Server) Stop() error {
	if s.server != nil {
		return s.server.Close()
	}
	return nil
}


