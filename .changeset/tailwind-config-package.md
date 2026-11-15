---
"@lcui/tailwind-config": minor
---

Add `@lcui/tailwind-config`, a shared Tailwind CSS v3 configuration for LCUI projects. It exports the semantic light/dark color tokens, the shadow tokens, an LCUI-safe `corePlugins` whitelist, a `createConfig()` factory and a `shadow-*` plugin that writes literal `box-shadow` values instead of the custom properties and `var()` chains that LCUI's CSS parser cannot evaluate.
