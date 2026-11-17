---
"@lcui/cli": patch
---

Generated C and ESM paths should always use `/`, regardless of the host platform. `main.h` used to contain Windows backslashes, so a project generated on Windows could not be compiled on Linux. All generators now go through the shared `toPosixPath()` helper.
