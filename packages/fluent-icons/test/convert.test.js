import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const packageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const converterPath = path.join(packageDir, "scripts", "convert.js");

function runConverter(t, regular, filled) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "lcui-fluent-icons-"));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  const fontsDir = path.join(cwd, "fonts");
  fs.mkdirSync(fontsDir);
  const distDir = path.join(cwd, "dist");
  fs.mkdirSync(distDir);
  [
    "style.css",
    "FluentSystemIcons-Regular.css",
    "FluentSystemIcons-Filled.css",
    "FluentSystemIcons-Regular.ttf",
    "FluentSystemIcons-Filled.ttf",
  ].forEach((file) => fs.writeFileSync(path.join(distDir, file), "stale generated output"));
  fs.writeFileSync(path.join(fontsDir, "FluentSystemIcons-Regular.json"), JSON.stringify(regular));
  fs.writeFileSync(path.join(fontsDir, "FluentSystemIcons-Filled.json"), JSON.stringify(filled));
  fs.writeFileSync(path.join(fontsDir, "FluentSystemIcons-Regular.ttf"), "");
  fs.writeFileSync(path.join(fontsDir, "FluentSystemIcons-Filled.ttf"), "");

  const result = spawnSync(process.execPath, [converterPath, fontsDir], {
    cwd,
    encoding: "utf8",
  });
  return {
    cwd,
    result,
    styleCssExists: fs.existsSync(path.join(cwd, "dist", "style.css")),
    regularCss: fs.existsSync(path.join(cwd, "dist", "icons.css"))
      ? fs.readFileSync(path.join(cwd, "dist", "icons.css"), "utf8")
      : "",
    filledCss: fs.existsSync(path.join(cwd, "dist", "icons-filled.css"))
      ? fs.readFileSync(path.join(cwd, "dist", "icons-filled.css"), "utf8")
      : "",
    regularFontExists: fs.existsSync(path.join(cwd, "dist", "icons.ttf")),
    filledFontExists: fs.existsSync(path.join(cwd, "dist", "icons-filled.ttf")),
    generatedTsx: fs.existsSync(path.join(cwd, "src", "index.tsx"))
      ? fs.readFileSync(path.join(cwd, "src", "index.tsx"), "utf8")
      : "",
    legacyFontFilesExist:
      fs.existsSync(path.join(cwd, "dist", "FluentSystemIcons-Regular.css")) ||
      fs.existsSync(path.join(cwd, "dist", "FluentSystemIcons-Filled.css")) ||
      fs.existsSync(path.join(cwd, "dist", "FluentSystemIcons-Regular.ttf")) ||
      fs.existsSync(path.join(cwd, "dist", "FluentSystemIcons-Filled.ttf")),
  };
}

