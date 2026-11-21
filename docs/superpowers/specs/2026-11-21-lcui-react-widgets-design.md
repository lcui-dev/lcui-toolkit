# @lcui/react 部件组件与类型补全方案

## 背景

LCUI 文档（`docs/zh-CN/widgets/*.mdx`）和 TSX 示例（`docs/examples/*-tsx/example.tsx`）
已经使用约 158 个来自 `@lcui/react` 的部件组件，但当前 `@lcui/react` 只导出
`Text`、`TextInput`、`Link`、`Button`、`Widget`、`Scrollbar`、`ScrollArea`、
`ScrollAreaContent`、`RouterLink`、`RouterView` 十个组件。文档中的 TSX 示例无法
通过类型检查，也无法直接编译。

同时存在属性命名差异：文档使用 `defaultValue`、`defaultOpen`、`htmlFor` 等
camelCase 属性，而 C 侧部件读取的是 `default-value`、`default-open`、`for`。
当前 `createTagWidget` 直接透传属性，不做转换，因此即使补上组件，`defaultValue`
也不会生效。

## 目标

1. 为文档中出现的全部部件补齐 React 组件导出，标签名与 LCUI 已注册 prototype 一致。
2. 为每个组件提供 `XxxProps` 类型，并为非 DOM 标签补充 `JSX.IntrinsicElements` 声明。
3. 在组件层统一完成 camelCase → kebab-case、`className` → `class`、`htmlFor` → `for`
   等属性转换，使文档写法可以直接工作。
4. 为没有独立 prototype 的组件提供包装实现（`DialogClose`、`InputGroup*`、
   `AttachmentAction`、`SidebarMenu*Button` 等）。
5. 让 `useState` 返回的 `ObjectBinding` 可以作为属性值传给组件，并修复当前编译器
   把动态属性序列化成 `[object Object]` 的问题。
6. 为组件提供 `render` prop，支持用自定义元素替换组件根节点或触发器内容。
7. 为 `Button`、`Badge`、`Alert`、`Item`、`Card` 提供 class 变体 helper，
   并在 LCUI 主题层为 `Badge`、`Alert`、`Item`、`Card` 补齐 class 选择器版样式。
8. 保持已有导出、`shouldPreRender` 行为和事件属性处理不变。

## 非目标

- 不修改 LCUI C 侧部件的属性名或行为。
- 不导出内部结构标签：`progress-track`、`progress-indicator`、`scrollbar-thumb`、
  `scrollbar-track`、`scrollbar-corner`、`select-arrow`、`textcaret`、`portal-root`、
  `toast-*`。
- `Toast` 只通过 C API（`ui_toast_show()` 等）使用，不提供 TSX 组件。
- `Anchor` 在文档中直接使用小写 `<a>`，由 React DOM 类型覆盖；不新增 `Anchor` 组件，
  已有 `Link` 继续保留。
- 不新增 `@lcui/shadcn` 包。LCUI 的 C 部件已经自带 shadcn 风格样式，React 层是
  绑定和组合层，再拆一个样式包会造成重复和版本分裂。
- 不实现 `asChild`。shadcn 的 Radix 版本使用 `asChild`，本项目参考的 Base UI 版本
  使用 `render`；本次统一使用 `render`，后续如需 `asChild` 可作为
  `render={children}` 的语法糖补充。
- 不改变 `@lcui/cli` 的 `ts-loader` 契约；动态属性修复只发生在 `@lcui/react` 的
  `compile.ts` 中，输出仍是普通 XML schema 节点。
- 不引入文档字段表的运行时依赖；类型在包内静态维护。

## 组件与标签映射

绝大多数组件按 PascalCase → kebab-case 映射，例如
`AlertDialogContent` → `alert-dialog-content`、`DropdownMenuSubContent` →
`dropdown-menu-sub-content`。

特殊情况：

