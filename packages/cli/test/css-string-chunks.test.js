import assert from "assert";
import { splitCssIntoChunks } from "../lib/compiler/css-string-chunks.js";

describe("splitCssIntoChunks", () => {
  it("should leave short CSS in one unchanged chunk", () => {
    const css = '.a { content: "quote\\" and slash\\\\"; }';
    const { chunks } = splitCssIntoChunks(css);

    assert.deepStrictEqual(chunks, [css]);
  });

  it("should emit one chunk per physical line and preserve original line endings", () => {
    const css = "/* head */\r\n.a { color: red; }\n\n.b{}";

    assert.deepStrictEqual(splitCssIntoChunks(css).chunks, [
      "/* head */\r\n",
      ".a { color: red; }\n",
      "\n",
      ".b{}",
    ]);
  });

  it("should prefer a complete top-level rule within the backtrack window", () => {
    const firstRule = `.a{content:"${"x".repeat(3880)}";}`;
    const prefix = "/* before */\n";
    const css = `${prefix}${firstRule} /* between */ .b{content:"${"y".repeat(180)}";}.c{color:blue;}\n/* trailing */  `;
    const { chunks } = splitCssIntoChunks(css);

    assert.strictEqual(chunks.join(""), css);
    assert.strictEqual(chunks[0], prefix);
    assert.strictEqual(chunks[1], `${firstRule} /* between */`);
    assert.ok(chunks.every((chunk) => Buffer.byteLength(chunk) <= 4000));
  });

  it("should hard-cut when no complete node ends within the backtrack window", () => {
    const css = `.a{content:"${"x".repeat(5000)}";}`;
    const { chunks } = splitCssIntoChunks(css);

    assert.strictEqual(chunks.join(""), css);
    assert.strictEqual(Buffer.byteLength(chunks[0]), 4000);
    assert.notStrictEqual(chunks[0].at(-1), "}");
    assert.ok(chunks.every((chunk) => Buffer.byteLength(chunk) <= 4000));
  });

  it("should never split a multi-byte UTF-8 code point", () => {
    const css = `/*${"a".repeat(3996)}🙂*/`;
    const { chunks } = splitCssIntoChunks(css);

    assert.strictEqual(chunks.join(""), css);
    assert.strictEqual(Buffer.byteLength(chunks[0]), 3998);
    assert.ok(chunks[1].startsWith("🙂"));
    assert.ok(chunks.every((chunk) => Buffer.byteLength(chunk) <= 4000));
  });

  it("should return one empty chunk for empty CSS", () => {
    assert.deepStrictEqual(splitCssIntoChunks(""), {
      chunks: [""],
      lengths: [0],
      totalLength: 0,
    });
  });

  it("should preserve a PostCSS charset prefix absent from the root AST", () => {
    const finalCss = '@charset "UTF-8";\n.café { color: red; }\n';

    const { chunks } = splitCssIntoChunks(finalCss);

    assert.strictEqual(chunks.join(""), finalCss);
    assert.strictEqual(chunks[0], '@charset "UTF-8";\n');
  });

  it("should include root-context semicolons in readable at-rule boundaries", () => {
    const finalCss = `@charset "UTF-8";/*${"a".repeat(100)}*/`;

    const { chunks } = splitCssIntoChunks(finalCss, 25, 10);

    assert.strictEqual(chunks.join(""), finalCss);
    assert.strictEqual(chunks[0], '@charset "UTF-8";');
    assert.ok(chunks.every((chunk) => Buffer.byteLength(chunk, "utf8") <= 25));
  });

  it("should return chunks and UTF-8 byte lengths directly from CSS text", () => {
    const css = '@charset "UTF-8";\n/* café\\\\ */\n.a{content:"🙂"}\n';

    const result = splitCssIntoChunks(css);

    assert.strictEqual(result.chunks.join(""), css);
    assert.deepStrictEqual(
      result.lengths,
      result.chunks.map((chunk) => Buffer.byteLength(chunk, "utf8"))
    );
    assert.strictEqual(result.totalLength, Buffer.byteLength(css, "utf8"));
    assert.strictEqual(
      result.totalLength,
      result.lengths.reduce((total, length) => total + length, 0)
    );
  });
});