test("generates semantic-only rules and removes legacy artifacts", (t) => {
  const output = runConverter(
    t,
    {
      ic_fluent_checkmark_24_regular: 0xe001,
      ic_fluent_checkmark_48_regular: 0xe002,
    },
    {
      ic_fluent_checkmark_24_filled: 0xe101,
      ic_fluent_checkmark_48_filled: 0xe102,
    }
  );
  const regularCss = output.regularCss;
  const filledCss = output.filledCss;

  assert.equal(output.result.status, 0, output.result.stderr);
  assert.equal(output.styleCssExists, false);
  assert.equal(output.regularFontExists, true);
  assert.equal(output.filledFontExists, true);
  assert.equal(output.legacyFontFilesExist, false);
  assert.match(regularCss, /url\("icons\.ttf"\)/);
  assert.match(filledCss, /url\("icons-filled\.ttf"\)/);
  assert.match(regularCss, /\.fui-icon\.fui-icon-checkmark \{\s*content: "\\e001";/);
  assert.match(
    regularCss,
    /\.fui-icon\.fui-icon-checkmark\.fui-icon-glyph-48 \{\s*content: "\\e002";/
  );
  assert.doesNotMatch(regularCss, /\.checkmark\s*\{/);
  assert.doesNotMatch(regularCss, /Deprecated legacy selectors/);
  assert.doesNotMatch(regularCss, /\.checkmark-[0-9]+-regular\b/);
  assert.match(
    filledCss,
    /\.fui-icon\.fui-icon-checkmark\.fui-icon-filled \{\s*content: "\\e101";/
  );
  assert.match(
    filledCss,
    /\.fui-icon\.fui-icon-checkmark\.fui-icon-filled\.fui-icon-glyph-48 \{\s*content: "\\e102";/
  );
  assert.doesNotMatch(filledCss, /\.checkmark\.filled\s*\{/);
  assert.doesNotMatch(filledCss, /Deprecated legacy selectors/);
  assert.doesNotMatch(filledCss, /\.checkmark-[0-9]+-filled\b/);
});

test("uses shared Fluent font classes for regular and filled styles", (t) => {
  const output = runConverter(
    t,
    { ic_fluent_checkmark_24_regular: 0xe001 },
    { ic_fluent_checkmark_24_filled: 0xe101 }
  );

  assert.equal(output.result.status, 0, output.result.stderr);
  assert.match(output.regularCss, /\.fui-icon \{\s*font-family: "FluentSystemIcons-Regular";/);
  assert.match(
    output.filledCss,
    /\.fui-icon\.fui-icon-filled \{\s*font-family: "FluentSystemIcons-Filled";/
  );
  assert.doesNotMatch(output.regularCss, /\.fui-icon-regular\b/);
  assert.match(output.filledCss, /\.fui-icon-filled\b/);
});

test("exports the generated icon map for compile-time icon browsers", (t) => {
  const output = runConverter(
    t,
    { ic_fluent_checkmark_24_regular: 0xe001 },
    { ic_fluent_checkmark_24_filled: 0xe101 }
  );

  assert.equal(output.result.status, 0, output.result.stderr);
  assert.match(output.generatedTsx, /export const iconMap = \{/);
  assert.match(output.generatedTsx, /export interface IconData/);
  assert.match(output.generatedTsx, /as const satisfies Readonly<Record<string, IconData>>/);
  assert.doesNotMatch(output.generatedTsx, /hasRegularStyle|hasFilledStyle/);
  assert.doesNotMatch(output.regularCss, /font-size:/);
  assert.doesNotMatch(output.filledCss, /font-size:/);
});

test("groups all regular and filled rules by icon name", (t) => {
  const output = runConverter(
    t,
    {
      ic_fluent_alpha_24_regular: 0xe001,
      ic_fluent_alpha_48_regular: 0xe002,
      ic_fluent_zeta_24_regular: 0xe003,
      ic_fluent_zeta_48_regular: 0xe004,
    },
    {
      ic_fluent_alpha_24_filled: 0xe101,
      ic_fluent_alpha_48_filled: 0xe102,
      ic_fluent_zeta_24_filled: 0xe103,
      ic_fluent_zeta_48_filled: 0xe104,
    }
  );

  assert.equal(output.result.status, 0, output.result.stderr);
  const alphaRegularEnd = output.regularCss.indexOf(".fui-icon.fui-icon-zeta {");
  assert.ok(alphaRegularEnd > output.regularCss.indexOf(".fui-icon-alpha.fui-icon-glyph-48"));
  const alphaFilledEnd = output.filledCss.indexOf(".fui-icon.fui-icon-zeta.fui-icon-filled {");
  assert.ok(
    alphaFilledEnd > output.filledCss.indexOf(".fui-icon-alpha.fui-icon-filled.fui-icon-glyph-48")
  );
  assert.doesNotMatch(output.regularCss, /\.(?:alpha|zeta)-[0-9]+-regular\b/);
  assert.doesNotMatch(output.filledCss, /\.(?:alpha|zeta)-[0-9]+-filled\b/);
});

test("uses the nearest regular size for the base rule and chooses the smaller size on ties", (t) => {
  const output = runConverter(
    t,
    {
      ic_fluent_nearest_16_regular: 0xe016,
      ic_fluent_nearest_20_regular: 0xe020,
      ic_fluent_nearest_48_regular: 0xe048,
      ic_fluent_tie_20_regular: 0xe120,
      ic_fluent_tie_28_regular: 0xe128,
    },
    {}
  );

  assert.equal(output.result.status, 0, output.result.stderr);
  assert.match(output.regularCss, /\.fui-icon\.fui-icon-nearest \{\s*content: "\\e020";/);
  assert.match(output.regularCss, /\.fui-icon\.fui-icon-tie \{\s*content: "\\e120";/);
});

test("keeps filled-only icons buildable and skips unsupported codepoints", (t) => {
  const output = runConverter(
    t,
    {
      ic_fluent_filled_only_24_regular: 0x10000,
      ic_fluent_regular_24_regular: 0xe024,
    },
    {
      ic_fluent_filled_only_24_filled: 0xe124,
      ic_fluent_regular_24_filled: 0xe125,
    }
  );

  assert.equal(output.result.status, 0, output.result.stderr);
  assert.match(output.result.stderr, /Ignored filled-only-24-regular because its codepoint/);
  assert.doesNotMatch(output.regularCss, /\.fui-icon\.fui-icon-filled-only \{/);
  assert.match(
    output.filledCss,
    /\.fui-icon\.fui-icon-filled-only\.fui-icon-filled \{\s*content: "\\e124";/
  );
  assert.match(output.regularCss, /\.fui-icon\.fui-icon-regular \{\s*content: "\\e024";/);
});

test("rejects glyph names that collide with modifier classes", (t) => {
  for (const name of ["filled", "glyph-20"]) {
    const inputName = name.replace(/-/g, "_");
    const output = runConverter(t, { [`ic_fluent_${inputName}_24_regular`]: 0xe001 }, {});

    assert.notEqual(output.result.status, 0, `expected ${name} to be reserved`);
    assert.match(output.result.stderr, new RegExp(`reserved.*${name}|${name}.*reserved`, "i"));
  }
});

test("emits CSS deterministically regardless of font JSON property order", (t) => {
  const regularEntries = [
    ["ic_fluent_checkmark_24_regular", 0xe001],
    ["ic_fluent_checkmark_48_regular", 0xe002],
  ];
  const filledEntries = [
    ["ic_fluent_checkmark_24_filled", 0xe101],
    ["ic_fluent_checkmark_48_filled", 0xe102],
  ];
  const first = runConverter(
    t,
    Object.fromEntries(regularEntries),
    Object.fromEntries(filledEntries)
  );
  const second = runConverter(
    t,
    Object.fromEntries(regularEntries.toReversed()),
    Object.fromEntries(filledEntries.toReversed())
  );

  assert.equal(first.result.status, 0, first.result.stderr);
  assert.equal(second.result.status, 0, second.result.stderr);
  assert.equal(first.regularCss, second.regularCss);
  assert.equal(first.filledCss, second.filledCss);
});
