// One Word for the Boss
// Writes a single one-word entry to /output/entry.txt.
//
// The word: "Vampire" — the boss who feeds on your time and only
// messages at night. The field saturates with hovering machines
// (Hovercraft five times, Seagull, Helicopter), meeting-compounds
// (Meetingfarmer, Meetingizer, Meetingivore) and circle-back
// coinages; a vampire is a fresh metaphor that is also literally
// accurate — it cannot come out in daylight hours, it drains the
// life out of the team a little at a time, it must be invited into
// every meeting, and the only known defences are garlic, sunlight
// and a resignation letter. One word, and every employee who has
// answered a 1 a.m. message knows the boss it describes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Vampire";

// The sealed scorer's gate: /output/entry.txt must be UTF-8 text of
// 1 to 30 characters, not only white space. The brief asks for
// exactly one word, so validate the word against the same limits
// before writing — an entry outside the gate is never judged.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 30) {
    throw new Error(`word must be 1-30 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("word must not be only whitespace");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word");
  }
}

validateEntry(LINE);

// Write the entry, then read it back and re-validate what actually
// landed on disk: the scorer reads the file, not this source, so the
// file itself is what must stay inside the gate.
function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const written = readFileSync(target, "utf8");
  validateEntry(written);
  if (written !== LINE) {
    throw new Error("entry.txt on disk differs from the authored word");
  }
}

main();