| 组件                   | 标签 / 实现          |
| ---------------------- | -------------------- |
| `Text`                 | `text`               |
| `TextInput`            | `textinput`          |
| `Link`                 | `a`                  |
| `Button`               | `button`             |
| `Widget`               | `widget`             |
| `Icon`                 | `icon`               |
| `Portal`               | `portal`             |
| `ScrollArea`           | `scrollarea`         |
| `ScrollAreaContent`    | `scrollarea-content` |
| `DialogClose`          | `button` 包装        |
| `InputGroupInput`      | `textinput` 包装     |
| `InputGroupTextarea`   | `textinput` 包装     |
| `InputGroupButton`     | `button` 包装        |
| `AttachmentAction`     | `button` 包装        |
| `SidebarMenuButton`    | `button` 包装        |
| `SidebarMenuSubButton` | `button` 包装        |

完整清单见附录 A。

## 属性转换规则

新增工厂 `createWidget<T>(tag, options?)`，所有标签组件都经过它创建元素。
转换发生在 `React.createElement` 之前：

1. `className` → `class`，`$ref` → `ref`。
2. `htmlFor` → `for`；`for` 原样保留。
3. 其余包含大写字母的属性名转 kebab-case：
   - `defaultValue` → `default-value`
   - `defaultOpen` → `default-open`
   - `showCloseButton` → `show-close-button`
   - `alignItemWithTrigger` → `align-item-with-trigger`
   - `sideOffset` → `side-offset`
   - `alignOffset` → `align-offset`
   - `matchTriggerWidth` → `match-trigger-width`
4. `onXxx` 事件属性不做转换，交给现有 `compile.ts` 的事件映射处理。
5. `children`、`style`、`key` 不进入属性转换；`data-*`、`aria-*`、`id`、`name`
   等小写或带连字符的属性原样保留。
6. `options.className` 与调用方 `className` 合并，默认 class 在前，用空格分隔。
7. `options.props` 作为默认值，调用方传入的属性覆盖它。

转换只改属性名，不改属性值。布尔值、数字、字符串和 `ObjectBinding` 都原样保留，
由后续编译阶段处理。

## 包装组件

| 组件                   | 行为                                                                                                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TextInput`            | 渲染 `textinput`；`defaultValue` 转为子文本（C 的 textinput 通过 `settext` 解析子文本）。显式 `children` 优先于 `defaultValue`。                                                                                         |
| `DialogClose`          | 渲染 `button`，附加 `class="dialog-close"` 和 `data-dialog-close="true"`。无 children 时默认 `variant="ghost"`、`size="icon"`，并插入 `<Icon name="dismiss" />`；有 children 时不设默认 variant/size，沿用 button 默认。 |
| `InputGroupInput`      | 渲染 `textinput`，附加 `class="input-group-input input-group-control"`；支持 `defaultValue`。                                                                                                                            |
| `InputGroupTextarea`   | 渲染 `textinput`，附加 `multiline="true"`、`class="input-group-textarea input-group-control"`；支持 `defaultValue`。                                                                                                     |
| `InputGroupButton`     | 渲染 `button`，默认 `variant="ghost"`、`size="xs"`，附加 `class="input-group-button"`。                                                                                                                                  |
| `AttachmentAction`     | 渲染 `button`，默认 `variant="ghost"`、`size="icon-xs"`，附加 `class="attachment-action"`。调用方可用 `size` 覆盖。                                                                                                      |
| `SidebarMenuButton`    | 渲染 `button`，附加 `class="sidebar-menu-button"`。提供 `render` 时改为克隆该元素并把 class 合并进去。                                                                                                                   |
| `SidebarMenuSubButton` | 渲染 `button`，附加 `class="sidebar-menu-sub-button"`。                                                                                                                                                                  |

`DialogClose`、`InputGroupButton`、`AttachmentAction`、`SidebarMenuButton`、
`SidebarMenuSubButton` 的类型都基于 `ButtonAttributes`，保留 `variant`、`size`、
`disabled` 等属性。

## render prop

所有组件接受可选的 `render?: React.ReactElement`。语义分两类：

### A. 根节点替换

普通组件（`Button`、`Badge`、`Alert`、`Item`、`Card`、`Text`、`Label`、
`DialogClose`、`InputGroupButton`、`InputGroupInput`、`InputGroupTextarea`、
`AttachmentAction`、`SidebarMenuButton`、`SidebarMenuSubButton` 等）：
`render` 直接替换组件根元素。

```tsx
<Button render={<a href="#" />} variant="secondary" size="sm">
  Login
