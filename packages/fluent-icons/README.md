# Fluent UI System Icons

([中文](README.zh-cn.md)/**English**)

[Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) are a collection of familiar, friendly and modern icons from Microsoft.

This project regenerates the icon library based on the icon files from [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons). It is suitable for LCUI applications. For specific generation rules, please refer to the file: [scripts/convert.js](scripts/convert.js).

![Fluent System Icons](art/readme-banner.png)

## Installation

```sh
npm install @lcui/fluent-icons
```

## Usage

To use these icons, you need to first import the CSS file in your root component file:

```tsx
// src/App.tsx — load the styles your app uses
import "@lcui/fluent-icons/dist/icons.css";
import "@lcui/fluent-icons/dist/icons-filled.css";
```

And then simply import them as `import { [IconName][Style] } from @lcui/fluent-icons.` For example:

```tsx
// src/MyComponent.tsx

import { AccessTime, AccessTimeFilled } from "@lcui/fluent-icons";
import styles from "./MyCompoennt.module.css";

export default function MyComonent() {
  return (
    <div>
      <AccessTime className={styles.icon} size={24} />
      <AccessTimeFilled className={styles.icon} />
      <AccessTime className={styles.icon} size={48} />
    </div>
  );
}
```

There are two styles of icons: Regular and Filled. Regular is the default style, so use `AccessTime` rather than `AccessTimeRegular`. The default glyph is regular 24; when an icon has no regular 24 glyph, the closest available regular size is used (ties choose the smaller size). Icons with no supported regular glyph report that style as unavailable, though a supported filled glyph may still be used. `size` selects a design glyph size and, when explicitly set, also sets the rendered size. `fontSize` overrides only the rendered size; if neither is specified, the CSS default applies and can be overridden by `className` styles.

If you don't like this usage, you can also use only the `Icon` component:

```tsx
// src/MyComponent.tsx

import { Icon } from "@lcui/fluent-icons";
import styles from "./MyCompoennt.module.css";

export default function MyComonent() {
  return (
    <div>
      <Icon name="access-time" className={styles.icon} />
      <Icon name="access-time" className={styles.icon} filled />
      <Icon name="access-time" className={styles.icon} size={48} />
    </div>
  );
}
```

If you don't use TypeScript/React, you can use LCUI's native Icon widget from C:

```c
#include <LCUI.h>

...

int main(int argc, char **argv)
{
  ui_widget_t *icon;

  lcui_init();

  ui_load_css_file("icons.css");
  ui_load_css_file("icons-filled.css");

  icon = ui_create_fluent_icon("access-time");
  ui_root_append(icon);

  ui_icon_set_filled(icon, true);
  ui_icon_set_size(icon, 48);

  return lcui_main();
}
```

**Breaking change:** the old `style.css`, `FluentSystemIcons-{Regular,Filled}.{css,ttf}` paths, `.fui-icon-regular` font class, and `.name-<size>-<style>` glyph classes are removed. The former standalone `.fui-icon-filled` font selector is replaced by `.fui-icon.fui-icon-filled`; its class token is now a modifier used with the `.fui-icon` base. Import `icons.css` and/or `icons-filled.css`; Regular uses `.fui-icon`, each icon name uses `fui-icon-<name>`, and design-size glyph selection uses `fui-icon-glyph-<N>`. Glyph selectors are scoped under `.fui-icon`, so generic application classes such as `.add` do not activate icon rules. Icon names `filled` and `glyph-<digits>` are reserved because they collide with modifier classes. The React Icon components generate these classes automatically. Native Lucide uses `.lucide-icon` plus `lucide-icon-<name>` and optional `lucide-icon-glyph-<N>` classes; it has no filled style. `size` selects the design glyph and also sets display size when explicitly provided; `fontSize` overrides only the rendered size. If neither is specified, the CSS default applies and can be overridden by a class. This release intentionally keeps the package on major version 2 because the user base is small; it is not backward compatible. If a requested non-default size/style combination is missing, no fallback glyph is fabricated: the React Icon keeps its base state and warns. Requesting filled 24 when that glyph does not exist is an error.

Afterwards, manually copy the CSS and TTF files from the `node_modules/@lcui/fluent-icons/dist` directory to the application's working directory.

## Update

Download the latest source code package of [fluentui-system-icons](https://github.com/microsoft/fluentui-system-icons), extract it, and then run:

```sh
npm run build
```

## License

[MIT](../../LICENSE)
