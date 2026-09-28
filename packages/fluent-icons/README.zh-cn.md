# Fluent UI System Icons

(**中文**/[English](README.md))

[Fluent UI 系统图标](https://github.com/microsoft/fluentui-system-icons)是一组来自微软的熟悉、友好和现代的图标。

本项目基于 [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) 的图标文件重新生成图标库，适合 LCUI 应用程序使用，具体生成规则可查看文件：[scripts/convert.js](scripts/convert.js)

![Fluent System Icons](art/readme-banner.png)

## 安装

```sh
npm install @lcui/fluent-icons
```

## 使用

要使用这些图标，你需要先在你的根组件文件中引入 css 文件：

```tsx
// src/App.tsx — 按需引入应用使用的风格
import "@lcui/fluent-icons/dist/icons.css";
import "@lcui/fluent-icons/dist/icons-filled.css";
```

然后用 `import { [IconName][Style] } from @lcui/fluent-icons` 来引入它们。例如：

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

图标有 Regular 和 Filled 两种风格。Regular 是默认风格，使用 `AccessTime` 即可，无需写成 `AccessTimeRegular`。默认字形为 regular 24；如果某图标没有 regular 24，则使用最接近的可用 regular 尺寸（距离相同时选较小尺寸）。如果某图标没有可用的 regular 字形，则请求该风格时会报告不可用，但仍可使用它实际支持的 filled 字形。`size` 选择设计字形尺寸，显式设置时也会设置显示字号；`fontSize` 只覆盖显示字号。不传这两个属性时使用 CSS 默认字号，可由 `className` 绑定的样式覆盖。

如果你不喜欢这种用法，也可以只用 `Icon` 组件：

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

如果不使用 TypeScript/React，也可以在 C 代码中使用 LCUI 原生 Icon 部件：

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

**破坏性变更：** 旧 `style.css`、`FluentSystemIcons-{Regular,Filled}.{css,ttf}` 路径、`.fui-icon-regular` 字体类和 `.name-<size>-<style>` 字形类已移除。原本单独指定字体的 `.fui-icon-filled` selector 改为 `.fui-icon.fui-icon-filled`；`fui-icon-filled` 类 token 现在作为 modifier，与 `.fui-icon` 基类组合使用。请引入 `icons.css` 和/或 `icons-filled.css`；图标名类为 `fui-icon-<name>`，设计字形尺寸类为 `fui-icon-glyph-<N>`。字形选择器均限定在 `.fui-icon` 下，因此业务侧的 `.add` 等通用类不会触发图标规则。图标名 `filled` 和 `glyph-<digits>` 为 modifier 保留名。React Icon 组件会自动生成这些类。Native Lucide 使用 `.lucide-icon`、`lucide-icon-<name>` 和可选的 `lucide-icon-glyph-<N>`，不支持 filled。`size` 选择设计字形，并在显式设置时同步设置显示字号；`fontSize` 只覆盖最终显示字号。不传这两个属性时使用 CSS 默认字号，可通过类样式覆盖。由于当前使用者较少，本次发布仍保留 major 2；本版本不向后兼容。缺少的非默认风格/尺寸组合不会伪造回退字形：React Icon 保持基础状态并输出警告；请求不存在的 filled 24 字形则报错。

之后，手动复制 `node_modules/@lcui/fluent-icons/dist` 目录内的 css 和 ttf 文件到应用程序工作目录内。

## 更新

下载 [fluentui-system-icons](https://github.com/microsoft/fluentui-system-icons) 最新源码包，解压其中的 fonts 目录到本项目目录内，然后运行：

```sh
npm run build
```

## 许可

[MIT](../../LICENSE)
