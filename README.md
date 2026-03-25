# Project Tracker Website

A modern and responsive **Project Management Web App** built using React, TypeScript, Vite, and Tailwind CSS.  
It helps users manage tasks efficiently with Kanban, List, and Timeline views.

---

## Live Demo

https://velozity-global-solutions-project-t.vercel.app/

---

## Lighthouse screenshot - Score 92

<img width="1920" height="1080" alt="Screenshot (277)" src="https://github.com/user-attachments/assets/ebfd845b-821a-4ab1-b9a5-b2f4f4bd3737" />


## Technologies Used

- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- State Management: React Context API

---

## Features

- Login & Signup (LocalStorage authentication)
- Kanban Board with Drag and Drop
- List View with Sorting
- Timeline View for task tracking
- Advanced Filters (Status, Priority, Assignee, Date)
- URL-based filter persistence
- Responsive UI
- Sidebar navigation

---

## Prerequisites

1. Install Node.js  
Download from: https://nodejs.org

Verify installation:
```bash

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/aswanivaChaithram/VELOZITY-GLOBAL-SOLUTIONS-Project-Tracker-Frontend-Assessment.git
cd VELOZITY-GLOBAL-SOLUTIONS-Project-Tracker-Frontend-Assessment

### 2. Install dependencies
 npm install

### 3. Start development server
npm run dev

Open http://localhost:5173 in your browser

### Build for Production
npm run build

### Preview Production Build
npm run preview

---

## Project Structure

- src/Components: Reusable UI components (Board, KanbanColumn, TaskCard, List, Timeline, Filters, Navbar, Login)
- src/Pages: Main pages (Tasks dashboard)
- src/context: Context API for global task state
- src/Data: Mock task generator data
- src/hooks: Custom hooks (drag and drop logic)
- src/Type: TypeScript types
- src/App.tsx: Routing and authentication handling
- src/main.tsx: Application entry point
- src/index.css: Global styles

---

## Customization

- Modify tasks → src/Data/generateTasks.ts
- Update styles → Tailwind classes
- Add filters → FitersandURL component
- Extend task structure → taskType.ts

## Deployment

This project is deployed using Vercel.

## State Management Decision

Used React Context API to manage global tasks.
It avoids prop drilling and is simple for medium-scale applications without needing Redux.

## Implementation Overview

- Kanban Board: Tasks grouped by status and rendered dynamically
- Filters: Multi-select filters synced with URL using useSearchParams
- List View: Sorting implemented using useMemo for performance
- Timeline: Tasks positioned based on date calculations

## Drag and Drop Approach

Implemented custom drag-and-drop without libraries.
Used native events like onDragStart, onDragOver, and onDrop.
Task status updates dynamically when dropped into a column.



