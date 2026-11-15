## [1.0.4](https://gitee.com/lcui-dev/fluent-ui-system-icons/compare/v1.0.3...v1.0.4) (2025-01-27)

## 2.1.0

### Minor Changes

- 3e9bd1d: Export the typed `iconMap`, keyed by kebab-case icon names with `regular` and `filled` size-to-codepoint maps. It is intended for compile-time catalogues and tooling; render icons through `Icon` so the matching CSS glyph and font styles stay synchronized.
- 39e334b: BREAKING CHANGE: Fluent icon CSS and font assets use the semantic `icons.css`, `icons-filled.css`, `icons.ttf`, and `icons-filled.ttf` outputs. Regular uses `.fui-icon`; the former standalone `.fui-icon-filled` font selector is replaced by `.fui-icon.fui-icon-filled`, where `fui-icon-filled` is a modifier token. The old `.fui-icon-regular` font class, `style.css`, `FluentSystemIcons-{Regular,Filled}.{css,ttf}` paths, and `.name-<size>-<style>` glyph classes are removed. Migrate to `.fui-icon.fui-icon-<name>`, optionally adding `.fui-icon-filled` and `.fui-icon-glyph-<N>`; all glyph selectors are scoped beneath `.fui-icon`. Fluent names `filled` and `glyph-<digits>` are reserved to avoid modifier-token collisions. Native Lucide uses `.lucide-icon` and `lucide-icon-<name>` / `lucide-icon-glyph-<N>` classes; it has no filled style and remains regular when `filled=true`. This intentional breaking change uses a minor Changeset while keeping major version 2 because the package has few users.

### Patch Changes

- 3e9bd1d: Icons now inherit the surrounding `font-size` instead of forcing 24px, and glyphs are nudged down 1px so icon fonts sit centered in their line box.
- Updated dependencies [3e9bd1d]
  - @lcui/react@0.7.0

## 2.0.0

### Major Changes

- b39bde0: BREAKING: package renamed from `@lcui/react-icons` to `@lcui/fluent-icons`.

  The functionality is unchanged, but the package name on npm has moved. Update
  your dependency and import statements:

  ```diff
  - import { Icon } from "@lcui/react-icons";
  + import { Icon } from "@lcui/fluent-icons";
  ```

  The previous package (`@lcui/react-icons`) will receive no further updates.

### Patch Changes

- b39bde0: Repository restructure: the three packages now live in a single monorepo at
  [`lcui-dev/lcui-toolkit`](https://github.com/lcui-dev/lcui-toolkit), managed with
  npm workspaces and Changesets. The original repositories have been archived.
  No runtime behaviour changes; published artifacts are equivalent to the prior
  standalone releases.
- Updated dependencies [082269c]
- Updated dependencies [62e81f8]
- Updated dependencies [b39bde0]
- Updated dependencies [9638d0a]
- Updated dependencies [b39bde0]
- Updated dependencies [d97979c]
  - @lcui/react@0.6.0

## [1.0.3](https://gitee.com/lcui-dev/fluent-ui-system-icons/compare/v1.0.2...v1.0.3) (2024-12-23)

### Bug Fixes

- 仅在 fontSize 参数有效时设置样式 ([b12e133](https://gitee.com/lcui-dev/fluent-ui-system-icons/commits/b12e133b761ef42560ebf3dfead760711fadc93b))
