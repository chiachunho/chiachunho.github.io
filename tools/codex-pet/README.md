# Momo the Tapir — a Codex Pet

A custom [Codex Pet](https://github.com/openai/skills/tree/main/skills/.curated/hatch-pet):
a chunky little Malayan tapir that idles, walks, waves, jumps, sulks, naps, and
types on a tiny `>_` laptop while Codex works.

Built output lives in [`public/codex-pet/momo-tapir/`](../../public/codex-pet/momo-tapir):

| file               | what it is                                                |
| ------------------ | --------------------------------------------------------- |
| `pet.json`         | Codex Pet manifest                                        |
| `spritesheet.webp` | 1536x1872 atlas, lossless, transparent — what Codex reads |
| `spritesheet.png`  | same atlas as PNG, for editing                            |
| `preview.gif`      | every animation row played in order                       |

## Install

```bash
mkdir -p "${CODEX_HOME:-$HOME/.codex}/pets/momo-tapir"
cp public/codex-pet/momo-tapir/pet.json \
   public/codex-pet/momo-tapir/spritesheet.webp \
   "${CODEX_HOME:-$HOME/.codex}/pets/momo-tapir/"
```

Then restart Codex — Momo shows up next to the built-in pets.

`python3 tools/codex-pet/build_pet.py --install` does the same thing after a rebuild.

## Rebuild

```bash
pip install pillow
python3 tools/codex-pet/build_pet.py            # -> public/codex-pet/momo-tapir/
python3 tools/codex-pet/build_pet.py --install  # ... and install it locally
```

- `pet_art.py` draws the character: every pose is composed from ellipses and
  rounded rects on a 96x104 grid with hard, aliased edges, given a 2px terminal
  outline by dilating the silhouette, then nearest-neighbour upscaled 2x into the
  192x208 cell. That is what keeps the stepped pixel edges.
- `build_pet.py` assembles the 9 animation rows and writes the atlas, the
  manifest and the preview GIF.

Tweak the character in `pet_art.tapir()` (proportions, ear angle, saddle band,
eye shapes) or the choreography in the `row_*()` functions of `build_pet.py`.

## Atlas contract

8 columns x 9 rows of 192x208 cells, 1536x1872 total, transparent background.
Trailing cells of each row are fully transparent.

| row | state         | frames | what Momo does                        |
| --- | ------------- | ------ | ------------------------------------- |
| 0   | idle          | 6      | breathes, blinks                      |
| 1   | running-right | 8      | walk cycle, mirrored                  |
| 2   | running-left  | 8      | walk cycle                            |
| 3   | waving        | 4      | raises a front paw, blushes           |
| 4   | jumping       | 5      | squat, launch, peak, fall, land       |
| 5   | failed        | 8      | deflates, ears droop                  |
| 6   | waiting       | 6      | curls into a loaf and sleeps (`zzz`)  |
| 7   | running       | 6      | types on the laptop                   |
| 8   | review        | 6      | thinks over the laptop (`...`, spark) |

## Why the art is drawn instead of generated

The [`codex-pet` skill](https://claudemarketplaces.com/skills/agentspace-so/runcomfy-agent-skills/codex-pet)
this follows generates the canonical pose with one GPT Image 2 call through the
RunComfy CLI (`RUNCOMFY_TOKEN` + `magick`), then assembles the rows with
ImageMagick micro-transforms. The skill's atlas contract, row order, frame
counts and cell size are used verbatim here; the image-generation step is
replaced by drawing the poses directly, and the assembly is done with Pillow
instead of ImageMagick. The upside is that every row is a real pose rather than
a 1-2px nudge of a single canonical frame, and rebuilding is deterministic and
offline.

## Character note

Momo is an original character. Malayan tapirs — black with a pale saddle band —
are the shared real-world reference for a lot of tapir mascots; nothing here is
traced or copied from any existing one.
