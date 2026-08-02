# A Place for Mom — Design System

A calm, trustworthy design system for **A Place for Mom (APFM)** — the senior care referral service that guides families through one of the most emotionally loaded decisions they'll make.

> **North star:** Design every APFM experience to help seniors and families take one dignified, informed, low-pressure step toward the right level of support.

This system is built around four brand promises: **preserve independence**, **make confusing decisions feel manageable**, **build trust before asking for commitment**, and **treat both seniors and caregivers with emotional dignity.** The *senior* is the real buyer even when a caregiver leads the search — so every pattern is agency-preserving and non-threatening.

## What APFM should feel like
Warm but not sentimental · clear but not sterile · mature but not old-fashioned · supportive but not patronizing · trustworthy but not bureaucratic · human but not cluttered. **Not** a sales funnel, a hospital portal, a luxury brochure, a cold marketplace, or a crisis hotline.

---

## Sources
- **Figma:** `APFM DS v.2.fig` (attached). Tokens, components, logos, photography, and the icon set were extracted from this file. Pages of note: Colors, Typography, Logos, Buttons, Heros, Switchbacks, Conversion Panel, Trustbar, Testimonial, Footer.
- **Fonts (uploaded):** `OPTIMA.TTF`, `Commissioner-VariableFont…ttf`.
- **Logo source:** `APFM_Logo_TwoColor_Screen.afdesign` (uploaded) + extracted SVGs in `assets/logos/`.
- **Brand brief:** APFM B2C research summary (audience, journey stages, behavioral design rules) — drives tone and component priorities.

---

## CONTENT FUNDAMENTALS

**Voice:** a knowledgeable, patient guide who understands both the practical and emotional stakes. Plainspoken, warm, direct, nonjudgmental, confidence-building, respectful of autonomy.

**Person:** Speak to the reader as **"you"**, capable and in control. Address the *senior* directly, not only the adult child. Use **"we"** for APFM ("we'll help you…", "we're paid by…"). Never speak *about* the senior as an object ("place your loved one").

**Casing:** Sentence case for headings and buttons (`See what support fits`, not `See What Support Fits`). Eyebrows are UPPERCASE. Title Case only for proper nouns.

**Tone in practice:**
- Frame help as *preserving* independence: "Stay yourself. Get support where you need it."
- Normalize hesitation: "You are not behind. Many families begin here."
- Sequence, don't leap: "A next step, not a final leap." "Start small and adjust as needs change."
- Cost, gently: "Let's understand what's realistic" — never "What can you afford?"
- Trust, shown not claimed: "Recommended because: close to family, within budget, strong recent reviews."

**Avoid:** "You need care." · "It's time to give up independence." · "We'll take over from here." · "Place your loved one today." · "Don't wait until it's too late." · "Senior care made easy." · anything infantilizing, clinical, coercive, or pitying.

**Emoji:** Not used. Iconography is line-based (Phosphor) — calm, never decorative emoji.

---

## VISUAL FOUNDATIONS

**Color.** Two brand hues on warm-neutral ground:
- **Serenity blue** (`--blue-800 #334fa9`) is the signature; **Nile blue** (`--blue-900 #1f3066`) is heading ink; `--blue-600` is the default interactive surface.
- **Sage green** (`--green-500 #3d8064`) is the accent — confirmation, success, "start small," stars.
- **Cream** (`--cream-50 #fffdf7`, divider `--cream-200`) warms panels; cool **gray** carries body text (`--gray-700`) and borders.
- Page background is a soft off-white `--surface-page #fdfdfb`, never stark white sections back-to-back.
- Status colors are muted, never alarming. Always prefer semantic role tokens (`--surface-brand`, `--text-heading`, `--border-warm`) over raw ramps.

**Type.** Two families: **Optima** (humanist serif) for display & headings — warm, dignified, set tight (`-0.02em`) and balanced; **Commissioner** (variable sans) for all body & UI, regular→bold, and for eyebrows/labels (UPPERCASE, semibold, `0.08em` tracking) and cost figures. Generous sizes for an older audience — body is 18px, never below 14px.

