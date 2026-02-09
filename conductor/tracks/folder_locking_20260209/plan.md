# Implementation Plan: Folder Locking

## Phase 1: Security Utilities
- [x] Task: Implement hashPassword utility using Web Crypto API (PBKDF2). 1334d72
- [~] Task: Create a service for password verification.
- [ ] Task: Conductor - User Manual Verification 'Security Utilities' (Protocol in workflow.md)

## Phase 2: Lock/Unlock UI & State
- [ ] Task: Update UI Context to manage temporarily unlocked folders.
- [ ] Task: Create a 'Lock Folder' modal for password setup.
- [ ] Task: Create an 'Unlock' overlay/dialog for protected folders.
- [ ] Task: Conductor - User Manual Verification 'Lock/Unlock UI & State' (Protocol in workflow.md)

## Phase 3: Content Protection
- [ ] Task: Update Folder and Note hooks to respect lock status.
- [ ] Task: Finalize 'papery' UI feedback for locked folders (e.g., lock icon, blurred content).
- [ ] Task: Conductor - User Manual Verification 'Content Protection' (Protocol in workflow.md)
