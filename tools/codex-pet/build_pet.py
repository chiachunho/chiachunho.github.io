#!/usr/bin/env python3
"""Build the "Momo the Tapir" Codex Pet atlas + manifest.

Follows the Codex Pet atlas contract used by OpenAI's `hatch-pet` skill and
the RunComfy `codex-pet` skill: a 1536x1872 sprite atlas, 8 columns x 9 rows
of 192x208 transparent cells, one row per animation state.

    row 0  idle           6 frames
    row 1  running-right  8 frames
    row 2  running-left   8 frames
    row 3  waving         4 frames
    row 4  jumping        5 frames
    row 5  failed         8 frames
    row 6  waiting        6 frames
    row 7  running        6 frames  (active work loop)
    row 8  review         6 frames

Trailing cells in each row stay fully transparent.

Usage:
    python3 tools/codex-pet/build_pet.py [--out DIR] [--install]
"""

import argparse
import json
import math
import os
import shutil

from PIL import Image

import pet_art as A

PET_ID = 'momo-tapir'
PET_NAME = 'Momo the Tapir'
PET_DESC = 'A round little tapir who naps through your builds and types along with you.'

COLS, ROWS = 8, 9
ZZZ = (96, 124, 226, 255)
DOT = (150, 154, 168, 255)
CASE = (108, 110, 122, 255)
SCREEN_DARK = (46, 48, 56, 255)


def cell(extras=(), **kw):
    sil, cream, marks = A.tapir(**kw)
    return A.to_cell(A.compose(sil, cream, marks, extras))


def laptop(paw=0, dy=0):
    case, screen, glyph, paws = A.laptop_layers(dx=1, dy=dy, paw=paw)
    return [
        (case, CASE, True),
        (screen, SCREEN_DARK, False),
        (glyph, A.SCREEN_LIT, False),
        (paws, A.BLACK, False),
    ]


# ── rows ────────────────────────────────────────────────────────────────
def row_idle():
    return [
        cell(),
        cell(dy=-1),
        cell(dy=-1, eyes='blink'),
        cell(),
        cell(dy=-1),
        cell(eyes='blink'),
    ]


def row_walk():
    """8-frame walk cycle, drawn facing left (the pet's default facing)."""
    frames = []
    for i in range(8):
        a = round(4 * math.sin(2 * math.pi * i / 8))
        lift_f = -2 if a > 1 else 0
        lift_b = -2 if a < -1 else 0
        frames.append(
            cell(
                dy=-1 if i % 4 < 2 else 0,
                legs=(a, -a, a, -a),
                leg_lift=(lift_f, lift_b, lift_f, lift_b),
                head_dy=-1 if i % 4 < 2 else 0,
            )
        )
    return frames


def row_wave():
    return [
        cell(wave=0, eyes='happy'),
        cell(wave=-3, eyes='happy', blush=True, dy=-1),
        cell(wave=0, eyes='happy'),
        cell(wave=-3, eyes='happy', blush=True, dy=-1),
    ]


def row_jump():
    return [
        cell(dy=3, squash=0.35, eyes='happy'),
        cell(dy=-5, eyes='happy', leg_lift=(-2, -2, -2, -2)),
        cell(dy=-13, eyes='happy', leg_lift=(-5, -5, -5, -5), ear_angle=44),
        cell(dy=-5, eyes='open', leg_lift=(-2, -2, -2, -2)),
        cell(dy=3, squash=0.3, eyes='open'),
    ]


def row_failed():
    squash = (0.15, 0.45, 0.75, 1.0, 1.0, 0.95, 1.0, 1.0)
    frames = []
    for i, sq in enumerate(squash):
        frames.append(
            cell(
                squash=sq,
                eyes='sad',
                ear_angle=int(30 - 24 * sq),
                head_dy=1 if i >= 4 and i % 2 else 0,
            )
        )
    return frames


def row_waiting():
    frames = []
    for i in range(6):
        extras = [(A.zzz_layer(step=i % 3), ZZZ, False)]
        frames.append(cell(extras, lying=True, eyes='closed', dy=-1 if i % 2 else 0))
    return frames


def row_working():
    frames = []
    for i in range(6):
        paw = (0, 3, 0, 3, 0, 3)[i]
        frames.append(
            cell(laptop(paw=paw), dy=-1 if i % 2 else 0, eyes='open' if i != 4 else 'blink')
        )
    return frames


