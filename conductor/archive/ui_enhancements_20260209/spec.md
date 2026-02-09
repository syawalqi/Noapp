# Track Specification: UI Polish

## Overview
Elevate the "papery and calm" aesthetic by introducing tactile backgrounds and a formatted preview mode. This track makes the note-taking experience feel more physical and professional.

## Scope
- **Paper Backgrounds:** Implement CSS patterns for Lined, Grid, and Dotted paper styles in the editor background.
- **Markdown Preview:** Add a live preview mode to render Markdown syntax into formatted HTML.
- **Tactile Details:** Add subtle grain textures and refine card shadows to evoke physical paper.
- **Persistence:** Save the user's preferred "Paper Type" in localStorage.

## Technical Requirements
- Use CSS ackground-image with SVG/linear-gradient for patterns.
- Use eact-markdown for rendering formatted text.
- Use CSS transitions for mode switching.
