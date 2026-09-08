"""Vector-ish pixel art for the Momo the Tapir Codex Pet.

Everything is drawn on a low-resolution grid (GRID_W x GRID_H) with hard,
aliased edges and then nearest-neighbour upscaled to the 192x208 Codex Pet
cell. That keeps the chunky "pixel-art-adjacent" silhouette and the visible
stepped edges the Codex Pet house style asks for.

The character is an original chibi Malayan tapir: black body, cream saddle
band across the rump and belly, stubby legs, dot eyes, terminal outline.
"""

from PIL import Image, ImageDraw, ImageFilter

# ── cell / grid geometry ────────────────────────────────────────────────
CELL_W, CELL_H = 192, 208
SCALE = 2
GRID_W, GRID_H = CELL_W // SCALE, CELL_H // SCALE  # 96 x 104

# ── palette ─────────────────────────────────────────────────────────────
OUTLINE = (18, 18, 22, 255)
BLACK = (43, 43, 50, 255)
BLACK_HI = (58, 58, 68, 255)
CREAM = (245, 242, 233, 255)
CREAM_SH = (216, 212, 199, 255)
EYE = (240, 238, 230, 255)
SCREEN = (108, 110, 122, 255)
SCREEN_LIT = (196, 199, 208, 255)
ACCENT = (247, 181, 56, 255)  # zzz / spark / lightbulb
BLUSH = (232, 120, 128, 255)

OUTLINE_W = 2  # in grid pixels
ORIGIN_DX, ORIGIN_DY = 5, -5  # centre the figure in the cell


# ── mask helpers ────────────────────────────────────────────────────────
def _mask():
    return Image.new('L', (GRID_W, GRID_H), 0)


def _draw(mask):
    return ImageDraw.Draw(mask)


def ell(d, cx, cy, rx, ry, fill=255):
    d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=fill)


def rrect(d, x0, y0, x1, y1, r, fill=255):
    d.rounded_rectangle([x0, y0, x1, y1], radius=r, fill=fill)


def blob(cx, cy, rx, ry, angle):
    """Rotated ellipse rendered as its own grid-sized layer."""
    pad = int(max(rx, ry) * 2 + 6)
    tmp = Image.new('L', (pad * 2, pad * 2), 0)
    ImageDraw.Draw(tmp).ellipse([pad - rx, pad - ry, pad + rx, pad + ry], fill=255)
    tmp = tmp.rotate(angle, resample=Image.NEAREST, expand=False)
    layer = Image.new('L', (GRID_W, GRID_H), 0)
    layer.paste(tmp, (int(cx) - pad, int(cy) - pad), tmp)
    return layer


def stamp(mask, layer, fill=255):
    """OR a layer into mask."""
    solid = Image.new('L', mask.size, fill)
    mask.paste(solid, (0, 0), layer)


def dilate(mask, r):
    out = mask
    for _ in range(r):
        out = out.filter(ImageFilter.MaxFilter(3))
    return out


def mask_and_not(a, b):
    inv = b.point(lambda v: 255 - v)
    return Image.composite(a, Image.new('L', a.size, 0), inv)


def mask_and(a, b):
    return Image.composite(a, Image.new('L', a.size, 0), b)


# ── the tapir ───────────────────────────────────────────────────────────
def tapir(
    *,
    dx=0,
    dy=0,
    squash=0.0,          # 0 = normal, 1 = flattened / deflated
    lying=False,
    head_dx=0,
    head_dy=0,
    ear_angle=30,
    legs=(0, 0, 0, 0),   # per-leg dx, front->back
    leg_lift=(0, 0, 0, 0),
    wave=None,   # None, or the vertical offset of the raised front paw
    eyes='open',         # open | blink | happy | sad | closed
    blush=False,
):
    """Return (silhouette, cream, marks) grid masks for one pose."""
    dx += ORIGIN_DX
    dy += ORIGIN_DY
    sil = _mask()
    d = _draw(sil)

    if lying:
        bx, by, brx, bry = 52 + dx, 76 + dy, 32, 15
        hx, hy, hrx, hry = 24 + dx + head_dx, 72 + dy + head_dy, 19, 14
        sx, sy, srx, sry = 8 + dx + head_dx, 78 + dy + head_dy, 9, 7
        ear_at = (30 + dx + head_dx, 59 + dy + head_dy)
    else:
        drop = int(squash * 9)
        bx, by = 55 + dx, 62 + dy + drop
        brx, bry = 27, int(25 - squash * 8)
        hx, hy = 28 + dx + head_dx, 51 + dy + drop + head_dy
        hrx, hry = 21, int(20 - squash * 3)
        sx, sy, srx, sry = 12 + dx + head_dx, 62 + dy + drop + head_dy, 11, 9
        ear_at = (32 + dx + head_dx, 33 + dy + drop + head_dy)

    # ── legs (drawn first, body overlaps them) ───────────────────────
    leg_layer = _mask()
    dl = _draw(leg_layer)
    foot = by + bry + (6 if lying else 12)
    top = by + bry - 10
    spans = ((26, 36), (41, 50), (59, 68), (73, 83)) if not lying else ((30, 42), (62, 74))
    for i, (x0, x1) in enumerate(spans):
        ox = legs[i] if i < len(legs) else 0
        oy = leg_lift[i] if i < len(leg_lift) else 0
        rrect(dl, x0 + dx + ox, top + oy, x1 + dx + ox, foot + oy, 5)
    stamp(sil, leg_layer)

    # ── ear, body, head, snout ───────────────────────────────────────
    stamp(sil, blob(ear_at[0], ear_at[1], 12, 7, ear_angle))
    ell(d, bx, by, brx, bry)
    ell(d, hx, hy, hrx, hry)
    ell(d, sx, sy, srx, sry)
    # bridge head <-> snout so the silhouette reads as one shape
    rrect(d, sx - 2, sy - sry, hx + 4, sy + sry - 1, 6)

    if wave is not None:
        stamp(sil, blob(hx - 19, hy - 15 + wave, 6, 12, 35))

    # ── cream saddle band, clipped to the barrel of the body ─────────
    band = _mask()
    db = _draw(band)
    body_only = _mask()
    dbo = _draw(body_only)
    ell(dbo, bx, by, brx, bry)
    if lying:
        ell(db, bx + 20, by + 24, 42, 40)
    else:
        ell(db, bx + 34, by + 38, 52, 52)
    cream = mask_and(band, body_only)

    # ── face ─────────────────────────────────────────────────────────
    marks = []
    eye = _mask()
    de = _draw(eye)
    ex, ey = hx - 8, hy - 6
    if eyes == 'open':
        de.rectangle([ex - 3, ey - 1, ex + 1, ey], fill=255)
        de.rectangle([ex + 7, ey - 1, ex + 11, ey], fill=255)
    elif eyes == 'blink':
        de.rectangle([ex - 3, ey, ex + 1, ey], fill=255)
        de.rectangle([ex + 7, ey, ex + 11, ey], fill=255)
    elif eyes == 'happy':
        for ox in (0, 10):
            de.point([(ex - 3 + ox, ey + 1), (ex - 2 + ox, ey), (ex - 1 + ox, ey - 1),
                      (ex + ox, ey), (ex + 1 + ox, ey + 1)], fill=255)
    elif eyes == 'sad':
        for ox in (0, 10):
            de.point([(ex - 3 + ox, ey - 1), (ex - 2 + ox, ey), (ex - 1 + ox, ey + 1),
                      (ex + ox, ey + 1), (ex + 1 + ox, ey + 2)], fill=255)
    elif eyes == 'closed':
        for ox in (0, 10):
            de.point([(ex - 3 + ox, ey), (ex - 2 + ox, ey + 1), (ex - 1 + ox, ey + 1),
                      (ex + ox, ey + 1), (ex + 1 + ox, ey)], fill=255)
    marks.append((eye, EYE))

    if blush:
        bl = _mask()
        ImageDraw.Draw(bl).ellipse([hx - 15, hy + 2, hx - 9, hy + 6], fill=255)
        marks.append((bl, BLUSH))

    return sil, cream, marks


