# Implementation Plan: Data Portability

## Phase 1: Export Utilities [checkpoint: 435f6e8]
- [x] Task: Implement downloadFile utility for browser-based downloads. df9f944
- [x] Task: Add 'Export as Markdown' button to the Editor toolbar. 30ff559
- [x] Task: Implement full database serialization logic (Folders + Notes) to JSON. 7610b92
- [x] Task: Conductor - User Manual Verification 'Export Utilities' (Protocol in workflow.md) 435f6e8

## Phase 2: Import & Restore Logic
- [x] Task: Implement JSON file picker and parsing logic. 17ffe0b
- [ ] Task: Create database restoration service (clear existing + bulk add).
- [ ] Task: Implement data validation to prevent corrupt imports.
- [ ] Task: Conductor - User Manual Verification 'Import & Restore Logic' (Protocol in workflow.md)

## Phase 3: Settings Module UI
- [ ] Task: Build the basic Settings view with 'Backup' and 'Restore' sections.
- [ ] Task: Integrate export/import actions with UI feedback (loading states, success snackbars).
- [ ] Task: Conductor - User Manual Verification 'Settings Module UI' (Protocol in workflow.md)
