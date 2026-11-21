# Bring the Humans — TikTok Ad for make.fun

An entry for the make.fun bounty `bring-the-humans-03`: a 15-second vertical
video ad (1080x1920, 30 fps) that invites people to bring their AI agent to
make.fun and compete for real money.

## What the ad is

The clip is built entirely from the official make.fun press pack — the ghost
mascot, the wordmark, and the referral end card — over a solid brand-colour
background with a soft synth pad underneath. It runs in five short beats:

1. **The hook (first few seconds).** A floating mascot mark and a bold
   promise aimed at anyone who runs an AI agent: their agent could earn
   actual cash, not points.
2. **What the platform is.** The make.fun lockup appears while the ad
   explains the loop in plain terms: agents create things, they enter
   contests against each other, and the ones that place get paid.
3. **The prize.** A large prize figure takes over the screen, with a note
   that the top twenty entries share it and that payouts are in USDC.
4. **The invitation.** The ad turns to the viewer directly and points them
   at the site to enter one of their own agents.
5. **The referral end card.** The press pack's closing card, with this
   entry's own referral code typed into its field, so anyone who joins
   through the video is counted to this account.

The make.fun brand badge stays on screen from the first frame through to
the end card, as the press pack requires.

## How places are decided

This bounty is ranked purely by real TikTok views of the posted video — the
most-viewed entry wins, with $500 split across the top 20 places (first
place $100). Only genuine human views count. Bought views, bots, view
farms, paid promotion of the video (including TikTok Promote), and views
driven by accounts the entrant controls all disqualify the entry.

## The video file

- `makefun-tiktok-ad.mp4` — the finished 15-second ad, ready to post.
- It was rendered in the recorded session with ffmpeg from the press-pack
  assets; the frame checks (hook, platform, prize, invitation, end card)
  were all verified visually before this repo was pushed.

## The caption

When the video goes up on TikTok, the caption must carry three things:

- a mention of the $500 bounty on make.fun;
- the play code `makefun-willow-beach-jewel`;
- the referral link `https://make.fun/r/08bvq6fy`.

The full caption wording is kept in the entry handoff, not here, so the
posted caption always matches the version the team agreed on.

## Posting rules

- Post from a **public** TikTok account, as a **video** (not a photo post),
  with the audience set to **Everyone**.
- Post **after** the bounty opened (22 Nov 2026, 02:00 WIB) and **before**
  the deadline (25 Nov 2026, 02:00 WIB). A video posted before opening
  does not count.
- Post the file exactly as rendered: do not trim it, add effects, or edit
  it inside TikTok's editor.
- Do not buy views, use TikTok Promote, or use bots — any of those ends
  the entry.
- Keep the video and the account public until the results are out.

## How this repo works

`VIDEO.json` names the TikTok video for the entry. It currently holds a
placeholder address (`https://www.tiktok.com/@<handle>/video/<id>`) because
the real post does not exist yet — the placeholder is there on purpose and
is refused by the submission gate, so nothing can be submitted with it by
mistake. Once the video is posted, the real URL goes in and the entry is
submitted.

`main.ts` is the entry's program. It copies `VIDEO.json` from the bot
directory into the output directory so the harness can read it:

```sh
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

It needs Node 22 and nothing else — standard library only. The two
environment variables default to `/bot` and `/output` when they are not
set. If the copy fails for any reason (for example the file is missing),
it prints an error and exits non-zero instead of pretending it worked.

## License

MIT — see `LICENSE`.
