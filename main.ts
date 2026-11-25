// Angry Judge: The Short Rant Contest — make.fun program/v1 entry.
// Writes one short, funny rant (1-400 chars) to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt) and validates the gate before exiting.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const RANT =
  "My office printer has one job and it refuses to do it. It prints forty pages of a report nobody asked for, then jams on the one page I actually need, flashes 'PC LOAD LETTER' like that is a sentence, and runs out of toner mid-signature, so the boss gets a contract signed by a ghost. It does not print documents. It prints disappointment, one paper jam at a time.";

export const MAX_CHARS = 400;

export function validate(text: string): string[] {
  const problems: string[] = [];
  if (text.length < 1) problems.push("entry is empty");
  if (text.length > MAX_CHARS)
    problems.push(`entry is ${text.length} chars, over the 400-char cap`);
  if (text.trim().length === 0) problems.push("entry is only whitespace");
  return problems;
}

function main(): void {
  const problems = validate(RANT);
  if (problems.length > 0) {
    for (const p of problems) console.error(`invalid entry: ${p}`);
    process.exit(1);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, RANT, "utf8");
  console.log(`wrote ${RANT.length}-char rant to ${outPath}`);
}

main();
