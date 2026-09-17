import os
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

def create_rounded_mask(size, radius):
    scale = 4
    mask = Image.new('L', (size[0] * scale, size[1] * scale), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (size[0] * scale, size[1] * scale)], radius=radius * scale, fill=255)
    return mask.resize(size, Image.Resampling.LANCZOS)

def create_drop_shadow(size, radius, blur_radius, offset, shadow_color=(0, 0, 0, 100)):
    pad = blur_radius * 2 + abs(offset[1]) + abs(offset[0])
    w = size[0] + pad * 2
    h = size[1] + pad * 2
    shadow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(shadow)
    rect_x0 = pad + offset[0]
    rect_y0 = pad + offset[1]
    rect_x1 = rect_x0 + size[0]
    rect_y1 = rect_y0 + size[1]
    draw.rounded_rectangle([(rect_x0, rect_y0), (rect_x1, rect_y1)], radius=radius, fill=shadow_color)
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur_radius))
    return shadow, pad

def make_showcase():
    base_dir = r'C:\Users\Asus\AppData\Local\Programs\antigravity'
    center_src = Image.open(os.path.join(base_dir, 'mockup_center.png')).convert('RGBA')
    left_src = Image.open(os.path.join(base_dir, 'mockup_left.png')).convert('RGBA')
    right_src = Image.open(os.path.join(base_dir, 'mockup_right.png')).convert('RGBA')

    canvas_w, canvas_h = 1600, 900
    bg_color = (233, 210, 200, 255)
    canvas = Image.new('RGBA', (canvas_w, canvas_h), bg_color)

    cw, ch = 990, 680
    cradius = 28
    sw, sh = 560, 460
    sradius = 22

    center_cropped = center_src.crop((20, 0, 1260, 675)).resize((cw, ch), Image.Resampling.LANCZOS)
    c_mask = create_rounded_mask((cw, ch), cradius)
    center_card = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    center_card.paste(center_cropped, (0, 0), c_mask)
    c_draw = ImageDraw.Draw(center_card)
    c_draw.rounded_rectangle([(0, 0), (cw-1, ch-1)], radius=cradius, outline=(255, 255, 255, 25), width=1)

    left_cropped = left_src.crop((20, 20, 650, 540)).resize((sw, sh), Image.Resampling.LANCZOS)
    overlay_l = Image.new('RGBA', (sw, sh), (0, 0, 0, 28))
    left_cropped = Image.alpha_composite(left_cropped, overlay_l)
    l_mask = create_rounded_mask((sw, sh), sradius)
    left_card = Image.new('RGBA', (sw, sh), (0, 0, 0, 0))
    left_card.paste(left_cropped, (0, 0), l_mask)
    l_draw = ImageDraw.Draw(left_card)
    l_draw.rounded_rectangle([(0, 0), (sw-1, sh-1)], radius=sradius, outline=(255, 255, 255, 20), width=1)

    right_cropped = right_src.crop((410, 30, 950, 740)).resize((sw, sh), Image.Resampling.LANCZOS)
    overlay_r = Image.new('RGBA', (sw, sh), (0, 0, 0, 28))
    right_cropped = Image.alpha_composite(right_cropped, overlay_r)
    r_mask = create_rounded_mask((sw, sh), sradius)
    right_card = Image.new('RGBA', (sw, sh), (0, 0, 0, 0))
    right_card.paste(right_cropped, (0, 0), r_mask)
    r_draw = ImageDraw.Draw(right_card)
    r_draw.rounded_rectangle([(0, 0), (sw-1, sh-1)], radius=sradius, outline=(255, 255, 255, 20), width=1)

    cx_pos = (canvas_w - cw) // 2
    cy_pos = (canvas_h - ch) // 2 + 10
    sy_pos = cy_pos + (ch - sh) // 2
    lx_pos = 45
    rx_pos = canvas_w - sw - 45

    l_shadow, l_pad = create_drop_shadow((sw, sh), sradius, blur_radius=25, offset=(0, 15), shadow_color=(0, 0, 0, 60))
    canvas.paste(l_shadow, (lx_pos - l_pad, sy_pos - l_pad), l_shadow)
    canvas.paste(left_card, (lx_pos, sy_pos), left_card)

    r_shadow, r_pad = create_drop_shadow((sw, sh), sradius, blur_radius=25, offset=(0, 15), shadow_color=(0, 0, 0, 60))
    canvas.paste(r_shadow, (rx_pos - r_pad, sy_pos - r_pad), r_shadow)
    canvas.paste(right_card, (rx_pos, sy_pos), right_card)

    c_shadow1, c_pad1 = create_drop_shadow((cw, ch), cradius, blur_radius=45, offset=(0, 25), shadow_color=(0, 0, 0, 95))
    canvas.paste(c_shadow1, (cx_pos - c_pad1, cy_pos - c_pad1), c_shadow1)
    c_shadow2, c_pad2 = create_drop_shadow((cw, ch), cradius, blur_radius=18, offset=(0, 10), shadow_color=(0, 0, 0, 70))
    canvas.paste(c_shadow2, (cx_pos - c_pad2, cy_pos - c_pad2), c_shadow2)

    canvas.paste(center_card, (cx_pos, cy_pos), center_card)

    out_path = os.path.join('static', 'preview.png')
    canvas.save(out_path, 'PNG', optimize=True)
    print(f'Saved preview to {out_path}')

if __name__ == '__main__':
    make_showcase()
