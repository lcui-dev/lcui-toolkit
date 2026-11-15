import fs from "fs";
import path from "path";

const fonts = [
  {
    selector: ".fui-icon.fui-icon-filled",
    name: "FluentSystemIcons-Filled",
    outputName: "icons-filled",
    style: "filled",
  },
  {
    selector: ".fui-icon",
    name: "FluentSystemIcons-Regular",
    outputName: "icons",
    style: "regular",
  },
];

const iconFileMain = `
/** Glyph codepoints keyed by design size for each style. */
export interface IconData {
  readonly regular: Readonly<Record<number, number>>;
  readonly filled: Readonly<Record<number, number>>;
}

export type IconName = keyof typeof iconMap;

interface IconComponent {
  (props: IconProps): React.JSX.Element;
  shouldPreRender: boolean;
}

interface IconProps extends WidgetProps {
  className?: string;
  size?: number;
  fontSize?: number;
  style?: React.CSSProperties;
}

interface IconExProps extends IconProps {
  name: IconName;
  filled?: boolean;
}

function clsx(...args: Array<string | undefined>) {
  return args.filter(Boolean).join(' ');
}

export function Icon({ className, name, filled, size, fontSize, style, ...props }: IconExProps) {
  const iconData = iconMap[name];
  const error = <text>unknown icon: {name}</text>;

  if (!iconData) {
    return error;
  }

  const styleName = filled ? 'filled' : 'regular';
  const codeMap = iconData[styleName];
  const availableSizes = Object.keys(codeMap).map(Number).sort((a, b) => a - b);
  if (availableSizes.length === 0) {
    throw new Error('Icon "' + name + '" has no ' + styleName + ' glyph available');
  }

  const requestedSize = typeof size === 'number' ? size : 24;
  if (filled && requestedSize === 24 && !codeMap[24]) {
    throw new Error('Icon "' + name + '" has no filled 24px glyph available');
  }
  let glyphSizeClass: string | undefined;
  if (requestedSize !== 24) {
    if (codeMap[requestedSize]) {
      glyphSizeClass = 'fui-icon-glyph-' + requestedSize;
    } else {
      console.warn(
        'Icon "' + name + '" has no ' + styleName + ' ' + requestedSize +
        'px glyph; using its base glyph'
      );
    }
  }
  const visualSize = glyphSizeClass ? requestedSize : 24;
  const renderedFontSize =
    typeof fontSize === 'number'
      ? fontSize
      : typeof size === 'number'
        ? visualSize
        : undefined;
  return (
    <text
      className={clsx(
        'fui-icon',
        'fui-icon-' + name,
        filled ? 'fui-icon-filled' : undefined,
        glyphSizeClass,
        className
      )}
      style={{
        ...(typeof renderedFontSize === 'number'
          ? { fontSize: renderedFontSize + 'px' }
          : {}),
        ...style
      }}
      {...props}
    />
  );
}

Icon.shouldPreRender = true;`;

