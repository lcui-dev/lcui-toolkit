---
"@lcui/cli": patch
---

Building a specific file no longer generates or updates the project-level `main.c` / `main.h` and no longer runs xmake. Those outputs are kept for full project builds only, so a single-file build cannot leak state into the next build.
