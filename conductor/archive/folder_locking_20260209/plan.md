# Implementation Plan: Folder Locking

## Phase 1: Security Utilities [checkpoint: c6f8246]
- [x] Task: Implement hashPassword utility using Web Crypto API (PBKDF2). 1334d72
- [x] Task: Create a service for password verification. 08ba8d6
- [x] Task: Conductor - User Manual Verification 'Security Utilities' (Protocol in workflow.md) c6f8246

## Phase 2: Lock/Unlock UI & State [checkpoint: 322e065]
- [x] Task: Update UI Context to manage temporarily unlocked folders. 8f37f91
- [x] Task: Create a 'Lock Folder' modal for password setup. 6e7984c
- [x] Task: Create an 'Unlock' overlay/dialog for protected folders. 0859cca
- [x] Task: Conductor - User Manual Verification 'Lock/Unlock UI & State' (Protocol in workflow.md) 322e065

## Phase 3: Content Protection [checkpoint: 189f510]
- [x] Task: Update Folder and Note hooks to respect lock status. 60f315e
- [x] Task: Finalize 'papery' UI feedback for locked folders (e.g., lock icon, blurred content). 720042c
- [x] Task: Conductor - User Manual Verification 'Content Protection' (Protocol in workflow.md) 189f510