**Spacing & layout.** 4px base scale, *generous* — calm structure for cognitively-overloaded users. Sections breathe (`88px` vertical padding). Max content width `1280px`. Predictable, scannable, spacious grids.

**Shape.** Soft confidence. **Pills** for all buttons and badges (`--radius-pill`). Cards use `--radius-lg (16px)`; large feature surfaces `--radius-2xl (32px)`. Nothing sharp.

**Borders & elevation.** 1px hairline borders (`--border-subtle` cool, `--border-warm` cream). Shadows are soft and warm-neutral (`rgba(10,13,18,…)`), layered xs→2xl; cards rest at `--shadow-sm` and lift to `--shadow-lg` on hover with a 2px translateY.

**Motion.** Calm and quick — `150–360ms`, `ease-standard`/`ease-out`. Fades and gentle lifts; no bounces, no infinite decorative loops. Hover = darker brand fill or subtle lift; press = darkest brand active shade (no shrink).

**Focus.** A distinctive **teal glow** (`--focus-ring`, `rgba(109,255,236,.55)`) on `:focus-visible` — the one place a bright color appears, for accessibility.

**Imagery.** Real seniors, caregivers, homes, and advisors — warm, naturally lit, candid (see `assets/images/hero-couple.png`). Avoid stock-photo clichés of perfectly happy aging. Photos sit in rounded surfaces with soft shadow.

---

## ICONOGRAPHY

- **System:** the Figma file uses **Phosphor Icons** (~2800 glyphs) — a calm, regular-weight line set. Phosphor is CDN-available, so consumers should link it rather than ship hundreds of SVGs:
  ```html
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
  <!-- <i class="ph ph-house"></i> · weights: thin / light / regular / bold / fill / duotone -->
  ```
  Prefer **regular** weight to match the brand's calm tone; use **fill** sparingly for active/selected states.
- **In-component icons:** small functional glyphs (arrow, check, plus, chevron, shield) are inlined as crisp 2px-stroke SVGs in the components so they inherit `currentColor` and need no dependency.
- **Logo / brand mark:** the **dove** is the brand symbol. SVGs in `assets/logos/` use `currentColor` — inline them (fetch + innerHTML) to recolor, rather than `<img>`. Don't redraw the dove.
- **Emoji / unicode icons:** not used.

---

## Index

**Foundations (CSS — consumers link `styles.css` only):**
- `styles.css` — import manifest (this is the entry point).
- `tokens/fonts.css` · `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/base.css`.

**Specimen cards** (`guidelines/`): color ramps, semantic roles, status, type (display/body/eyebrow), spacing, radii, shadows, logo.

**Components** (`components/`):
- `buttons/` — **Button** (primary/accent/secondary/tertiary/link)
- `forms/` — **Input**, **Checkbox**, **Radio**, **Switch**
- `feedback/` — **Badge**, **Eyebrow**
- `display/` — **Card**, **Avatar**
- `disclosure/` — **Accordion** / **AccordionItem**
- `navigation/` — **Tabs**
- `care/` — **StarRating**, **StepProgress**, **TrustBadge**, **CostRange**, **CareOptionCard**, **AdvisorCard**, **ReviewCard** (the brand-defining guidance patterns)

**UI kits** (`ui_kits/`):
- `website/` — interactive APFM marketing homepage (`index.html`).

**Assets** (`assets/`): `logos/` (dove wordmark + logomark, dark/white/blue), `fonts/`, `images/`.

**Usage:** the compiler bundles components into `_ds_bundle.js` (auto-generated). In HTML, read them via `const { Button } = window.APlaceForMomDesignSystem_a2ff8a` after loading the bundle. Never hand-edit `_ds_bundle.js`, `_ds_manifest.json`, or `_adherence.oxlintrc.json`.
