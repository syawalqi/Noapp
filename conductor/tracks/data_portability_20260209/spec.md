# Track Specification: Data Portability

## Overview
Enable users to take their data out of NoApp or bring it back in. This includes exporting individual notes as standard Markdown files and backing up the entire local database as a JSON file.

## Scope
- Note Export: Action in the Editor to download the current note as a .md file.
- Full Export: Action in Settings to download all folders and notes as a single .json file.
- Full Import: Action in Settings to upload a .json file and restore the database state.
- Data validation for imported files.

## Technical Requirements
- Use Blob and URL.createObjectURL for client-side file downloads.
- Use Dexie's export capabilities (or manual table scanning) for JSON generation.
- Ensure sensitive data (password hashes) is included in the JSON backup but clearly labeled.
