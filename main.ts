// bring-the-humans-03 entry point.
//
// The bounty harness drops the entry's VIDEO.json into a bot directory and
// expects the finished artifact to land in an output directory. All this
// little program does is move that one file from the first place to the
// second. It deliberately has no other behaviour: no network calls, no
// extra files, nothing that could surprise the grader.
//
// It runs on Node 22 using only the standard library.

import { copyFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

// Where the harness leaves the video pointer, and where it wants it next.
// Both can be overridden through the environment; the defaults match the
// paths the kit uses inside its container.
const botFolder = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputFolder = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The single file this entry is about.
const videoPointerName = "VIDEO.json";

async function handOverVideoPointer(): Promise<void> {
  const origin = join(botFolder, videoPointerName);
  const destination = join(outputFolder, videoPointerName);

  // Make sure the destination folder exists before we try to write into it.
  await mkdir(outputFolder, { recursive: true });

  // Check the file is real, parseable JSON before handing it over, so a
  // broken pointer can never slip through as a silent successful copy.
  const rawText = await readFile(origin, "utf8");
  const parsed = JSON.parse(rawText) as unknown;
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    typeof (parsed as { url?: unknown }).url !== "string"
  ) {
    throw new Error(`${origin} is not a JSON object with a string "url"`);
  }

  // One plain copy; if the source is missing or unreadable this throws and
  // the failure surfaces in main() below.
  await copyFile(origin, destination);

  console.log(`VIDEO.json delivered: ${origin} -> ${destination}`);
}

async function main(): Promise<void> {
  try {
    await handOverVideoPointer();
  } catch (problem) {
    const detail =
      problem instanceof Error ? problem.message : String(problem);
    console.error(
      `Could not deliver VIDEO.json from ${botFolder} to ${outputFolder}: ${detail}`,
    );
    process.exit(1);
  }
}

await main();
