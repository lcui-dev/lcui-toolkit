import assert from "assert";
import fs from "fs-extra";
import path from "path";
import postcss from "postcss";
import postcssUrl from "postcss-url";
import * as sass from "sass";
import compile from "../lib/compiler/index.js";
import { fixturesDir, withCwd, ensureLcuiReact, cleanGenerated } from "./helpers.js";

describe("css-loader — chunked C strings", () => {
  const fixtureDir = path.join(fixturesDir, "css-loader-chunks");
  const globalCssPath = path.join(fixtureDir, "app", "global.css");

  before(function () {
    this.timeout(60000);
    ensureLcuiReact(fixtureDir);
    cleanGenerated(fixtureDir, "app");
    const css = "/* non-ascii: café, backslash: \\\\ */\r\n" +
      Array.from(
      { length: 20 },
      (_, index) => `.chunk-${index} { content: "${"x".repeat(3860)}"; }${index === 0 ? "\r\n" : "\n"}`
    ).join("");
    fs.writeFileSync(globalCssPath, css);
  });

  after(() => {
    fs.removeSync(globalCssPath);
  });

  it("emits bounded chunks and calls the resource-specific inline loader", async function () {
    this.timeout(60000);
    await withCwd(fixtureDir, () => compile(undefined, {}));

    const cssHPath = path.join(fixtureDir, "app", "global.css.h");
    const layoutHPath = path.join(fixtureDir, "app", "layout.tsx.h");
    assert.ok(fs.existsSync(cssHPath), `expected css-loader to emit ${cssHPath}`);
    assert.ok(fs.existsSync(layoutHPath), `expected ui-loader to emit ${layoutHPath}`);

    const cssH = fs.readFileSync(cssHPath, "utf-8");
    const layoutH = fs.readFileSync(layoutHPath, "utf-8");
    assert.ok(Buffer.byteLength(cssH, "utf8") > 65535);
    assert.match(cssH, /static const struct \{/);
    assert.match(cssH, /const char \*chunk;/);
    assert.match(cssH, /size_t length;/);
    assert.match(cssH, /\} css_str_global_chunks\[\] = \{/);
    assert.doesNotMatch(cssH, /css_str_global_chunk_lengths/);
    assert.match(cssH, /static const size_t css_str_global_total_length = \d+;/);
    assert.match(cssH, /static inline void ui_load_css_string_global_chunks\(void\)/);
    assert.match(
      cssH,
      /memcpy\(dest, css_str_global_chunks\[i\]\.chunk, css_str_global_chunks\[i\]\.length\)/
    );
    assert.match(cssH, /dest \+= css_str_global_chunks\[i\]\.length;/);
    assert.match(cssH, /css\[css_str_global_total_length\] = 0;/);
    assert.match(cssH, /ui_load_css_string\(css, "global\.css"\);/);
    assert.strictEqual((cssH.match(/ui_load_css_string\(/g) ?? []).length, 1);
    assert.doesNotMatch(cssH, /ui_load_css_string_chunks\(/);
    assert.doesNotMatch(cssH, /strlen\s*\(/);
    assert.match(layoutH, /ui_load_css_string_global_chunks\(\);/);

    const chunksMatch = cssH.match(/\} css_str_global_chunks\[\] = \{([\s\S]*?)^\s*\};/m);
    assert.ok(chunksMatch, "expected the generated header to contain the global chunk array");
    const chunkLines = chunksMatch[1].split("\n").filter((line) => line.trim().startsWith("{"));
    assert.ok(chunkLines.length > 0);
    assert.ok(chunkLines.every((line) => line.length - line.trimStart().length === 8));

    const chunkEntries = chunkLines.map((line) => {
      const match = line.trim().match(/^\{\s*("(?:\\.|[^"\\])*")\s*,\s*(\d+)\s*\},?$/);
      assert.ok(match, `unexpected chunk entry: ${line.trim()}`);
      return { chunk: JSON.parse(match[1]), length: Number(match[2]) };
    });
    const chunks = chunkEntries.map((entry) => entry.chunk);
    const lengths = chunkEntries.map((entry) => entry.length);
    const sassCss = sass.compileString(fs.readFileSync(globalCssPath, "utf-8")).css;
    const postcssResult = await postcss()
      .use(postcssUrl({ async url(asset) { return asset.url; } }))
      .process(sassCss, { from: globalCssPath })
      .async();
    assert.strictEqual(chunks.join(""), postcssResult.css);
    assert.ok(chunks.length >= 20, `expected a chunk per rule, got ${chunks.length}`);
    assert.ok(chunks.every((chunk) => Buffer.byteLength(chunk, "utf8") <= 4000));

    assert.deepStrictEqual(
      lengths,
      chunks.map((chunk) => Buffer.byteLength(chunk, "utf8"))
    );
    const totalLength = Number(
      cssH.match(/static const size_t css_str_global_total_length = (\d+);/)[1]
    );
    assert.strictEqual(totalLength, lengths.reduce((total, length) => total + length, 0));
  });

  it("emits zero-length metadata for an empty stylesheet", async function () {
    this.timeout(60000);
    fs.writeFileSync(globalCssPath, "");
    cleanGenerated(fixtureDir, "app");
    await withCwd(fixtureDir, () => compile(undefined, {}));

    const cssH = fs.readFileSync(path.join(fixtureDir, "app", "global.css.h"), "utf-8");
    assert.match(cssH, /css_str_global_chunks\[\] = \{\s*\{\s*""\s*,\s*0\s*\},?\s*\};/);
    assert.doesNotMatch(cssH, /css_str_global_chunk_lengths/);
    assert.match(cssH, /css_str_global_total_length = 0;/);
    assert.strictEqual((cssH.match(/ui_load_css_string\(css,/g) ?? []).length, 1);
  });

  it("preserves CSS Modules class exports", async function () {
    this.timeout(60000);
    const pagePath = path.join(fixtureDir, "app", "page.tsx");
    const original = fs.readFileSync(pagePath, "utf-8");
    fs.writeFileSync(
      pagePath,
      'import styles from "./theme.module.css";\n' +
        'export default function Page() { return <div className={styles.title}>Home</div>; }\n'
    );
    try {
      cleanGenerated(fixtureDir, "app");
      await withCwd(fixtureDir, () => compile(undefined, {}));
      const pageH = fs.readFileSync(path.join(fixtureDir, "app", "page.tsx.h"), "utf-8");
      assert.match(pageH, /_title_[a-zA-Z0-9_-]+/);
    } finally {
      fs.writeFileSync(pagePath, original);
    }
  });
});
