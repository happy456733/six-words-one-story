// Six Words, One Story — make.fun entry
// Writes one complete six-word story to entry.txt.
// Deterministic, stdlib only, no network, no files outside this repo.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The story: a whole life in six words. She waited a lifetime
// for someone at a station — and spent it at the wrong one.
const STORY = "She waited fifty years. Wrong station.";

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function main(): void {
  if (countWords(STORY) !== 6) {
    throw new Error(`expected exactly six words, got ${countWords(STORY)}`);
  }
  const chars = [...STORY].length;
  if (chars < 1 || chars > 60) {
    throw new Error(`expected 1-60 characters, got ${chars}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, STORY + "\n", "utf8");
  // Read back what was written: the file must hold exactly the story.
  const written = readFileSync(outPath, "utf8");
  if (written.trim() !== STORY) {
    throw new Error("entry.txt does not hold the story");
  }
}

main();
