# Track Specification: Tagging System

## Overview
Implement a tagging system for notes. This provides a secondary, non-hierarchical way to organize and retrieve information, complementing the existing folder structure.

## Scope
- **Tag Management:** Create, rename, and delete global tags.
- **Assignment:** Add or remove tags from notes in the Editor.
- **Filtering:** A dedicated 'Tags' section in the Sidebar to filter notes across all folders.
- **Persistence:** Store tags and assignments in IndexedDB.

## Technical Requirements
- Extend Dexie schema with a 'tags' table.
- Update 'notes' table to include an array of 'tagIds' or use a junction table.
- Maintain 'papery' UI consistency with color-coded tag badges.
