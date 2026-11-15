/**
 * Shared Tailwind CSS v3 configuration for LCUI projects.
 *
 * Tailwind's stock utilities rely on CSS custom properties (`var(--tw-*)`)
 * that LCUI's CSS parser cannot evaluate, so this package exposes:
 *
 *   - `colors` / `boxShadow`: the semantic design tokens used by LCUI themes;
 *   - `corePlugins`: the whitelist of plugins whose output is LCUI-safe;
 *   - `shadowPlugin`: literal `shadow-*` utilities (no custom properties);
 *   - `createConfig()`: a ready-to-use config factory.
 *
 * The package is dependency-free on purpose: it must not `require()` the
 * `tailwindcss` runtime, because the consuming project (and not this package)
 * owns the Tailwind version. Plugins are returned as Tailwind v3 plugin
 * objects and callbacks.
 */

/** Semantic color tokens for the light and dark LCUI themes. */
const colors = {
  background: { DEFAULT: "#ffffff", dark: "#0a0a0a" },
  foreground: { DEFAULT: "#0a0a0a", dark: "#fafafa" },
  card: { DEFAULT: "#ffffff", dark: "#171717" },
  "card-foreground": { DEFAULT: "#0a0a0a", dark: "#fafafa" },
  popover: { DEFAULT: "#ffffff", dark: "#171717" },
  "popover-foreground": { DEFAULT: "#0a0a0a", dark: "#fafafa" },
  primary: { DEFAULT: "#171717", dark: "#fafafa" },
  "primary-foreground": { DEFAULT: "#fafafa", dark: "#171717" },
  secondary: { DEFAULT: "#f5f5f5", dark: "#262626" },
  "secondary-foreground": { DEFAULT: "#171717", dark: "#fafafa" },
  muted: { DEFAULT: "#f5f5f5", dark: "#262626" },
  "muted-foreground": { DEFAULT: "#737373", dark: "#a1a1a1" },
  accent: { DEFAULT: "#f5f5f5", dark: "#262626" },
  "accent-foreground": { DEFAULT: "#171717", dark: "#fafafa" },
  destructive: { DEFAULT: "#e7000b", dark: "#ff6467" },
  "destructive-muted": { DEFAULT: "#ffe8e9", dark: "#4c0519" },
  border: { DEFAULT: "#e5e5e5", dark: "rgba(255, 255, 255, 0.1)" },
  input: { DEFAULT: "#e5e5e5", dark: "rgba(255, 255, 255, 0.15)" },
  ring: { DEFAULT: "#a1a1a1", dark: "#d4d4d4" },
  sidebar: { DEFAULT: "#fafafa", dark: "#171717" },
  "sidebar-foreground": { DEFAULT: "#0a0a0a", dark: "#fafafa" },
  "sidebar-primary": { DEFAULT: "#171717", dark: "#fafafa" },
  "sidebar-primary-foreground": { DEFAULT: "#fafafa", dark: "#171717" },
  "sidebar-accent": { DEFAULT: "#f5f5f5", dark: "#262626" },
  "sidebar-accent-foreground": { DEFAULT: "#171717", dark: "#fafafa" },
  "sidebar-border": {
    DEFAULT: "#e5e5e5",
    dark: "rgba(255, 255, 255, 0.1)",
  },
  success: { DEFAULT: "#16a34a", dark: "#4ade80" },
  warning: { DEFAULT: "#f5b301", dark: "#facc15" },
  code: { DEFAULT: "#f7f7f7", dark: "#171717" },
  "code-foreground": { DEFAULT: "#1f2328", dark: "#d4d4d4" },
  "code-header": { DEFAULT: "#f5f5f5", dark: "#1f1f1f" },
  "code-border": { DEFAULT: "#e5e5e5", dark: "rgba(255, 255, 255, 0.1)" },
  overlay: { DEFAULT: "rgba(0, 0, 0, 0.35)", dark: "rgba(0, 0, 0, 0.55)" },
  "card-image-cover": { DEFAULT: "#94a3b8", dark: "#475569" },
  "card-image-overlay": {
    DEFAULT: "rgba(0, 0, 0, 0.35)",
    dark: "rgba(0, 0, 0, 0.55)",
  },
  "admonition-note": { DEFAULT: "#3b82f6", dark: "#58a6ff" },
  "admonition-note-foreground": { DEFAULT: "#1d4ed8", dark: "#79c0ff" },
  "admonition-info": { DEFAULT: "#06b6d4", dark: "#39c5cf" },
  "admonition-info-foreground": { DEFAULT: "#0891b2", dark: "#56d4dd" },
  "admonition-tip": { DEFAULT: "#10b981", dark: "#56d364" },
  "admonition-tip-foreground": { DEFAULT: "#047857", dark: "#7ee787" },
  "admonition-caution": { DEFAULT: "#eab308", dark: "#e3b341" },
  "admonition-caution-foreground": { DEFAULT: "#ca8a04", dark: "#f2cc60" },
  "admonition-warning": { DEFAULT: "#ef4444", dark: "#f85149" },
  "admonition-warning-foreground": { DEFAULT: "#b91c1c", dark: "#ff7b72" },
};

