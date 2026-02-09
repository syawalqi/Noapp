# Implementation Plan: Tagging System

## Phase 1: Data Layer & Hooks
- [ ] Task: Update Dexie schema to include 'tags' table and update 'notes' table.
- [ ] Task: Create custom React Hook \useTags\ for tag management.
- [ ] Task: Update \useNotes\ hook to support filtering by tag.
- [ ] Task: Conductor - User Manual Verification 'Data Layer & Hooks' (Protocol in workflow.md)

## Phase 2: Tagging UI in Editor
- [ ] Task: Build a Tag Input component for the Editor toolbar.
- [ ] Task: Implement autocomplete for existing tags.
- [ ] Task: Display active tags as removable badges on each note.
- [ ] Task: Conductor - User Manual Verification 'Tagging UI in Editor' (Protocol in workflow.md)

## Phase 3: Sidebar Integration & Global Filtering
- [ ] Task: Add a 'Tags' section to the Sidebar (below Folders).
- [ ] Task: Implement global tag-based filtering (overrides folder view).
- [ ] Task: Style tag badges with subtle, papery colors.
- [ ] Task: Conductor - User Manual Verification 'Sidebar Integration & Global Filtering' (Protocol in workflow.md)
