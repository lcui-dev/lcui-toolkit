# Fluent 图标 CSS 选择器方案

## 背景

当前 `@lcui/fluent-icons` 为每个图标生成 `.name-<size>-<style>` 选择器。调用方必须显式
指定尺寸和风格，无法表达“默认 regular/24，按状态切换 filled，按尺寸切换字形”的常用语义。

本方案保留 CSS `content` 规则作为 glyph 选择机制；不以 React 的
`String.fromCodePoint()` 渲染路径替代它。

## 目标

1. 每个图标默认使用 regular 24 的 codepoint；若没有 regular 24，则选择最接近 24 的可用 regular 尺寸，相同距离时选择较小尺寸。
2. 使用 `fui-icon-filled` modifier 切换到 filled 风格。
3. 使用 `fui-icon-glyph-<N>` modifier 选择指定设计尺寸的字形；它与实际渲染字体大小不同。
4. 维持字体风格与 `content` 字形同步。
5. 图标名类使用 `fui-icon-<name>` 命名空间；每个 glyph 规则都由 `.fui-icon` 基类限定，避免裸 `.add` 等业务类名冲突。
6. 新输出只提供语义化类，不保留旧 `.name-<size>-<style>` class 或旧 CSS/TTF 路径。

## 生成的 CSS

以 `checkmark` 为例，规则如下：

```css
/* regular 24 */
.fui-icon.fui-icon-checkmark {
  content: "\e001";
}

/* filled 24 */
.fui-icon.fui-icon-checkmark.fui-icon-filled {
  content: "\e101";
}

/* regular 48 */
.fui-icon.fui-icon-checkmark.fui-icon-glyph-48 {
  content: "\e002";
}

/* filled 48 */
.fui-icon.fui-icon-checkmark.fui-icon-filled.fui-icon-glyph-48 {
  content: "\e102";
}
```

regular 规则和 regular 字体位于 `icons.css`，filled 规则和 filled 字体位于
`icons-filled.css`；二者分别引用 `icons.ttf` 和 `icons-filled.ttf`。Regular 字体类为
`.fui-icon`，Filled 字体类为 `.fui-icon.fui-icon-filled`。不生成合并的
`style.css`。每个 CSS 文件按图标名称分组，组内规则顺序为基础、filled、glyph-size、
filled+glyph-size 中属于该风格的语义选择器，不输出旧 `.name-<size>-<style>` 选择器。
React `Icon` 和 LCUI Fluent Icon 默认输出 `fui-icon fui-icon-<name>`；filled 状态保留
`fui-icon` 并添加 `fui-icon-filled`；非 24 设计尺寸追加 `fui-icon-glyph-<N>`。CSS 规则始终
包含 `.fui-icon` 基类，因此业务侧的 `.add` 等裸类不会意外触发字形规则。

图标名类为 `fui-icon-<name>`；modifier 类为 `fui-icon-filled` 和 `fui-icon-glyph-<N>`。
为避免 modifier 与 glyph 名 token 相同，`filled` 和匹配 `glyph-<digits>` 的 Fluent 上游图标名
保留；转换器遇到这些名称必须报出明确错误，不得静默生成冲突规则。此方案与 Font Awesome
使用 family/style token（如 `fa-solid`）和图标 token（如 `fa-user`）的方式相似；本包通过
保留 token 校验防止词汇冲突。

LCUI Lucide Icon 使用 `lucide-icon` 基类以及 `lucide-icon-<name>`、
`lucide-icon-glyph-<N>` 类，不提供 filled 风格。Lucide library 处于活动状态时，
`filled=true` 不生成 Fluent filled class，并使用 regular glyph；本方案不定义 library
运行时切换行为。

规则生成顺序为基础、filled、glyph-size、filled+glyph-size。最后一种有更高 specificity，
可稳定覆盖前面规则；生成器不能依赖源 JSON 的遍历顺序。

## 缺失字形

- 图标缺少 regular 24 但有其它可表示的 regular 字形：基础 `.fui-icon.fui-icon-<name>` 规则使用最接近 24 的
  regular codepoint；距离相同则选择较小尺寸。其它 `.fui-icon-glyph-N` 规则仍只对应实际存在的 N，不
  伪造组合。
- 图标没有任何可表示的 regular 字形：不生成基础 semantic rule，整包仍可构建；React Icon
  请求该图标的 regular 风格时报告不可用。若该图标有可表示的 filled 字形，仍生成并支持
  filled 组合。
- 图标缺少 filled 24：只生成 regular 规则；filled API 请求应报错，图标 API 也应在开发
  构建中报告该风格不可用。
- 某尺寸缺少 regular 或 filled：只生成实际存在的组合。请求不存在组合时，图标 API 保持基础
  状态并输出警告；CSS 不伪造回退规则。
- 大于 `wchar_t` 范围的 codepoint：延续现有生成器的跳过与警告策略，后续由字体渲染能力的
  独立升级处理。

## 破坏性变更与版本策略

这是一次有意的破坏性变更：新版不生成旧 `.name-<size>-<style>` class/选择器，也不再生成
`style.css` 或 `FluentSystemIcons-{Regular,Filled}.{css,ttf}`。使用者需要迁移到语义类以及
`icons.css`、`icons-filled.css`、`icons.ttf`、`icons-filled.ttf`。

项目决定由于当前包使用者较少，本次不把版本号从 2 升到 3；这是明确接受的 SemVer 例外，不能
描述为向后兼容。README 必须标注 breaking change、移除的路径/类名及迁移方式；发布说明使用
Changesets，在 `.changeset/*.md` 中为 `@lcui/fluent-icons` 选择 `minor` bump（保持 major 2），
并注明 break 和迁移路径；由 `changeset version` 生成 changelog，不手工编辑 `CHANGELOG.md`。
实现提交也必须在 Conventional Commit header 使用 `!` 并附 `BREAKING CHANGE:` footer，写明移除项和迁移目标。
转换器应清理由旧版本生成的旧名称产物，避免 dist 中残留旧 API。

## 实施与验证

1. 调整 `packages/fluent-icons/scripts/convert.js`，针对每个图标、风格、glyph design-size 组合生成确定性且 scoped 的 CSS；拒绝 `filled` 和 `glyph-<digits>` 保留名称。
2. 为规则输出增加测试：默认 regular 24、filled 24、regular glyph 48、filled glyph 48、缺失 glyph、selector namespace 和保留名称冲突。
3. 调整生成的 React `Icon` 和 LCUI `Icon` class 输出，并在测试中断言 namespaced base/name/modifier、更新后的旧类清理，以及 CSS `content` 随类变化而更新。
4. 迁移 README/Changeset 与必要的 doc-viewer 示例，验证 glyph class 与字体风格同步。