# ── extras ──────────────────────────────────────────────────────────────
def laptop_layers(dx=0, dy=0, paw=0):
    """Tiny laptop the pet works on: (case, screen, glyph, paws)."""
    case, screen, glyph, paws = _mask(), _mask(), _mask(), _mask()
    dc, ds, dg, dp = _draw(case), _draw(screen), _draw(glyph), _draw(paws)

    rrect(dc, 6 + dx, 54 + dy, 42 + dx, 78 + dy, 3)      # lid
    rrect(dc, 2 + dx, 78 + dy, 46 + dx, 86 + dy, 3)      # base / keyboard
    rrect(ds, 9 + dx, 57 + dy, 39 + dx, 75 + dy, 2)      # screen

    gx, gy = 13 + dx, 61 + dy                            # ">_" prompt
    dg.point([(gx, gy), (gx + 1, gy + 1), (gx + 2, gy + 2),
              (gx + 1, gy + 3), (gx, gy + 4)], fill=255)
    dg.rectangle([gx + 5, gy + 4, gx + 10, gy + 4], fill=255)

    rrect(dp, 12 + dx, 72 + dy + paw, 21 + dx, 81 + dy, 4)
    rrect(dp, 27 + dx, 72 + dy - paw, 36 + dx, 81 + dy, 4)
    return case, screen, glyph, paws


def zzz_layer(step=0):
    m = _mask()
    d = _draw(m)
    for i, (x, y, s) in enumerate(((60, 34, 4), (70, 24, 5), (82, 12, 6))):
        y -= step * i
        d.line([(x, y), (x + s, y)], fill=255)
        d.line([(x + s, y), (x, y + s)], fill=255)
        d.line([(x, y + s), (x + s, y + s)], fill=255)
    return m


def dots_layer(n=3, x=52, y=18):
    m = _mask()
    d = _draw(m)
    for i in range(n):
        d.rectangle([x + i * 7, y, x + i * 7 + 3, y + 3], fill=255)
    return m


def spark_layer(x=70, y=16, r=6):
    m = _mask()
    d = _draw(m)
    d.line([(x, y - r), (x, y + r)], fill=255)
    d.line([(x - r, y), (x + r, y)], fill=255)
    d.line([(x - r + 2, y - r + 2), (x + r - 2, y + r - 2)], fill=255)
    d.line([(x - r + 2, y + r - 2), (x + r - 2, y - r + 2)], fill=255)
    return m


# ── composition ─────────────────────────────────────────────────────────
def compose(sil, cream, marks, extras=()):
    """extras: iterable of (mask, fill_color, outline_bool)."""
    img = Image.new('RGBA', (GRID_W, GRID_H), (0, 0, 0, 0))

    all_solid = sil.copy()
    for m, _c, outline in extras:
        if outline:
            stamp(all_solid, m)

    ring = mask_and_not(dilate(all_solid, OUTLINE_W), all_solid)
    img.paste(OUTLINE, (0, 0), ring)

    img.paste(BLACK, (0, 0), sil)
    img.paste(CREAM, (0, 0), cream)
    for m, color, _o in extras:
        img.paste(color, (0, 0), m)
    for m, color in marks:
        img.paste(color, (0, 0), m)
    return img


def to_cell(grid_img):
    return grid_img.resize((CELL_W, CELL_H), Image.NEAREST)
