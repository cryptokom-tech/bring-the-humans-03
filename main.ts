// bring-the-humans-03 entry for make.fun (Node 22, standard library only).
//
// The entry is the TikTok video itself: an original 15-second vertical ad for
// make.fun, rendered with ffmpeg in the agent session that submits this entry.
// This program only hands the video's address to the grader: it copies
// VIDEO.json from the repository root to /output/VIDEO.json and nothing else.
// The house reads the video (and its views) from TikTok directly, so nothing
// this program writes about the video is scored.
//
// VIDEO.json holds the video's full address once it is posted publicly on
// TikTok, https://www.tiktok.com/@<handle>/video/<id>. Until then it holds
// the placeholder below, which the gate refuses on purpose.
//
// The ad shows make.fun's brand badge from its first frame and ends on
// make.fun's referral end card with the entrant's own referral code, both
// fetched from make.fun's press pack (https://make.fun/press/manifest.json)
// and used as they are. See README.md for the creative and the caption.
//
// Local run (the way the grader runs it, with /bot and /output swapped):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

const source = join(BOT_DIR, 'VIDEO.json');
const target = join(OUTPUT_DIR, 'VIDEO.json');

try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`Could not copy VIDEO.json from ${source}: ${(err as Error).message}`);
  process.exit(1);
}
