package server

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed frontend/*
var frontendFS embed.FS

// getFrontendFS returns the embedded frontend file system as an http.FileSystem
func getFrontendFS() http.FileSystem {
	// Strip the "frontend" prefix from the embedded paths
	subFS, err := fs.Sub(frontendFS, "frontend")
	if err != nil {
		panic(err)
	}
	return http.FS(subFS)
}
