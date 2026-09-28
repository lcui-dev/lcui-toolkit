# CSS 字符串分段加载方案

## 背景

`@lcui/cli` 的 CSS loader 会先通过 PostCSS 转换 CSS，再将结果输出到生成的 C 头文件中，
运行时由 `ui_load_css_string()` 解析。当前输出可能把整份 CSS 放进单个 C 字符串字面量；大型
CSS 在 MSVC 下可能触发 C2026。

MSVC 对 C2026 的限制发生在相邻字符串字面量拼接之前：单个字面量不能超过 16,380 个单字节
字符。将它们写成相邻字面量虽能避开该限制，却仍会形成一个拼接后的字符串，且拼接后长度
限制随 MSVC 版本而异。本方案不依赖相邻字面量拼接，而是将 CSS 放入多个独立字符串常量；CLI
在生成阶段计算每段长度和总长度，生成运行时代码将分段复制到临时完整字符串，再调用现有
`ui_load_css_string()`。

## 目标

1. 避免生成的任一 C 字符串字面量超过保守的源码长度上限，消除 C2026 风险。
2. 保持每个 C 字符串字面量独立且有界；不使用相邻字面量拼接。
3. 在 CLI 生成阶段计算各 chunk 的字节长度与完整 CSS 总长度，运行时不计算长度。
4. 拼接成完整字符串后只调用一次既有 `ui_load_css_string()`，保持原有 CSS 解析、字体注册、样式刷新和 `css_load` 事件语义。
5. 不新增或修改 LCUI 公共 API；保持 `@font-face`、PostCSS 转换顺序、CSS Modules 导出和现有调用方接口语义。

## 非目标

- 本方案不将 CSS 声明编译成 C 静态表；属性和值仍由现有运行时 parser 解析。
- 本方案不新增 CLI CSS 语法校验器，不改变目前支持/拒绝 CSS 语法的时机。
- 本方案不生成 `*.css.map.json`，也不引入 libcss 属性/关键字元数据导出机制。
- 本方案不改变 CSS 的字体资源解析与注册语义。

## 总体设计

PostCSS/Sass 完成现有转换后，CLI 必须以 loader 的最终 CSS 字符串为切分输入。核心 splitter 接受这段 CSS 字符串，返回 chunk、每段 UTF-8 字节长度和总长度；函数在 CLI 构建期用 PostCSS 解析最终字符串一次以取得 AST 边界。不能假设作者输入、Sass 输出、`Root.toString()` 与 `Result.css` 相同：PostCSS 可能为非 ASCII CSS 生成 `@charset`，顶层 at-rule 的 semicolon 也取决于 root stringifier 上下文。Splitter 用 PostCSS 根级 stringifier 的实际 builder 输出记录节点结束边界，以最终 CSS UTF-8 字节偏移切分。额外 AST 解析只发生在 CLI 构建期，不进入 LCUI 运行时。

CLI 默认按最终 CSS 的物理行切分：每个 chunk 对应一行，保留该行原有的 LF/CRLF 结束符，不额外插入或删除换行。每个 chunk 对应的 C 字符串字面量内容最多 `4000` 字节，以低于 C99 要求实现必须支持的 4095 字符为目标；长度按转义还原后的 CSS UTF-8 字节计算。若单行超过 `4000` 字节，则在该行内按原有分段算法进一步切分：优先在最多向前回退 `200` 字节范围内的完整顶层 CSS 规则/at-rule 结束位置切分；找不到时才在不超过 `4000` 字节的最远 UTF-8 字符边界硬切。长行硬切段可能落在 selector、property、声明值或 CSS token 内部，因此不保证该 chunk 可独立解析；所有 chunk 按原顺序重组后必须与 PostCSS 最终输出逐字节相同。任何片段都不会与下一个片段写成相邻数组元素。切分发生在 C literal 转义之前，因此不会截断生成后的 C 转义序列。

生成的 `*.css.h` 将 chunk/长度结构体数组和总长度常量定义在文件作用域。每段长度与总长度在
CLI 生成阶段根据 UTF-8 chunk 字节数计算；C 运行时不调用 `strlen()` 或累加长度，只分配缓冲区、
按长度复制、调用现有加载 API，再释放缓冲区，大致如下：

```c
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

static const struct {
        const char *chunk;
        size_t length;
} css_str_global_chunks[] = {
        { "abc\n", 4 },
        { "de\n", 3 },
};
static const size_t css_str_global_total_length = 7;

static inline void ui_load_css_string_global_chunks(void)
{
        size_t i;
        char *css = malloc(css_str_global_total_length + 1);
        char *dest;

        if (!css) {
                return;
        }
        dest = css;
        for (i = 0; i < sizeof(css_str_global_chunks) / sizeof(css_str_global_chunks[0]); ++i) {
                memcpy(dest, css_str_global_chunks[i].chunk, css_str_global_chunks[i].length);
                dest += css_str_global_chunks[i].length;
        }
        *dest = 0;
        ui_load_css_string(css, "src/global.css");
        free(css);
}
```

