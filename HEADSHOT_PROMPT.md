# Headshot generation prompt

Goal: recreate the dramatic black-and-white studio portrait look (round glasses, tweed
blazer, soft directional light, subtle film grain) using the existing headshot
(`public/assets/aneeq-headshot.jpeg`) as the identity reference.

## How to use this

1. Open your image tool (Gemini, Midjourney `--cref`, ChatGPT image edit, etc.) in
   **image-to-image / reference mode**, not pure text-to-image.
2. Upload `aneeq-headshot.jpeg` as the reference/base image.
3. Set denoise/strength to **low-to-medium** (roughly 30–45%) so the tool restyles
   lighting, color, and wardrobe without replacing the face. If your tool has a
   separate "face/identity lock" or "character reference" toggle, enable it.
4. Paste the prompt below as the edit instruction.
5. If the first pass drifts too far from the real face, lower the strength another
   10% and re-run — better to under-edit and re-pass than to overshoot once.

## Prompt (black-and-white editorial — matches the reference)

```
Edit this exact photo of the same person, preserving their true face, bone structure,
skin tone, and identity exactly as shown in the reference image — do not generate a
different face.

Restyle as a professional black-and-white studio portrait, chest-up, centered,
looking directly at the camera with a calm, confident, slightly warm expression
(closed-mouth, subtle smile, not stiff).

Wardrobe: swap in a textured wool or tweed blazer with a plain white or light
grey collared shirt underneath, open collar, no tie.

Lighting: soft diffused studio key light from camera-left, gentle falloff into
shadow on the opposite side, even illumination across the face, a soft catchlight
visible in both eyes, no harsh shadows.

Background: seamless light grey studio backdrop, clean, no props, no texture.

Color treatment: full black-and-white conversion, soft tonal range (not high
contrast or crushed blacks), gentle midtones, a faint realistic film grain —
not a flat digital desaturation.

Lens & focus: shot on an 85mm portrait lens, shallow depth of field, tack-sharp
focus on the eyes, soft falloff on the shoulders and background.

Finish: ultra-realistic photography, natural skin texture retained (pores, fine
lines, slight asymmetry), no plastic/airbrushed skin, no beautification, no
reshaping of facial features, no added or removed hair, no distortion.

Composition: square 1:1 crop, subject's eyes roughly on the upper third line,
some headroom above, cropped at the chest.
```

## Negative prompt / avoid

```
different face, altered bone structure, generated person, color photo, colour cast,
warm or orange tones, harsh contrast, crushed blacks, overexposed highlights,
plastic skin, airbrush, beauty filter, symmetrical face correction, extra fingers,
distorted ears, distorted glasses, warped collar, logo on clothing, visible
background clutter, low resolution, blurry face, closed eyes, asymmetric lighting
flare, text, watermark
```

## Alternate — color "startup founder" version

Keep this one if you'd rather go color/office instead of black-and-white. This is
your original prompt, tightened up:

```
Edit this exact photo of the same person, preserving their true face and identity —
do not generate a different face.

Professional headshot of a tech founder, chest-up, centered, looking directly at
the camera, confident and approachable, subtle natural smile.

Wardrobe: smart-casual — minimalist blazer over a plain t-shirt or open-collar shirt,
no tie, no busy patterns.

Setting: modern office background, softly blurred (shallow depth of field), clean
workspace or glass-partition elements visible but out of focus.

Lighting: natural window light mixed with soft indoor fill, even illumination on
the face, soft realistic shadows, no harsh flash.

Lens & focus: 85mm portrait lens, shallow depth of field, subtle background bokeh,
sharp focus on the eyes.

Finish: ultra-realistic, natural skin texture, no heavy retouching, no plastic
skin, no distortion, natural color tones (not oversaturated or warm-filtered).

Composition: square 1:1 crop, centered, some headroom above the head.
```

## Once you have the final image

Drop it in as `public/assets/aneeq-headshot.jpeg` (replacing the current file,
same filename) and I'll re-run it through the same grading pass (grayscale +
contrast curve) already wired into the Hero component — or tell me and I'll
adjust the grade to match whatever comes out.