</Button>
```

等价于：

```tsx
<a href="#" className="button button-secondary button-sm">
  Login
</a>
```

合并规则：

1. `className` 合并，组件默认 class 在前。
2. 组件 props 覆盖 `render` 元素上的同名 props。
3. 组件 children 覆盖 `render` 元素的 children。
4. `variant`、`size` 等样式属性在目标不是原生 widget 标签时转换为对应 class，
   避免把无意义的属性传给 `<a>`、`<div>` 等标签。
5. `render` 元素必须恰好是一个 React 元素。

### B. 触发器内容替换

触发器组件需要保留 C 侧 prototype 根节点，`render` 替换的是根节点内容：

```tsx
<AlertDialogTrigger render={<Button variant="outline">Show Dialog</Button>} />
```

编译结果：

```tsx
<alert-dialog-trigger>
  <Button variant="outline">Show Dialog</Button>
</alert-dialog-trigger>
```

适用于：`DialogTrigger`、`AlertDialogTrigger`、`AccordionTrigger`、
`CollapsibleTrigger`、`DropdownMenuTrigger`、`DropdownMenuSubTrigger`、
`PopoverTrigger`、`TooltipTrigger`、`SelectTrigger`、`SidebarTrigger`。

触发器不传 `render` 时的默认内容：

- `DialogTrigger` / `AlertDialogTrigger`：纯文本 children 自动包一层 `Button`，
  元素 children 原样保留。
- `AccordionTrigger` / `CollapsibleTrigger`：纯文本 children 自动包一层 `Text`。
- 其他触发器：元素 children 原样保留；纯文本 children 自动包一层 `Text`。

`render` 元素上的事件和属性不被触发器读取；触发器自己的 props 仍作用在
prototype 根节点上。

## class 变体层

### 现有能力

LCUI 主题层已经为 `Button` 提供 class 选择器版样式：

```text
.button .button-outline .button-primary .button-secondary .button-ghost
.button-destructive .button-link
.button-xs .button-sm .button-lg
.button-icon .button-icon-xs .button-icon-sm .button-icon-lg
```

`Badge` 只有 `.badge-color-*`，没有 `.badge` 基类和 variant class。

### 本次新增

在 LCUI 仓库的 `src/styles/style-nova.css` 中，为以下部件补充 class 选择器版规则，
并重新生成 `src/styles/style-nova.css.h`：

- `Badge`：`.badge`、`.badge-secondary`、`.badge-destructive`、
  `.badge-outline`、`.badge-ghost`、`.badge-disabled`
- `Alert`：`.alert`、`.alert-content`、`.alert-title`、`.alert-description`、
  `.alert-action`、`.alert-success`、`.alert-warning`、`.alert-destructive`
- `Item`：`.item`、`.item-sm`、`.item-xs`、`.item-outline`、`.item-muted`、
  `.item-interactive`、`.item-content`、`.item-media`、`.item-media-icon`、
  `.item-media-image`、`.item-title`、`.item-description`、`.item-actions`
- `Card`：`.card`、`.card-sm`、`.card-header`、`.card-title`、
  `.card-description`、`.card-action`、`.card-content`、`.card-footer`

规则形式与 `Button` 保持一致：原有 tag/status 选择器保留，并列追加 class 选择器：

```css
card,
.card { ... }

card:sm,
.card-sm { ... }

card:sm card-header,
.card-sm .card-header { ... }
```

组合状态改用 class 链表达：

```css
item:interactive:hover,
.item-interactive:hover { ... }

