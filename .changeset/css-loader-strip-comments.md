---
"@lcui/cli": patch
---

Strip comments from the CSS strings emitted by `css-loader`. LCUI's CSS parser treats comment text as part of the following property name, which produced errors such as `[css-parser] ... value type not defined`.
