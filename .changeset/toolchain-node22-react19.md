---
"@lcui/cli": major
"@lcui/react": minor
---

Require Node.js 22 and upgrade the runtime dependencies.

- `@lcui/cli` now requires `node >=22`; chalk, change-case, postcss-modules, postcss-load-config and TypeScript move to their next major versions.
- Plain `.css` files now go straight to `css-loader` instead of running through `sass-loader`, so Sass-only syntax in a `.css` file is no longer accepted.
- `@lcui/react` targets React 19: `peerDependencies.react` is now `^19.0.0`.
- Tailwind CSS stays on v3 because LCUI's CSS engine cannot evaluate the custom properties and `var()` chains that v4 emits.
