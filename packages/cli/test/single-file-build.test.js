import assert from "assert";
import fs from "fs-extra";
import path from "path";
import compile from "../lib/compiler/index.js";
import { fixturesDir, withCwd, cleanGenerated } from "./helpers.js";

describe("compile (build) — single file", () => {
  const fixtureDir = path.join(fixturesDir, "css-loader-tailwind");
  const appDir = path.join(fixtureDir, "app");

  beforeEach(function () {
    cleanGenerated(fixtureDir, "app");
  });

  it("compiles the target CSS file without generating project main files", async function () {
    await withCwd(fixtureDir, () => compile("app/global.css", { skipXMake: true }));

    assert.ok(fs.existsSync(path.join(appDir, "global.css.h")));
    assert.ok(!fs.existsSync(path.join(appDir, "layout.c")));
    assert.ok(!fs.existsSync(path.join(appDir, "page.c")));
    assert.ok(!fs.existsSync(path.join(appDir, "main.c")));
    assert.ok(!fs.existsSync(path.join(appDir, "main.h")));
  });

  it("does not update existing project main files", async function () {
    const mainSource = path.join(appDir, "main.c");
    const mainHeader = path.join(appDir, "main.h");
    fs.writeFileSync(mainSource, "custom main source\n");
    fs.writeFileSync(mainHeader, "custom main header\n");

    await withCwd(fixtureDir, () => compile("app/global.css", { skipXMake: true }));

    assert.equal(fs.readFileSync(mainSource, "utf-8"), "custom main source\n");
    assert.equal(fs.readFileSync(mainHeader, "utf-8"), "custom main header\n");
  });
});
