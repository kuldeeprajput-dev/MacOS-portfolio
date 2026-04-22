# MacOS Portfolio

A personal portfolio website that simulates a macOS desktop environment. Built with React, Vite, and Tailwind CSS.

## Features

- **Desktop Environment**: Fully interactive macOS-like desktop with draggable windows
- **Dock**: Animated macOS-style dock with app icons
- **Windows**: Finder, Terminal, Safari, Photos, TextEditor, Resume viewer, and more
- **Drag & Drop**: Windows can be dragged and repositioned
- **Window Management**: open and close functionality
- **Apps Included**:
  - Finder (file explorer)
  - Terminal
  - Safari (web browser)
  - Photos
  - Text Editor
  - Resume (PDF viewer)
  - Contact Form

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- GSAP (animations)
- Zustand (state management)
- react-pdf (PDF viewing)
- react-tooltip

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable components (Dock, Navbar, WindowControls, etc.)
├── windows/          # Window app components (Finder, Terminal, Safari, etc.)
├── hoc/              # Higher-order components
├── store/            # Zustand state management
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```