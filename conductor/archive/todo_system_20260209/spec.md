# Track Specification: Todo System

## Overview
Implement a comprehensive task management system within NoApp. This module allows users to track tasks, organize them into categories, set deadlines, and use a built-in Pomodoro timer for deep work sessions.

## Scope
- **Task Management:** CRUD operations for todos. Each task has a title, status (active/completed), due date, and category.
- **Categorization:** Create and manage custom categories to group tasks.
- **Deadlines:** Visual indicators for overdue or upcoming tasks.
- **Focus Tools:** Integrated Pomodoro timer (25/5 intervals) with a dedicated 'Focus on Task' view.
- **Persistence:** All data stored locally in IndexedDB.

## Technical Requirements
- Extend Dexie schema with 'todos' and 'todoCategories' tables.
- Use Browser Notification API (optional/permissions permitting) for timer alerts.
- Maintain 'papery' UI consistency with interactive cards and smooth transitions.
