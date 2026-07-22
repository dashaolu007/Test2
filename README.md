# Medivo Website — GitHub Pages Package

A standard static site: 6 HTML pages + one stylesheet + one script. No
build step, no `npm install`, no framework — every page works by itself
the moment it's uploaded.

## Latest changes (visual refresh)

- **Background:** the flat white/gray sections now have a layered mesh-gradient treatment in the Medivo palette (soft teal and amber blooms, a faint dot-grid texture) instead of solid color. Dark sections (Security & Trust, final CTA) got the same treatment in reverse — richer navy gradients plus a visible node-lattice texture.
- **Typography:** headlines are bigger and bolder (700 weight, larger scale), and one key phrase per major headline now renders as a gradient (navy → teal, echoing the background) instead of flat black — e.g. "Smarter care starts with **connected** people." I kept this to gradient emphasis rather than literal script/cursive type — a calligraphy-style font would read as a wedding invitation or beauty brand, not enterprise clinical software, and would undercut the "professional, enterprise-ready" positioning from the original review. This is the bolder, more expressive version of that same goal.
- **Hero illustration:** the node-graph is now more layered — gradient-filled nodes with a soft glow ring each, a rotating dashed "scanner" ring around the EMR hub, a faint hex-pattern texture, small twinkling particles, and a two-tone (teal→amber) gradient on the connection lines instead of flat teal.

## On using photos from Canva

I looked into this properly rather than guessing: the Canva tools I have access to create and manage Canva *designs* (docs, presentations, posters, social posts) inside your Canva account — they don't include a stock-photo search I can pull generic images of doctors/clinics from and drop into an HTML page. So I couldn't do this the way you asked.

Two ways to actually get there:
1. **You export specific images from Canva** (or wherever) and upload them here — once I have real files with real rights attached, I can drop them into the pages properly, with correct sizing/optimization.
2. **I keep enhancing the illustrated approach** (what I did above) — no licensing risk, and it's what avoided the original "AI-generated imagery" credibility problem in the first place. Stock or AI-generated photos of "doctors" and "patients" is exactly the thing that review flagged.

Happy to do either — just send over actual image files if you want real photography in there.

## Deploy this to GitHub Pages (exact steps)

1. **Create or open the repo** you want this to live in (e.g. a fresh repo, or replace what's in `test1`).
2. **Upload all 9 files to the same folder** — either the repo root, or one subfolder if you prefer, but all 9 together, not split up:
   `index.html`, `about.html`, `projects.html`, `partners.html`, `privacy-policy.html`, `terms-of-use.html`, `styles.css`, `main.js`, `README.md`
   Easiest way: on GitHub, click **Add file → Upload files**, drag in all 9, commit.
3. **Settings → Pages** (left sidebar of the repo).
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, pick `main` (or whichever branch you uploaded to) and the folder you put the files in (`/ (root)` if you uploaded to the root), then **Save**.
6. GitHub gives you a URL like `https://<your-username>.github.io/<repo-name>/` — it usually takes 1–2 minutes to go live after the first save.

**If you get a 404 again:** it's almost always not all 9 files making it into the same folder, or the Pages branch/folder setting pointing somewhere those files aren't. Every internal link in this package is checked against the actual files before I send it (0 broken out of 260+).

## Before this goes fully live

Search the files for `[Add:` — that marks the Security & Trust section, the About/Projects/Partners pages, and the two legal pages, where I built real page structure but left the actual claims (compliance details, team bios, case studies, legal terms) as placeholders instead of inventing them. The Privacy Policy and Terms of Use in particular should go to an actual lawyer before publishing.

## One more thing worth knowing

The link you shared earlier (`dashaolu007.github.io/test1`) wasn't running the package I'd actually built — different copy, and the stock-photo/AI-imagery issue was still there. This package is built from my own working version, not from what was live at that link.
