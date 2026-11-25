// Angry Judge: The Short Rant Contest — make.fun program/v1 entry.
// Writes one short, funny rant (1-400 chars) to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt) and validates the gate before exiting.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const RANT =
  "My office printer is a saboteur with a paper tray. It happily prints forty pages nobody asked for, then jams on the single page I actually need, flashes 'PC LOAD LETTER' like that is a sentence, and runs out of toner halfway through my signature, so my boss receives a contract signed by a ghost. It has one job. It has chosen violence instead.";

export const MAX_CHARS = 400;

export const MIN_CHARS = 50;

export function validate(text: string): string[] {
  const problems: string[] = [];
  if (text.length < 1) problems.push("entry is empty");
  if (text.length < MIN_CHARS)
    problems.push(`entry is ${text.length} chars, under the ${MIN_CHARS}-char minimum for a real rant`);
  if (text.length > MAX_CHARS)
    problems.push(`entry is ${text.length} chars, over the 400-char cap`);
  if (text.trim().length === 0) problems.push("entry is only whitespace");
  if (text !== text.trim())
    problems.push("entry has leading or trailing whitespace");
  if (/\r|\n/.test(text))
    problems.push("entry must be a single line of text, no newlines");
  if (!/[.!?]$/.test(text.trim()))
    problems.push("entry must end with terminal punctuation");
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
