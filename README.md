# ubeydullahademi.com — static site

Plain HTML + one stylesheet + one small JS file. No build step, no dependencies.

## Preview locally

```
python3 -m http.server 4321 --directory website
```

Then open http://localhost:4321

## Structure

```
website/
  index.html            Home — hero diagram, selected work, current focus
  work/index.html       Five case studies (Problem → What I did → Result → What it demonstrates)
  research/index.html   Dissertation, publication, ongoing projects, data
  about/index.html      Narrative, background, contact
  assets/
    style.css           Warm editorial system + all motion
    motion.js           Scroll reveals (IntersectionObserver), SVG edge lengths
    mark.png            UA monogram, ink navy, transparent
    logo-original.png   Original WordPress logo (UA + "Political Science")
    favicon-16/32.png, apple-touch-icon.png
    portrait.jpg        675×900
    cv.pdf              Archived May 2024 CV — NOT linked from any page
```

## Palette

| Role | Hex |
|---|---|
| Background | `#F7F4ED` |
| Surface | `#FFFDF9` |
| Ink / headings / footer | `#182334` |
| Body text | `#4A5568` |
| Accent | `#146B5C` |
| Rules / borders | `#D9D4C8` |

## Motion

- Hero sequence runs once on load, finishes in ~3s, then a 3px breathing loop on the node cluster only.
- Scroll reveals fire once per element and never re-trigger.
- Everything is wrapped in `prefers-reduced-motion: no-preference`; reduced-motion users get the finished state immediately.

## Still to do

- `assets/social.jpg` (1200×630) — referenced by `og:image` on every page but not yet created.
- Second peer-reviewed article and book chapter are not listed on `/research/` — only the verified *Party Politics* (2023) piece is.
- Replace the archived CV with a current one-page résumé before linking it anywhere.

## Deploying

Any static host. Cloudflare Pages or Netlify: point at this folder, no build command, output directory `website`.
Keep the paths `/work/`, `/research/`, `/about/` so existing links and search results survive.
