# @lcui/tailwind-config

Shared Tailwind CSS v3 configuration, design tokens and plugins for LCUI
projects.

LCUI's CSS engine has no support for CSS custom properties or `var()`, so the
stock Tailwind output cannot be used as-is. This package keeps the parts that
are safe for LCUI and replaces the ones that are not.

## Usage

```js
const { createConfig } = require("@lcui/tailwind-config");

module.exports = createConfig({
  content: ["./src/**/*.{c,h,css}"],
});
```

`createConfig()` returns:

- `darkMode: "class"`
- `theme.extend.colors` and `theme.extend.boxShadow` from this package
- a `corePlugins` whitelist of LCUI-safe plugins
- the literal `shadow-*` utilities plugin

## Options

```js
createConfig({
  content: ["./app/**/*.{tsx,html}"],
  corePlugins: ["display", "flex", "padding"],
  plugins: [],
  theme: { borderRadius: { lg: "8px" } },
});
```

| Option        | Description                                             |
| ------------- | ------------------------------------------------------- |
| `content`     | Glob patterns, resolved relative to the consumer        |
| `corePlugins` | Override the default LCUI-safe plugin whitelist         |
| `plugins`     | Extra Tailwind plugins appended after the shadow plugin |
| `theme`       | Extra values merged into `theme.extend`                 |

## Exports

| Name           | Description                                    |
| -------------- | ---------------------------------------------- |
| `colors`       | Semantic light/dark color tokens               |
| `boxShadow`    | Shadow tokens with literal values              |
| `corePlugins`  | Default LCUI-safe plugin whitelist             |
| `shadowPlugin` | `shadow-*` utilities that inline shadow values |
| `createConfig` | Config factory with the defaults above         |

## Shadows

`shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-focus`, `shadow-focus-sm` and
their `-dark` variants are available as class names but compile to literal
`box-shadow` declarations:

```css
.card {
  @apply shadow-sm;
}
```

```css
.card {
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
}
```

Only shadows defined in `boxShadow` are generated, and only when the class
appears in the scanned content.
