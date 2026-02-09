# Implementation Plan: Data Portability

## Phase 1: Export Utilities
- [~] Task: Implement downloadFile utility for browser-based downloads.
- [ ] Task: Add 'Export as Markdown' button to the Editor toolbar.
- [ ] Task: Implement full database serialization logic (Folders + Notes) to JSON.
- [ ] Task: Conductor - User Manual Verification 'Export Utilities' (Protocol in workflow.md)

## Phase 2: Import & Restore Logic
- [ ] Task: Implement JSON file picker and parsing logic.
- [ ] Task: Create database restoration service (clear existing + bulk add).
- [ ] Task: Implement data validation to prevent corrupt imports.
- [ ] Task: Conductor - User Manual Verification 'Import & Restore Logic' (Protocol in workflow.md)

## Phase 3: Settings Module UI
- [ ] Task: Build the basic Settings view with 'Backup' and 'Restore' sections.
- [ ] Task: Integrate export/import actions with UI feedback (loading states, success snackbars).
- [ ] Task: Conductor - User Manual Verification 'Settings Module UI' (Protocol in workflow.md)
