import assert from "assert";
import fs from "fs-extra";
import os from "os";
import path from "path";
import { runXMake } from "../lib/app-plugin/xmake.js";

describe("xmake plugin", () => {
  it("explains xmake was skipped because --skip-xmake was specified", () => {
    const rootContext = fs.mkdtempSync(path.join(os.tmpdir(), "lcui-cli-xmake-"));
    const messages = [];
    fs.writeFileSync(path.join(rootContext, "xmake.lua"), "");

    try {
      runXMake({
        logger: { info: (message) => messages.push(message) },
        options: { rootContext, skipXMake: true },
        changedOutputs: new Set(),
      });

      assert.deepStrictEqual(messages, ["Skipped xmake because --skip-xmake was specified."]);
    } finally {
      fs.removeSync(rootContext);
    }
  });

  it("does not run xmake for a single-file compilation", () => {
    const rootContext = fs.mkdtempSync(path.join(os.tmpdir(), "lcui-cli-xmake-"));
    const messages = [];
    fs.writeFileSync(path.join(rootContext, "xmake.lua"), "");

    try {
      runXMake({
        logger: { info: (message) => messages.push(message) },
        options: { rootContext, isFullBuild: false },
        changedOutputs: new Set([path.join(rootContext, "app", "global.css.h")]),
      });

      assert.deepStrictEqual(messages, ["Skip xmake for single-file compilation."]);
    } finally {
      fs.removeSync(rootContext);
    }
  });
});
