---
"@lcui/cli": minor
---

Generated `*.css.h` files now split large CSS strings into bounded chunks. Each chunk and its UTF-8 byte length are stored together in a single struct array, avoiding C compiler limits on string literal size while keeping generated headers compact.