function generateIconCode(ident, name, filled = false) {
  return `
export const ${ident}: IconComponent = (props) => <Icon name="${name}" ${
    filled ? "filled " : ""
  }{...props} />;
${ident}.shouldPreRender = true;`;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function outputFile(filePath, content) {
  console.log(`output ${filePath}`);
  fs.writeFileSync(filePath, content, {
    encoding: "utf-8",
  });
}

function getSortedSizes(codeMap) {
  return Object.keys(codeMap)
    .map(Number)
    .sort((a, b) => a - b);
}

function getDefaultRegularSize(codeMap) {
  const sizes = getSortedSizes(codeMap);
  if (sizes.includes(24)) {
    return 24;
  }
  if (sizes.length === 0) {
    return null;
  }
  return sizes.reduce((best, size) => {
    const distance = Math.abs(size - 24);
    const bestDistance = Math.abs(best - 24);
    return distance < bestDistance || (distance === bestDistance && size < best) ? size : best;
  });
}

function generateRule(selector, code) {
  return `.${selector} {\n  content: "\\${code.toString(16)}";\n}`;
}

function generateSemanticRules(name, icon, style) {
  const rules = [];
  const selector = `fui-icon.fui-icon-${name}`;
  const regularSizes = getSortedSizes(icon.regular);
  const filledSizes = getSortedSizes(icon.filled);

  if (style === "regular") {
    const defaultSize = getDefaultRegularSize(icon.regular);
    if (defaultSize !== null) {
      rules.push(generateRule(selector, icon.regular[defaultSize]));
    }
    regularSizes
      .filter((size) => size !== 24)
      .forEach((size) =>
        rules.push(generateRule(`${selector}.fui-icon-glyph-${size}`, icon.regular[size]))
      );
    return rules;
  }

  if (icon.filled[24] !== undefined) {
    rules.push(generateRule(`${selector}.fui-icon-filled`, icon.filled[24]));
  }
  filledSizes
    .filter((size) => size !== 24)
    .forEach((size) =>
      rules.push(
        generateRule(`${selector}.fui-icon-filled.fui-icon-glyph-${size}`, icon.filled[size])
      )
    );
  return rules;
}

function generateStyleRules(iconMap, style) {
  return Object.keys(iconMap)
    .sort()
    .map((name) => {
      const icon = iconMap[name];
      const semanticRules = generateSemanticRules(name, icon, style);
      return semanticRules.length > 0 ? [`/* ${name} */`, ...semanticRules].join("\n") : "";
    })
    .filter(Boolean)
    .join("\n\n");
}

function createIconMap(fontData) {
  const iconMap = {};
  fontData.forEach(({ jsonData }) => {
    Object.keys(jsonData)
      .sort()
      .forEach((key) => {
        const match = key.match(/^ic_fluent_(.+)_(\d+)_(regular|filled)$/);
        if (!match) {
          throw new Error(`Unexpected Fluent icon key: ${key}`);
        }
        const code = jsonData[key];
        const name = match[1].replace(/_/g, "-");
        if (name === "filled" || /^glyph-\d+$/.test(name)) {
          throw new Error(
            `Icon name "${name}" is reserved because it conflicts with a modifier class`
          );
        }
        const size = Number(match[2]);
        const style = match[3];

        // wchar_t type occupies 2 bytes on supported targets.
        if (code > 0xffff) {
          console.warn(
            `Ignored ${name}-${size}-${style} because its codepoint ${code} has exceeded the maximum value of wchar_t type`
          );
          return;
        }
        if (!iconMap[name]) {
          iconMap[name] = {
            regular: {},
            filled: {},
          };
        }
        iconMap[name][style][size] = code;
      });
  });
  return iconMap;
}

function convert(fontsDirPath) {
  const iconTsxOutput = ['import React, { WidgetProps } from "@lcui/react";'];
  const fontData = fonts.map((font) => {
    const jsonFile = path.join(fontsDirPath, `${font.name}.json`);
    const jsonData = JSON.parse(fs.readFileSync(jsonFile, { encoding: "utf-8" }));
    const mainCss = [
      "@font-face {",
      `  font-family: "${font.name}";`,
      `  src: url("${font.outputName}.ttf");`,
      "}\n",
      `${font.selector} {`,
      `  font-family: "${font.name}";`,
      "  font-style: normal;",
      // Icon fonts expose hhea ascender=1em/descender=0, so glyph ink sits
      // above the font-box center and renders ~0.5-1.5px high in centered
      // lines; nudge down 1px like Bootstrap's `.glyphicon { top: 1px }`.
      "  position: relative;",
      "  top: 1px;",
      "}\n",
    ].join("\n");
    return { font, jsonData, mainCss };
  });

  const iconMap = createIconMap(fontData);
  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
  }
  if (!fs.existsSync("src")) {
    fs.mkdirSync("src");
  }
  [
    "style.css",
    "FluentSystemIcons-Regular.css",
    "FluentSystemIcons-Filled.css",
    "FluentSystemIcons-Regular.ttf",
    "FluentSystemIcons-Filled.ttf",
  ].forEach((name) => {
    const staleOutputPath = path.join("dist", name);
    if (fs.existsSync(staleOutputPath)) {
      fs.unlinkSync(staleOutputPath);
    }
  });

  fontData.forEach(({ font, mainCss }) => {
    const outputName = font.outputName;
    const fullCss = [mainCss, generateStyleRules(iconMap, font.style)].join("\n");
    outputFile(path.join("dist", `${outputName}.css`), `${fullCss}\n`);
    console.log(`output ${path.join("dist", `${outputName}.ttf`)}`);
    fs.copyFileSync(
      path.join(fontsDirPath, `${font.name}.ttf`),
      path.join("dist", `${outputName}.ttf`)
    );
  });

  iconTsxOutput.push(
    `\nexport const iconMap = ${JSON.stringify(iconMap, null, 2)} as const satisfies Readonly<Record<string, IconData>>;`,
    iconFileMain
  );
  Object.keys(iconMap)
    .sort()
    .forEach((key) => {
      const ident = key.split("-").map(capitalizeFirstLetter).join("");
      if (Object.keys(iconMap[key].regular).length > 0) {
        iconTsxOutput.push(generateIconCode(ident, key));
      }
      if (Object.keys(iconMap[key].filled).length > 0) {
        iconTsxOutput.push(generateIconCode(`${ident}Filled`, key, true));
      }
    });
  outputFile(path.join("src", "index.tsx"), iconTsxOutput.join("\n"));
}

if (process.argv.length > 2) {
  convert(process.argv[2]);
}
