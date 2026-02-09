# Implementation Plan: Tagging System

## Phase 1: Data Layer & Hooks [checkpoint: 14fae65]
- [x] Task: Update Dexie schema to include 'tags' table and update 'notes' table. 2952284
- [x] Task: Create custom React Hook \useTags\ for tag management. 26c3ae8
- [x] Task: Update \useNotes\ hook to support filtering by tag. 8749643
- [x] Task: Conductor - User Manual Verification 'Data Layer & Hooks' (Protocol in workflow.md) 14fae65

## Phase 2: Tagging UI in Editor [checkpoint: 90f2e24]
- [x] Task: Build a Tag Input component for the Editor toolbar. 90f2e24
- [x] Task: Implement autocomplete for existing tags. 90f2e24
- [x] Task: Display active tags as removable badges on each note. 90f2e24
- [x] Task: Conductor - User Manual Verification 'Tagging UI in Editor' (Protocol in workflow.md) 90f2e24

## Phase 3: Sidebar Integration & Global Filtering [checkpoint: 886d698]
- [x] Task: Add a 'Tags' section to the Sidebar (below Folders). 9113691
- [x] Task: Implement global tag-based filtering (overrides folder view). 9113691
- [x] Task: Style tag badges with subtle, papery colors. 9113691
- [x] Task: Conductor - User Manual Verification 'Sidebar Integration & Global Filtering' (Protocol in workflow.md) 886d698