/** Box shadow tokens. Values are literals because LCUI has no `var()` support. */
const boxShadow = {
  sm: "0 1px 4px 0 rgba(0, 0, 0, 0.2)",
  md: "0 8px 24px rgba(0, 0, 0, 0.12)",
  lg: "0 10px 30px rgba(0, 0, 0, 0.15)",
  focus: "0 0 0 3px rgba(34, 34, 34, 0.1)",
  "focus-dark": "0 0 0 3px rgba(250, 250, 250, 0.18)",
  "focus-sm": "0 0 0 2px rgba(34, 34, 34, 0.12)",
  "focus-sm-dark": "0 0 0 2px rgba(250, 250, 250, 0.2)",
};

/**
 * Core plugin whitelist. Everything outside this list is either unsupported by
 * LCUI's CSS engine or would emit CSS custom properties. Consumers may pass
 * their own list to `createConfig()` when they need a smaller set.
 */
const corePlugins = [
  "display",
  "flexDirection",
  "flexWrap",
  "flex",
  "flexShrink",
  "flexGrow",
  "alignItems",
  "justifyContent",
  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "padding",
  "margin",
  "gap",
  "borderRadius",
  "borderWidth",
  "borderColor",
  "backgroundColor",
  "textColor",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "lineHeight",
  "textAlign",
  "opacity",
  "whitespace",
  "cursor",
  "position",
  "inset",
  "pointerEvents",
  "textDecoration",
  "textUnderlineOffset",
];

/**
 * Box-shadow utilities that inline the configured shadow value.
 *
 * Tailwind's built-in `box-shadow` plugin emits `--tw-shadow` /
 * `--tw-shadow-colored` custom properties and a `var(...)` chain, which LCUI
 * ignores. This plugin keeps the familiar `shadow-<name>` class names while
 * writing literals from `options.shadows` (or `theme.boxShadow`).
 *
 * The result is a Tailwind v3 plugin object, so this package does not need to
 * import `tailwindcss/plugin` and cannot accidentally resolve the consumer's
 * Tailwind installation.
 */
function shadowPlugin(options = {}) {
  return {
    handler: ({ addUtilities, theme }) => {
      const shadows = options.shadows || theme("boxShadow") || {};
      const utilities = {};

      for (const [name, value] of Object.entries(shadows)) {
        if (typeof value !== "string" || value.length === 0) {
          continue;
        }
        utilities[name === "DEFAULT" ? ".shadow" : `.shadow-${name}`] = {
          boxShadow: value,
        };
      }
      addUtilities(utilities);
    },
    config: {},
  };
}

/**
 * Build a Tailwind config with the LCUI-safe defaults.
 *
 * @param {object} [options]
 * @param {string[]} [options.content] Glob patterns, resolved by the consumer.
 * @param {string[]} [options.corePlugins] Override the plugin whitelist.
 * @param {Array} [options.plugins] Extra plugins appended after `shadowPlugin`.
 * @param {object} [options.theme] Extra `theme.extend` values.
 * @returns {import('tailwindcss').Config}
 */
function createConfig(options = {}) {
  return {
    darkMode: "class",
    content: options.content || [],
    theme: {
      extend: {
        colors,
        boxShadow,
        ...(options.theme || {}),
      },
    },
    corePlugins: options.corePlugins || corePlugins,
    plugins: [shadowPlugin({ shadows: boxShadow }), ...(options.plugins || [])],
  };
}

module.exports = {
  colors,
  boxShadow,
  corePlugins,
  shadowPlugin,
  createConfig,
};
