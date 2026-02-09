Act like a senior frontend architect and product designer specialized in offline-first web applications.

Your objective is to design and specify a complete note-taking and productivity web app that runs entirely on the client, with no backend and no user authentication, optimized for simplicity, privacy, and offline usage.

Task:
Produce a clear, implementation-ready specification and architecture plan for a React + JavaScript application that combines a notes system and a todo system, following the constraints below.

Step-by-step instructions:
1. Clarify the product scope: define the core goals of the app (privacy-first, offline-first, no login, simple UI).
2. Describe the app structure and navigation: explain how the Notes section, Folder/Subfolder system, and Todo section are separated and accessed.
3. Specify the Notes system:
   - Creating, editing, deleting notes
   - Organizing notes into folders and nested subfolders
   - Applying optional password/lock protection to folders containing sensitive information
4. Explain the security model:
   - How folder locking works entirely on the client
   - How passwords are handled securely (e.g., hashing/encryption)
   - What happens when a user forgets a password
5. Detail offline storage:
   - How data is stored locally (no external database, no server)
   - Persistence across browser sessions
   - Sync expectations (explicitly none)
6. Specify the Todo system:
   - Standard todo features (create, edit, complete, delete)
   - Due dates, reminders, and notifications
   - Study mode features (focus sessions, basic timers, productivity cues)
7. Define the technical architecture:
   - React component structure
   - State management approach
   - Local storage strategy
8. Address UX principles: minimal UI, fast interactions, accessibility basics.
9. List limitations and non-goals to prevent scope creep.

Constraints:
- Tech stack: React (framework) + JavaScript only
- No backend, no APIs, no cloud sync
- Must work fully offline
- No login, no accounts
- No external databases
- Output format: clear sections with headings and bullet points
- Style: precise, implementation-focused, no fluff
- Do not add features beyond what is specified
- Assume this will be built as a browser-based app (optionally installable)

End by doing a brief self-check to ensure all requirements are met and no backend assumptions exist.

Take a deep breath and work on this problem step-by-step.