alert:destructive alert-description,
.alert-destructive .alert-description { ... }
```

所有现有子规则都要同步追加 class 版本，包括 `card-header.border-b`、
`card-header.has-card-action`、`card-content.clip-safe`、`item:xs item-content`、
`item:sm item-media:image` 等组合；不能只迁移顶层规则。

不修改 C widget 的 status/attr 行为，class 层只作为额外入口。

### React class helper

新增 `packages/react/src/widgets/variants.ts`，从包根导出：

```ts
buttonVariants({ variant?: ButtonVariant; size?: ButtonSize }): string
badgeVariants({ variant?: BadgeVariant; color?: BadgeColor }): string
alertVariants({ variant?: AlertVariant }): string
itemVariants({ variant?: ItemVariant; size?: ItemSize; interactive?: boolean }): string
cardVariants({ size?: CardSize }): string
```

示例：

```tsx
<a className={buttonVariants({ variant: "secondary", size: "sm" })}>Login</a>
<div className={cardVariants({ size: "sm" })}>
  <div className="card-header">...</div>
</div>
```

`Button`、`Badge`、`Alert`、`Item`、`Card` 的 `render` 在目标不是原生 widget
标签时自动调用对应 helper，把 `variant`、`size` 等属性转换成 class，并从最终属性
中移除这些样式属性。原生 widget 标签仍走原有的 attribute/status 路径。

### 不批量处理其他部件

`Field`、`Attachment`、`Sidebar`、`Dialog` 等结构部件不新增 class 变体。
它们的主要价值是结构和行为，渲染成其他标签会丢失布局语义；需要复用时直接使用
对应组件。

## 类型设计

### 公共类型

`WidgetBaseAttributes` 保留 `$ref`、`className`、`children` 和
`[x: string]: any`，并补充以下通用属性：

- `id`、`name`、`title`、`style`、`type`、`tabIndex`
- `disabled`、`readOnly`
- `htmlFor`、`for`
- `placeholder`
- `render?: React.ReactElement`

新增：

```ts
export type Booleanish = boolean | "true" | "false";
export type WidgetProp<T> = T | ObjectBinding;
```

所有有值语义的属性都用 `WidgetProp<T>`，使 `useState` 绑定值可以直接传入。
`ObjectBinding` 类型从 `../compiler/binding.js` 以 `type` 方式导入。

### 部件属性接口

有专属属性的部件定义 `XxxAttributes extends WidgetBaseAttributes`，并导出
`XxxProps` 别名；没有额外属性的部件直接使用 `WidgetBaseProps`。
属性来源为 `docs/widget-fields/*.ts`、C 侧 `setattr` 实现和 TSX 示例，主要包含：

- `Accordion`：`multiple`、`defaultValue`、`value`
- `AccordionItem`：`value`、`open`、`disabled`
- `AccordionTrigger`：`chevron`
- `Alert`：`variant`
- `AlertDialog`：`open`
- `AlertDialogContent`：`size`
- `Attachment`：`state`、`size`、`orientation`
- `AttachmentAction`：`size`
- `AttachmentMedia`：`variant`、`src`
- `Badge`：`variant`、`color`
- `Breadcrumb`：`path`、`separator`、`collapse-from`
- `BreadcrumbItem`：`data-path`、`data-key`、`data-label`
- `Button`：`variant`、`size`、`disabled`
- `ButtonGroup`：`orientation`
- `ButtonGroupSeparator`：`orientation`
- `Card`：`size`
- `Checkbox`：`checked`、`indeterminate`
- `Collapsible`：`defaultOpen`、`open`
- `Dialog`：`open`、`showCloseButton`
- `DropdownMenu`：`defaultOpen`、`open`、`matchTriggerWidth`
- `DropdownMenuCheckboxItem`：`checked`、`disabled`、`variant`
- `DropdownMenuContent` / `DropdownMenuSubContent`：`side`、`align`、`sideOffset`、`alignOffset`
- `DropdownMenuItem`：`disabled`、`variant`
- `DropdownMenuRadioGroup`：`value`
- `DropdownMenuRadioItem`：`value`、`disabled`
- `DropdownMenuSub`：`defaultOpen`、`open`
- `DropdownMenuSubTrigger`：`disabled`
- `Icon`：`library`、`name`、`size`、`filled`
- `InputGroup`：`disabled`
- `InputGroupAddon`：`align`
- `InputGroupButton`：`variant`、`size`、`disabled`
- `InputGroupInput`：`placeholder`、`type`、`disabled`、`defaultValue`
- `InputGroupTextarea`：`placeholder`、`disabled`、`defaultValue`
- `Item`：`variant`、`size`、`interactive`
- `ItemMedia`：`variant`
- `Label`：`for`、`htmlFor`
- `Popover`：`open`
- `PopoverContent`：`side`、`align`、`sideOffset`、`alignOffset`
- `Progress`：`value`
- `RadioGroup`：`value`
- `RadioGroupItem`：`value`、`checked`
- `Scrollbar`：`orientation`
- `Select`：`value`、`placeholder`、`disabled`、`alignItemWithTrigger`、`defaultValue`
- `SelectItem`：`value`、`disabled`
- `Shimmer`：`running`、`color`、`duration`、`spread`、`angle`、`phase`
- `Sidebar`：`collapsible`、`side`
- `SidebarProvider`：`defaultOpen`、`open`
- `SidebarGroupLabel`：`data-collapsible-trigger`
- `Spinner`：`running`、`speed`、`angle`
- `TextInput`：`placeholder`、`multiline`、`type`、`defaultValue`
- `Tooltip`：`delay`
- `TooltipContent`：`side`、`align`、`sideOffset`、`alignOffset`
- `Link` / `a`：`href`、`target`

对于文档使用 kebab-case 字段的接口（如 `collapse-from`、`side-offset`），
同时声明 kebab 字段和对应 camelCase 别名，两种写法都能通过类型检查。

### JSX IntrinsicElements

在 `declare module "react"` 中为所有不与 DOM 冲突的 LCUI 标签声明属性类型，
例如 `accordion`、`accordion-item`、`textinput`、`icon`、`checkbox`、
`dropdown-menu`、`scrollarea-content`。

`dialog`、`progress`、`select`、`button`、`a`、`label` 与 React DOM 内置标签冲突，
不覆盖；用户通过组件形式使用。为支持文档中偶发的 `<button variant="primary">`，
在 `jsx-augment.ts` 中给 `ButtonHTMLAttributes<T>` 增加 `variant` 属性。

## 动态属性修复

当前 `compile.ts` 把 `ObjectBinding` 属性直接放入 `node.attributes`，
`ui-loader` 通过 `String()` 生成 `ui_widget_set_attr(w, "value", "[object Object]")`。

修复方式：

1. `transformReactNode` 检测到 `isObjectBinding(value)` 时，不写入 `node.attributes`，
   而是记录到 `dynamicAttributes`。
2. 节点处理完成后，为该节点分配 ref。
3. 布尔 binding 直接生成 `(<binding> ? "true" : "false")`；其他类型用
   `stringifyValue(binding)` 生成字符串表达式。
4. 向组件上下文的 `ctx.body` 追加：
   `ui_widget_set_attr(<ref>, "<attrName>", <valueExpr>)`。
5. 这段代码在 `react_update` 中执行，位于模板创建之后，与现有动态 `style`
   的处理顺序一致。
6. 属性名使用转换后的 kebab-case 名称。

## 文件结构

```text
packages/react/src/widgets/
  factory.ts          # createWidget、属性转换、render、默认 props/class 合并
  variants.ts         # buttonVariants/badgeVariants/alertVariants/itemVariants/cardVariants
  types.ts            # 公共类型、JSX.IntrinsicElements 聚合
  attributes/
    common.ts         # WidgetBaseAttributes、Booleanish、WidgetProp
    form.ts           # Text/TextInput/Label/Checkbox/RadioGroup/InputGroup/Icon 等
    layout.ts         # Card/Item/Empty/Field/Attachment/ButtonGroup/Badge/Alert
    navigation.ts     # Breadcrumb/Sidebar/ScrollArea/Scrollbar
    overlay.ts        # Dialog/AlertDialog/DropdownMenu/Popover/Tooltip/Select/Portal
    disclosure.ts     # Accordion/Collapsible
  base.tsx
  form.tsx
  layout.tsx
  navigation.tsx
  overlay.tsx
  disclosure.tsx
  scroll.tsx
  router.tsx
  index.ts
```

LCUI 仓库同步修改：

```text
src/styles/style-nova.css      # 增加 Badge/Alert/Item/Card 的 class 选择器规则
src/styles/style-nova.css.h    # 由 npm run build-styles 重新生成
```

每个分组文件只负责该组组件的导出；`index.ts` 继续通过副作用导入
`./types.js`，保证 `JSX.IntrinsicElements` 声明随 barrel 一起加载。

## 测试与验证

1. `npm run build -w @lcui/react` 通过。
2. 单元测试：
   - 每个导出组件映射到预期标签，且 `shouldPreRender === true`。
   - 属性转换：`defaultValue`、`defaultOpen`、`htmlFor`、`className` 合并。
   - 包装组件：`TextInput defaultValue`、`DialogClose` 默认图标、
     `InputGroup*` class/属性、`AttachmentAction` 默认值、`SidebarMenuButton` render 合并。
   - `render`：根节点替换、触发器内容替换、children 覆盖、class 合并、
     样式属性转 class。
   - `variants` helper：每个 helper 的输出组合。
   - 动态属性：编译含 `useState` 的组件后，`node.attributes` 不包含 binding，
     `reactCode` 包含 `ui_widget_set_attr(..., "value", ...)`。
3. 类型检查：
   - 新增 `packages/react/test/usage.tsx`，用文档风格的 props 覆盖全部 158 个组件，
     包括 `render` 和 variants helper。
   - 新增 `packages/react/tsconfig.test.json`，`npm run typecheck` 同时检查 `src` 和
     该用法文件。
4. LCUI 仓库：
   - `npm run build-styles` 重新生成 `src/styles/style-nova.css.h`。
   - `npm run check-theme` 通过。
5. 临时验证：用本地 `@lcui/react` 对 `F:\code\LCUI\docs\examples\*-tsx\example.tsx`
   运行一次 `tsc --noEmit`，确认文档示例通过（不提交该配置）。

## 兼容性与风险

- `createTagWidget` 改为经过属性转换后，已有组件的行为保持兼容：`className`、`$ref`
  和事件属性最终结果不变；已有测试需继续通过。
- `WidgetBaseAttributes` 的索引签名保留，避免破坏用户传入自定义属性。
- 动态属性修复只影响 `ObjectBinding` 属性，静态属性输出格式不变。
- `render` 是新增可选属性，不改变未传 `render` 时的输出。
- class 变体层与原有 tag/status 选择器并存，不改变 C widget 的 status/attr 行为。
- 新组件数量较多，通过分组文件和共享工厂控制单文件体积；类型按部件拆分，避免
  单个 `types.ts` 膨胀。
- LCUI 主题层修改和 `@lcui/react` 的 variants helper 需要同步发布：若主题层未更新，
  helper 仍会输出 class，只是对应 class 规则缺失；文档需要说明版本要求。

## 附录 A：完整组件映射

| 组件                       | 标签 / 实现                   |
| -------------------------- | ----------------------------- |
| `Accordion`                | `accordion`                   |
| `AccordionContent`         | `accordion-content`           |
| `AccordionItem`            | `accordion-item`              |
| `AccordionTrigger`         | `accordion-trigger`           |
| `Alert`                    | `alert`                       |
| `AlertAction`              | `alert-action`                |
| `AlertContent`             | `alert-content`               |
| `AlertDescription`         | `alert-description`           |
| `AlertDialog`              | `alert-dialog`                |
| `AlertDialogAction`        | `alert-dialog-action`         |
| `AlertDialogCancel`        | `alert-dialog-cancel`         |
| `AlertDialogContent`       | `alert-dialog-content`        |
| `AlertDialogDescription`   | `alert-dialog-description`    |
| `AlertDialogFooter`        | `alert-dialog-footer`         |
| `AlertDialogHeader`        | `alert-dialog-header`         |
| `AlertDialogMedia`         | `alert-dialog-media`          |
| `AlertDialogOverlay`       | `alert-dialog-overlay`        |
| `AlertDialogTitle`         | `alert-dialog-title`          |
| `AlertDialogTrigger`       | `alert-dialog-trigger`        |
| `AlertTitle`               | `alert-title`                 |
| `Attachment`               | `attachment`                  |
| `AttachmentAction`         | `button` 包装                 |
| `AttachmentActions`        | `attachment-actions`          |
| `AttachmentContent`        | `attachment-content`          |
| `AttachmentDescription`    | `attachment-description`      |
| `AttachmentGroup`          | `attachment-group`            |
| `AttachmentMedia`          | `attachment-media`            |
| `AttachmentTitle`          | `attachment-title`            |
| `AttachmentTrigger`        | `attachment-trigger`          |
| `Badge`                    | `badge`                       |
| `Breadcrumb`               | `breadcrumb`                  |
| `BreadcrumbEllipsis`       | `breadcrumb-ellipsis`         |
| `BreadcrumbItem`           | `breadcrumb-item`             |
| `BreadcrumbLink`           | `breadcrumb-link`             |
| `BreadcrumbList`           | `breadcrumb-list`             |
| `BreadcrumbPage`           | `breadcrumb-page`             |
| `BreadcrumbSeparator`      | `breadcrumb-separator`        |
| `Button`                   | `button`                      |
| `ButtonGroup`              | `button-group`                |
| `ButtonGroupSeparator`     | `button-group-separator`      |
| `ButtonGroupText`          | `button-group-text`           |
| `Card`                     | `card`                        |
| `CardAction`               | `card-action`                 |
| `CardContent`              | `card-content`                |
| `CardDescription`          | `card-description`            |
| `CardFooter`               | `card-footer`                 |
| `CardHeader`               | `card-header`                 |
| `CardTitle`                | `card-title`                  |
| `Checkbox`                 | `checkbox`                    |
| `Collapsible`              | `collapsible`                 |
| `CollapsibleContent`       | `collapsible-content`         |
| `CollapsibleTrigger`       | `collapsible-trigger`         |
| `Dialog`                   | `dialog`                      |
| `DialogClose`              | `button` 包装                 |
| `DialogContent`            | `dialog-content`              |
| `DialogDescription`        | `dialog-description`          |
| `DialogFooter`             | `dialog-footer`               |
| `DialogHeader`             | `dialog-header`               |
| `DialogOverlay`            | `dialog-overlay`              |
| `DialogTitle`              | `dialog-title`                |
| `DialogTrigger`            | `dialog-trigger`              |
| `DropdownMenu`             | `dropdown-menu`               |
| `DropdownMenuCheckboxItem` | `dropdown-menu-checkbox-item` |
| `DropdownMenuContent`      | `dropdown-menu-content`       |
| `DropdownMenuGroup`        | `dropdown-menu-group`         |
| `DropdownMenuItem`         | `dropdown-menu-item`          |
| `DropdownMenuLabel`        | `dropdown-menu-label`         |
| `DropdownMenuRadioGroup`   | `dropdown-menu-radio-group`   |
| `DropdownMenuRadioItem`    | `dropdown-menu-radio-item`    |
| `DropdownMenuSeparator`    | `dropdown-menu-separator`     |
| `DropdownMenuShortcut`     | `dropdown-menu-shortcut`      |
| `DropdownMenuSub`          | `dropdown-menu-sub`           |
| `DropdownMenuSubContent`   | `dropdown-menu-sub-content`   |
| `DropdownMenuSubTrigger`   | `dropdown-menu-sub-trigger`   |
| `DropdownMenuTrigger`      | `dropdown-menu-trigger`       |
| `Empty`                    | `empty`                       |
| `EmptyAction`              | `empty-action`                |
| `EmptyContent`             | `empty-content`               |
| `EmptyDescription`         | `empty-description`           |
| `EmptyHeader`              | `empty-header`                |
| `EmptyMedia`               | `empty-media`                 |
| `EmptyTitle`               | `empty-title`                 |
| `Field`                    | `field`                       |
| `FieldContent`             | `field-content`               |
| `FieldDescription`         | `field-description`           |
| `FieldGroup`               | `field-group`                 |
| `FieldLabel`               | `field-label`                 |
| `FieldLegend`              | `field-legend`                |
| `FieldSeparator`           | `field-separator`             |
| `FieldSet`                 | `field-set`                   |
| `FieldTitle`               | `field-title`                 |
| `Icon`                     | `icon`                        |
| `InputGroup`               | `input-group`                 |
| `InputGroupAddon`          | `input-group-addon`           |
| `InputGroupButton`         | `button` 包装                 |
| `InputGroupInput`          | `textinput` 包装              |
| `InputGroupKbd`            | `input-group-kbd`             |
| `InputGroupText`           | `input-group-text`            |
| `InputGroupTextarea`       | `textinput` 包装              |
| `Item`                     | `item`                        |
| `ItemActions`              | `item-actions`                |
| `ItemContent`              | `item-content`                |
| `ItemDescription`          | `item-description`            |
| `ItemMedia`                | `item-media`                  |
| `ItemTitle`                | `item-title`                  |
| `Label`                    | `label`                       |
| `Popover`                  | `popover`                     |
| `PopoverContent`           | `popover-content`             |
| `PopoverDescription`       | `popover-description`         |
| `PopoverHeader`            | `popover-header`              |
| `PopoverTitle`             | `popover-title`               |
| `PopoverTrigger`           | `popover-trigger`             |
| `Portal`                   | `portal`                      |
| `Progress`                 | `progress`                    |
| `ProgressLabel`            | `progress-label`              |
| `ProgressValue`            | `progress-value`              |
| `RadioGroup`               | `radio-group`                 |
| `RadioGroupItem`           | `radio-group-item`            |
| `ScrollArea`               | `scrollarea`                  |
| `ScrollAreaContent`        | `scrollarea-content`          |
| `Scrollbar`                | `scrollbar`                   |
| `Select`                   | `select`                      |
| `SelectContent`            | `select-content`              |
| `SelectGroup`              | `select-group`                |
| `SelectItem`               | `select-item`                 |
| `SelectLabel`              | `select-label`                |
| `SelectSeparator`          | `select-separator`            |
| `SelectTrigger`            | `select-trigger`              |
| `SelectValue`              | `select-value`                |
| `Shimmer`                  | `shimmer`                     |
| `ShimmerContent`           | `shimmer-content`             |
| `Sidebar`                  | `sidebar`                     |
| `SidebarContent`           | `sidebar-content`             |
| `SidebarFooter`            | `sidebar-footer`              |
| `SidebarGroup`             | `sidebar-group`               |
| `SidebarGroupAction`       | `sidebar-group-action`        |
| `SidebarGroupContent`      | `sidebar-group-content`       |
| `SidebarGroupLabel`        | `sidebar-group-label`         |
| `SidebarHeader`            | `sidebar-header`              |
| `SidebarMenu`              | `sidebar-menu`                |
| `SidebarMenuAction`        | `sidebar-menu-action`         |
| `SidebarMenuBadge`         | `sidebar-menu-badge`          |
| `SidebarMenuButton`        | `button` 包装                 |
| `SidebarMenuItem`          | `sidebar-menu-item`           |
| `SidebarMenuSub`           | `sidebar-menu-sub`            |
| `SidebarMenuSubButton`     | `button` 包装                 |
| `SidebarMenuSubItem`       | `sidebar-menu-sub-item`       |
| `SidebarProvider`          | `sidebar-provider`            |
| `SidebarRail`              | `sidebar-rail`                |
| `SidebarTrigger`           | `sidebar-trigger`             |
| `Spinner`                  | `spinner`                     |
| `SpinnerContent`           | `spinner-content`             |
| `Text`                     | `text`                        |
| `TextInput`                | `textinput`                   |
| `Tooltip`                  | `tooltip`                     |
| `TooltipContent`           | `tooltip-content`             |
| `TooltipTrigger`           | `tooltip-trigger`             |
| `Widget`                   | `widget`                      |
