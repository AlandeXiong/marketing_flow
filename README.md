# Insurance Campaign Flow (React Flow + Ant Design)

This project is a modern marketing campaign flow editor for insurance scenarios, built with React, React Flow, Ant Design, and Fluent UI. It provides a visual drag-and-drop interface to design, configure, and manage multi-channel marketing campaigns.

## Features
- Visual campaign flow with draggable nodes (Activity, Segment, Strategy, Email Template)
- Each node supports custom icons and concise titles
- Right-side panel for detailed configuration, using Ant Design form components
- Editable campaign details, segment, strategy, and email template
- Ant Design Select, Slider, DatePicker, Input/Textarea for best UX
- Save/cancel actions with beautiful buttons and hover effects
- Responsive layout, supports large and small screens

## Tech Stack
- React 18+
- React Flow (for visual node/edge editing)
- Ant Design (for form and UI components)
- Fluent UI (for node card style)
- Vite (for fast dev/build)

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open your browser at [http://localhost:5173](http://localhost:5173)

## Main Structure
- **src/components/**: Custom node and panel components
- **src/App.jsx**: Main app, React Flow canvas, right panel logic
- **src/components/StrategyPanel.jsx**: Example of AntD Select, Slider, and Save/Cancel buttons

## Customization
- You can add more node types, change icons, or extend the panel forms as needed
- API endpoints for save can be replaced with your backend

## Screenshots
> ![screenshot](./screenshot.png)

---

For more details, see the code comments or contact the maintainer.