def row_review():
    frames = []
    for i in range(6):
        n = (1, 2, 3, 3, 2, 1)[i]
        extras = laptop(paw=0) + [(A.dots_layer(n=n), DOT, False)]
        if i == 3:
            extras.append((A.spark_layer(), A.ACCENT, False))
        frames.append(
            cell(extras, head_dx=(-1 if i % 2 else 1), head_dy=-1 if i % 2 else 0, eyes='open')
        )
    return frames


ROW_BUILDERS = [
    ('idle', row_idle),
    ('running-right', lambda: [f.transpose(Image.FLIP_LEFT_RIGHT) for f in row_walk()]),
    ('running-left', row_walk),
    ('waving', row_wave),
    ('jumping', row_jump),
    ('failed', row_failed),
    ('waiting', row_waiting),
    ('running', row_working),
    ('review', row_review),
]

EXPECTED_FRAMES = [6, 8, 8, 4, 5, 8, 6, 6, 6]

# ms per frame and how many loops of each row the preview GIF plays
PREVIEW_TIMING = [(160, 2), (90, 2), (90, 2), (180, 2), (110, 2),
                  (140, 1), (200, 1), (150, 2), (170, 2)]


def build_atlas():
    atlas = Image.new('RGBA', (COLS * A.CELL_W, ROWS * A.CELL_H), (0, 0, 0, 0))
    for r, (name, builder) in enumerate(ROW_BUILDERS):
        frames = builder()
        assert len(frames) == EXPECTED_FRAMES[r], f'{name}: {len(frames)} frames'
        for c, frame in enumerate(frames):
            atlas.alpha_composite(frame, (c * A.CELL_W, r * A.CELL_H))
    return atlas


def build_preview(atlas, bg=(255, 255, 255)):
    """A single looping GIF that plays every row in order."""
    frames, durations = [], []
    for r, (_name, _b) in enumerate(ROW_BUILDERS):
        ms, loops = PREVIEW_TIMING[r]
        for _ in range(loops):
            for c in range(EXPECTED_FRAMES[r]):
                cellimg = atlas.crop((c * A.CELL_W, r * A.CELL_H,
                                      (c + 1) * A.CELL_W, (r + 1) * A.CELL_H))
                flat = Image.new('RGB', cellimg.size, bg)
                flat.paste(cellimg, (0, 0), cellimg)
                frames.append(flat.convert('P', palette=Image.ADAPTIVE, colors=64))
                durations.append(ms)
    return frames, durations


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default='public/codex-pet/' + PET_ID)
    ap.add_argument('--install', action='store_true',
                    help='also copy into ${CODEX_HOME:-$HOME/.codex}/pets/<id>/')
    args = ap.parse_args()

    out = os.path.abspath(args.out)
    os.makedirs(out, exist_ok=True)

    atlas = build_atlas()
    assert atlas.size == (1536, 1872), atlas.size
    atlas.save(os.path.join(out, 'spritesheet.png'))
    atlas.save(os.path.join(out, 'spritesheet.webp'), 'WEBP',
               lossless=True, quality=100, method=6)

    manifest = {
        'id': PET_ID,
        'displayName': PET_NAME,
        'description': PET_DESC,
        'spritesheetPath': 'spritesheet.webp',
    }
    with open(os.path.join(out, 'pet.json'), 'w') as fh:
        json.dump(manifest, fh, indent=2)
        fh.write('\n')

    frames, durations = build_preview(atlas)
    frames[0].save(os.path.join(out, 'preview.gif'), save_all=True,
                   append_images=frames[1:], duration=durations, loop=0, optimize=True)

    print(f'atlas   {atlas.size[0]}x{atlas.size[1]} -> {out}')
    print(f'preview {len(frames)} frames -> {os.path.join(out, "preview.gif")}')

    if args.install:
        home = os.environ.get('CODEX_HOME') or os.path.join(os.path.expanduser('~'), '.codex')
        dest = os.path.join(home, 'pets', PET_ID)
        os.makedirs(dest, exist_ok=True)
        for f in ('pet.json', 'spritesheet.webp'):
            shutil.copy2(os.path.join(out, f), os.path.join(dest, f))
        print(f'installed -> {dest}')


if __name__ == '__main__':
    main()
