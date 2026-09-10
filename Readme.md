# LoveAll Futsal Tournament — Website

> Official homepage for the **LoveAll Futsal Tournament** — a 5v5 indoor football tournament organised by LoveAll Club, held on **Saturday, 26 September 2026** at **Circuit Sports OMR, Chennai**.

---

## 📸 Preview

The site features a full-viewport hero with the tournament poster as background, cinematic dark overlays, and smooth scroll-reveal animations throughout.

---

## 🗂️ Project Structure

```
FootballWeb/
├── index.html          # Main homepage (single page)
├── styles.css          # All styles — design tokens, layout, animations
├── script.js           # JS — nav, countdown, scroll reveal, parallax
├── FutsalPoster.jpeg   # Tournament poster (used as hero background)
├── loveAllIcon.jpeg    # LoveAll Club logo (favicon + nav + footer)
└── Readme.md           # This file
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--black` | `#0a0a0a` | Page background |
| `--white` | `#fafafa` | Headings, primary text |
| `--lime` | `#c6f135` | Accent — CTA buttons, italic title, live dot |
| `--grey-4` | `#8a8a8a` | Body / secondary text |
| `--ff-serif` | DM Serif Display | Display headings, countdown numbers |
| `--ff-sans` | DM Sans | Body, labels, nav, buttons |

---

## 📄 Page Sections

| Section | Description |
|---------|-------------|
| **Hero** | Full-viewport, tournament poster as background with dark overlay. Title in DM Serif Display with lime italic. Live animated scroll cue. |
| **Stats Band** | Horizontal strip — 5v5 / ₹1,500 / 5 PM / Sep 26 |
| **Marquee** | Infinite scrolling ticker with event info |
| **Countdown** | Live countdown in large serif numerals to 26 Sep 5 PM IST |
| **Details** | 4-column grid — format, eligibility, entry fee, bracket structure |
| **Format** | 2-column layout — description + numbered steps (Group → Knockout → Final) |
| **Venue** | Circuit Sports OMR address + 2×2 info card grid (Date / Kick off / Location / Entry) |
| **Register** | Centred CTA with logo, WhatsApp registration link |
| **Footer** | Minimal one-liner with branding |

---

## ✨ Animations & Motion

- **Hero title** — lines slide up on page load with staggered delay
- **Scroll reveal** — every section element fades + translates up as it enters the viewport (`IntersectionObserver`)
- **Poster parallax** — hero background image moves at 40% scroll speed for depth
- **Countdown tick** — each number animates with a quick translate-up on change
- **Marquee** — infinite horizontal scroll, seamlessly duplicated in JS
- **Nav fill** — nav gains a frosted glass background after 60px scroll
- **Colon blink** — countdown separator blinks in sync with seconds
- **Scroll line** — lime runner animates down the vertical scroll cue

---

## 🚀 Running Locally

No build step required — pure HTML, CSS, and JavaScript.

### Option 1 — Python (quickest)

```bash
# In the project folder:
python -m http.server 8080
```

Then open **http://localhost:8080** in your browser.

### Option 2 — VS Code Live Server

Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html` → **Open with Live Server**.

### Option 3 — Node.js

```bash
npx serve .
```

---

## 📅 Event Details

| Detail | Info |
|--------|------|
| **Event** | LoveAll Futsal Tournament |
| **Format** | 5v5 (five players + one sub per team) |
| **Date** | Saturday, 26 September 2026 |
| **Kick off** | 5:00 PM IST |
| **Venue** | Circuit Sports OMR — The Ark, 189, Rajiv Gandhi Salai, Sholinganallur, Chennai, Tamil Nadu |
| **Entry fee** | ₹1,500 per team |
| **Bracket** | Group stage → Single-elimination knockouts |
| **Organiser** | LoveAll Club |

---

## 🛠️ Tech Stack

- **HTML5** — semantic markup, single `index.html`
- **CSS3** — custom properties, `IntersectionObserver`-driven reveals, CSS animations, `backdrop-filter`
- **Vanilla JavaScript** — no frameworks, no dependencies
- **Google Fonts** — [DM Serif Display](https://fonts.google.com/specimen/DM+Serif+Display) + [DM Sans](https://fonts.google.com/specimen/DM+Sans)

---

## 📬 Registration

Teams register via WhatsApp. Update the link in `index.html`:

```html
<!-- index.html — Register section -->
<a href="https://wa.me/+91XXXXXXXXXX" ...>Message us on WhatsApp</a>
```

Replace `+91XXXXXXXXXX` with the organiser's WhatsApp number.

---

## 🔧 Customisation

| What to change | Where |
|----------------|-------|
| Accent colour | `--lime` in `styles.css` |
| Countdown date/time | `new Date('2026-09-26T17:00:00+05:30')` in `script.js` |
| Hero poster | Replace `FutsalPoster.jpeg` |
| Logo / favicon | Replace `loveAllIcon.jpeg` |
| WhatsApp number | `href` on the Register CTA in `index.html` |
| Event details text | Directly in `index.html` |

---

*Made with ❤️ for LoveAll Club · Chennai · 2026*