`splitCssIntoChunks(cssText: string, maxBytes = 4000, backtrackBytes = 200)` 返回
`{ chunks: string[], lengths: number[], totalLength: number }`；lengths 和总长度在此核心函数中按
UTF-8 bytes 计算。`css_str_{ident}_chunks[]`（每项含 `chunk` 与 `length`）和
`css_str_{ident}_total_length` 均为文件作用域静态常量，由 CLI 根据 chunk 的 UTF-8 字节长度预先生成。总长度等于所有 chunk 字节长度之和；
临时 buffer 仅在同步调用 `ui_load_css_string()` 期间存活，因此 LCUI 的现有解析、`@font-face`
回调、样式刷新和单次 `css_load` 事件语义保持不变。空 CSS 至少生成一个空 chunk，总长度为 0，
仍调用一次 `ui_load_css_string()`。

## CLI 生成流程

1. 保持 `postcss-url`、CSS Modules 和项目 PostCSS 配置的既有执行顺序。
2. 使用 PostCSS 最终输出 CSS 文本；不重新解析 AST，也不改变规则和值。
3. 在生成 C 源码前按每个 chunk 解码后的 CSS UTF-8 字节数切分；最大长度固定为 4000 字节。
4. 每段独立输出为 `static const char *` 数组元素；不使用相邻字面量拼接。
5. 在 `*.css.h` 文件作用域生成 `static const struct { const char *chunk; size_t length; } css_str_{ident}_chunks[]` 以及总长度常量；内联包装函数按每项长度将分段复制到临时完整字符串，再调用一次既有 `ui_load_css_string()`。
6. 将模块元数据中的 `initCode` 设为该内联函数的调用语句：`ui_load_css_string_{ident}_chunks();`。
7. `*.css.ts` 的 CSS Modules tokens、资源元数据和 TypeScript 调用方接口保持不变。

切分逻辑必须依据解码后的 CSS UTF-8 字节数计长，而不能按 JS UTF-16 code unit 数量切分。默认 chunk 边界是原 CSS 的 LF/CRLF 物理行边界，原有换行字节归属前一行，不得额外插入行尾换行或删除原换行。每段上限 `4000` 字节不可超出；单行超长时，从当前 4000 字节目标位置向前查找最多 `200` 字节内最近的完整顶层节点结束位置，找到则优先切分，否则硬切到不超过 `4000` 字节的 UTF-8 字符边界。每段独立转义成 C literal。CLI 生成阶段按每段实际 C 字符串字节长度预计算每项 `length` 和总长度；运行时代码只执行分配、顺序 `memcpy()`、NUL 终止和释放，不调用 `strlen()` 或执行长度累加。重组后必须逐字节等于最终 PostCSS CSS，再由同一次 `ui_load_css_string()` 调用解析。

## 迁移与验证

1. 为分段函数添加 CLI 单元测试：重组各片段后的字节必须与 PostCSS 输出一致；普通 CSS 每个物理行对应一个 chunk 并保留原换行；每个生成字面量内容不超过 4000 字节；覆盖 C 转义、UTF-8、超长行、完整规则边界优先、最大 200 字节回退窗口及无合适边界时硬切。
2. 为 loader 增加大型 CSS fixture，验证 chunk/长度结构体数组和总长度常量与完整 CSS 字节数一致；生成包装代码不含 `strlen()`/运行时长度求和，按预计算长度复制后恰好调用一次 `ui_load_css_string()`；保留 `initCode`、source path 和 CSS Modules 输出。
3. UI 集成测试继续通过现有 `ui_load_css_string()` 加载完整 CSS 字符串并验证计算样式；不新增 chunk-loading API 或对应 LCUI test suite。
4. 验证通过拼接后的完整字符串加载时，`@font-face` 正常注册、样式刷新与 `css_load` 事件各发生一次。
5. 在 Windows MSVC 下构建超过 16,380 字节、并且总 CSS 超过目标工具链单个拼接字面量限制的大型 CSS；确认无 C2026 且输出行为一致。
6. 运行 CLI 测试及 doc-viewer 构建，确认 CSS import、字体资源和组件样式正常。

本方案的范围仅是安全地把长 CSS 源码存放于多个独立常量，并在 CLI 生成阶段预计算分段长度及总长度；生成的 C 包装代码重组完整字符串后调用现有 `ui_load_css_string()`。它不新增或修改 LCUI 公共 API，也不承诺降低 CSS parser 的启动或属性/值解析成本。若后续仍需优化运行时解析，应另行设计静态声明编译方案，并单独评估元数据共享、错误诊断及 cascade 顺序。
