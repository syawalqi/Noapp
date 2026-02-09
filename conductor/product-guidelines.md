# Product Guidelines: NoApp

## Visual Identity
- **Color Palette:** 
    - **Light Mode:** Warm, low-saturation 3000K sepia tones (#f2eadf) for an aged paper feel with high-contrast text (#12110f).
    - **Dark Mode:** Deep, smooth charcoal (#1c1a18) with reduced texture for digital comfort.
    - **Modes:** Support for a manually toggled Light and Dark mode, with an option to sync with system preferences.
- **Typography:** 
    - **Headings:** Elegant serif fonts for titles to mimic printed documents.
    - **Body:** Clean, legible sans-serif for content to ensure clarity during long writing sessions.
- **Texture & Spacing:** 
    - SVG-based grain texture overlay with mode-specific opacity (0.06 Light / 0.02 Dark).
    - Tactile background patterns (Lined, Grid, Dotted) for the editor area.
    - Priority on generous whitespace to maintain a calm atmosphere.
- **Shadows:** Multi-layered, realistic "stacked" shadows for papery depth and interactive lift on hover.

## Interaction Patterns
- **Motion:** 
    - Smooth 0.5s transitions for theme switching.
    - Subtle fade and slide-in animations for navigation between notes and folders.
- **Tactile Feedback:** Visual cues should feel organic and soft, reinforcing the "paper and ink" metaphor.
- **Safety Nets:** 
    - **Deletion:** A multi-layered approach including a local "Trash" folder, confirmation prompts for permanent deletion, and "Undo" snackbars for immediate mistakes.

## Specialized Views
- **Focus Mode:** A full-screen, immersive experience that strips away all navigation, sidebars, and UI chrome, leaving only the primary task or note area visible.
- **Markdown Preview:** A dedicated toggle to render syntax into formatted prose using the serif/sans aesthetic.