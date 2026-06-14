package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"runtime"

	"ahk-builder/server"

	"github.com/webview/webview_go"
)

func main() {
	// Create and start the HTTP server
	srv := server.New()
	port, err := srv.Start()
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}

	url := fmt.Sprintf("http://127.0.0.1:%d", port)
	fmt.Printf("AHK Builder server started at %s\n", url)

	// Determine if we should use webview or fallback to browser
	useWebview := true
	if os.Getenv("AHK_BROWSER") == "1" {
		useWebview = false
	}

	if useWebview {
		// Try to create webview window
		debug := os.Getenv("AHK_DEBUG") == "1"
		w := webview.New(debug)
		defer w.Destroy()

		w.SetTitle("AHK Builder - Visual AutoHotkey Editor")
		w.SetSize(1280, 800, webview.HintNone)
		w.Navigate(url)

		fmt.Println("Opening AHK Builder in desktop window...")
		fmt.Printf("If the window doesn't appear, set AHK_BROWSER=1 and visit %s\n", url)

		w.Run()
	} else {
		// Fallback: open in browser
		fmt.Printf("Opening in browser at %s\n", url)
		openBrowser(url)
		fmt.Println("Press Ctrl+C to stop the server")
		select {}
	}
}

// openBrowser opens a URL in the default browser
func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("cmd", "/c", "start", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	if err := cmd.Start(); err != nil {
		fmt.Fprintf(os.Stderr, "Failed to open browser: %v\n", err)
		fmt.Printf("Please open your browser and navigate to: %s\n", url)
	}
}
