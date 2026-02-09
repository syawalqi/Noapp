# Track Specification: Folder Locking

## Overview
Implement a client-side locking mechanism for individual folders. Users can set a password for a folder, and its contents (subfolders and notes) will be hidden until the correct password is provided.

## Scope
- Security utility for password hashing using native Web Crypto API (PBKDF2).
- UI for 'Lock Folder' action (password setup).
- UI for 'Unlock Folder' (password entry).
- UI Context updates to track 'unlocked' status of folders in the current session.
- Logic to prevent rendering or accessing note content of locked folders.

## Technical Requirements
- Use crypto.subtle for PBKDF2 hashing.
- Passwords are never stored in plain text; only salt and hash.
- UI must follow the 'papery and calm' style with subtle modal/dialogs.
