import postcss from "postcss";

function getUtf8SafeCut(bytes: Buffer, target: number, start: number): number {
  let cut = target;

  while (cut > start && cut < bytes.length && (bytes[cut] & 0xc0) === 0x80) {
    cut--;
  }
  return cut;
}

function appendRangeChunks(
  bytes: Buffer,
  start: number,
  end: number,
  readableBoundaries: number[],
  maxBytes: number,
  backtrackBytes: number,
  chunks: string[]
): void {
  let boundaryIndex = 0;
  while (start < end) {
    if (end - start <= maxBytes) {
      chunks.push(bytes.subarray(start, end).toString("utf8"));
      return;
    }
    const target = start + maxBytes;
    while (readableBoundaries[boundaryIndex] <= start) {
      boundaryIndex++;
    }

    let candidate = -1;
    let candidateIndex = boundaryIndex;
    while (
      candidateIndex < readableBoundaries.length &&
      readableBoundaries[candidateIndex] <= target &&
      readableBoundaries[candidateIndex] <= end
    ) {
      candidate = readableBoundaries[candidateIndex];
      candidateIndex++;
    }

    let next: number;
    if (candidate >= target - backtrackBytes) {
      next = candidate;
      boundaryIndex = candidateIndex;
    } else {
      next = getUtf8SafeCut(bytes, target, start);
    }
    chunks.push(bytes.subarray(start, next).toString("utf8"));
    start = next;
  }
}

export function splitCssIntoChunks(
  css: string,
  maxBytes = 4000,
  backtrackBytes = 200
): { chunks: string[]; lengths: number[]; totalLength: number } {
  if (!css) {
    return { chunks: [""], lengths: [0], totalLength: 0 };
  }
  const bytes = Buffer.from(css, "utf8");
  const root = postcss.parse(css);
  const rootCss = root.toString();
  const rootBytes = Buffer.from(rootCss, "utf8");
  const rootOffset = bytes.length - rootBytes.length;
  if (rootOffset < 0 || !bytes.subarray(rootOffset).equals(rootBytes)) {
    throw new Error("Final PostCSS CSS does not preserve root serialization as a suffix");
  }

  const readableBoundaries: number[] = [];
  let serializedBytes = 0;
  root.toString((node, builder) => {
    postcss.stringify(node, (part, emittedNode, type) => {
      builder(part);
      serializedBytes += Buffer.byteLength(part, "utf8");
      if (
        emittedNode?.parent === root &&
        (type === "end" || (type === undefined && !("nodes" in emittedNode)))
      ) {
        readableBoundaries.push(rootOffset + serializedBytes);
      }
    });
  });
  if (serializedBytes !== rootBytes.length) {
    throw new Error("PostCSS stringifier byte count does not match root serialization");
  }
  if (readableBoundaries.at(-1) !== bytes.length) {
    readableBoundaries.push(bytes.length);
  }

  const chunks: string[] = [];
  let lineStart = 0;
  for (let i = 0; i < bytes.length; ++i) {
    if (bytes[i] === 0x0a) {
      appendRangeChunks(
        bytes,
        lineStart,
        i + 1,
        readableBoundaries,
        maxBytes,
        backtrackBytes,
        chunks
      );
      lineStart = i + 1;
    }
  }
  appendRangeChunks(
    bytes,
    lineStart,
    bytes.length,
    readableBoundaries,
    maxBytes,
    backtrackBytes,
    chunks
  );
  const lengths = chunks.map((chunk) => Buffer.byteLength(chunk, "utf8"));
  return {
    chunks,
    lengths,
    totalLength: lengths.reduce((total, length) => total + length, 0),
  };
}
