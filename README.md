# AHK Builder 🧩⌨️

**A visual block-based AutoHotkey script builder** — drag, snap, and generate AHK v1 or v2 code without writing a single line.

Built with [Google Blockly](https://developers.google.com/blockly) and a Go web backend, AHK Builder provides a desktop application that lets you construct AutoHotkey scripts visually using over 200 pre-built blocks spanning 20+ categories.

![AHK Builder Screenshot](https://img.shields.io/badge/AHK-v1%20%2F%20v2-blue)
![Go](https://img.shields.io/badge/Go-1.26+-00ADD8)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- **🎨 Visual Block Editor** — Drag and snap blocks together to build scripts visually
- **⚡ Dual AHK Support** — Generate both **AutoHotkey v1** and **v2** code with one click
- **🔍 Block Search** — Quickly find blocks by name, category, or description
- **⭐ Favorites** — Pin your most-used blocks to a dedicated favorites category
- **▶️ Run Directly** — Execute scripts with your AutoHotkey installation
- **💾 Save/Load Projects** — Store and reload your workspace as XML files
- **📤 Export .ahk Files** — Save generated scripts to disk
- **🔬 Live Code Preview** — See generated AHK code with syntax highlighting in real-time
- **🖥️ Desktop App** — Native window (WebView) or browser fallback
- **⏱️ Keyboard Shortcuts** — Ctrl+S (save), Ctrl+E (export), Ctrl+Enter (run), Ctrl+N (new), Ctrl+F (search)

---

## 🚀 Quick Start

### Prerequisites

- [Go](https://go.dev/) 1.26+ (for building)
- [AutoHotkey](https://www.autohotkey.com/) (optional — for running scripts)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/yourusername/ahk-builder.git
cd ahk-builder

# Build and run
go run .
```

This opens AHK Builder in a native desktop window. If the window doesn't appear, set the `AHK_BROWSER=1` environment variable to fall back to your default browser:

```bash
AHK_BROWSER=1 go run .
```

### Build a Standalone Binary

```bash
go build -o ahk-builder.exe .
```

---

## 🎮 How to Use

1. **Drag blocks** from the toolbox on the left into the workspace
2. **Snap blocks together** to build your script logic
3. **Click numbers/text** on blocks to edit values
4. **Right-click** blocks to duplicate, delete, or pin to favorites
5. **Toggle between AHK v1 and v2** using the v1|v2 toggle in the toolbar
6. Click **Run** to execute the script with AutoHotkey
7. Click **Export .ahk** to save the script file
8. Click **Save/Load** to persist your block workspace as XML

---

## 📦 Block Categories

| Category | Color | Description |
|----------|-------|-------------|
| ⭐ Favorites | `#FFD700` | Your pinned blocks |
| 🖱️ Mouse | `#5CB85C` | Click, move, drag, wheel, get position |
| ⌨️ Keyboard | `#4285F4` | Send keys, hotkeys, hotstrings, key wait |
| 🪟 Window | `#F9A825` | Activate, close, move, wait, get info |
| 🔄 Control Flow | `#AB47BC` | If/else, loops, while, for, try/catch, goto, sleep |
| 📊 Variables | `#E53935` | Set/get, math, string concat, clipboard, random |
| 🗨️ Dialog | `#546E7A` | MsgBox, InputBox, ToolTip, splash, progress |
| 📁 File | `#6D4C41` | Read, write, delete, copy, move, directory ops |
| 🖼️ Image/Pixel | `#00BCD4` | Image search, pixel search, get pixel color |
| 🔊 Sound | `#FF6F00` | Beep, play files, volume, mute |
| 🔤 String | `#00897B` | Length, substring, replace, regex, split, format |
| 🔢 Math | `#1E88E5` | Abs, round, floor, ceil, sqrt, trig, min/max |
| 📅 Date/Time | `#00897B` | Format, add, difference |
| 🗄️ Registry/INI | `#795548` | Read, write, delete registry keys and INI files |
| 🎮 Control | `#F9A825` | Click, send, focus, move UI controls |
| ⚙️ System | `#EC407A` | DllCall, COM, key state, coordinate mode, timers |
| 🖥️ GUI | `#7C4DFF` | Create windows, add controls, fonts, colors |
| 📦 Objects | `#7C4DFF` | Arrays, maps, objects |
| 🏷️ Constants | `#78909C` | true/false, null, type checks |
| ⚡ Custom | `#607D8B` | Raw AHK code, function calls |

---

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serves the Blockly frontend |
| `/api/save-ahk` | POST | Save generated AHK code to a `.ahk` file |
| `/api/run` | POST | Run the generated script with AutoHotkey |
| `/api/save-project` | POST | Save workspace as Blockly XML |
| `/api/load-project` | GET | Load workspace XML (lists files if no `?file=` param) |

---

## 🖥️ Architecture

```
ahk-builder/
├── main.go                 # Entry point — starts HTTP server + WebView/browser
├── go.mod / go.sum         # Go dependencies (webview_go)
├── server/
│   ├── server.go           # HTTP server with REST API
│   ├── embed.go            # Embeds frontend static files
│   └── frontend/           # Embedded web UI
│       ├── index.html          # Main HTML, Blockly CDN, toolbox XML
│       ├── styles/
│       │   └── main.css        # Dark theme styling
│       └── scripts/
│           ├── app.js          # App logic, search, favorites, UI
│           ├── blocks.js       # Core block definitions
│           ├── blocks-v1.js    # v1-specific blocks
│           ├── blocks-extra.js # Extended blocks (string, math, etc.)
│           └── generator.js    # AHK v1/v2 code generator + syntax highlighting
```

### Frontend
The UI is built entirely client-side with **Google Blockly v10.4.3**, loaded from CDN. All block definitions, code generators, and styling are embedded into the Go binary via `embed.FS`, making the application fully self-contained.

### Backend
A lightweight Go HTTP server handles:
- Serving the embedded frontend
- Saving `.ahk` files to disk
- Running scripts via the local AutoHotkey installation
- Persisting project workspaces (Blockly XML)

---

## 🛠️ Environment Variables

| Variable | Description |
|----------|-------------|
| `AHK_BROWSER=1` | Skip the WebView window and open in the default browser instead |
| `AHK_DEBUG=1` | Enable WebView developer tools (console) |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + S` | Save project |
| `Ctrl + E` | Export .ahk file |
| `Ctrl + Enter` | Run script with AutoHotkey |
| `Ctrl + N` | New project |
| `Ctrl + F` | Focus block search |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add new block definitions for additional AHK commands
- Improve code generation for better v2 support
- Enhance the UI with more features
- Report bugs and suggest features

---

## 📄 License

- No License Right now I will add it later!

## 👉 Following the discuss

Click [here](https://www.autohotkey.com/boards/viewtopic.php?f=37&t=140800) to follow the discussing on autohotkey forum.
