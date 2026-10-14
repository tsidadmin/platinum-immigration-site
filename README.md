# Platinum Immigration — Partner & Scorecard Site

Static campaign site for the Platinum Immigration Partner & Founder outreach campaign (Oct 2026).
Plain HTML/CSS/JS, no build step. Hosted on GitHub Pages.

## Pages
| Page | Purpose | Campaign segment |
|---|---|---|
| `index.html` | Positioning, two paths (owners / partners), how we work, FAQ | All |
| `partners.html` | Referral programme for the four partner types (anchors: `#corporate-services`, `#property`, `#hr`, `#advisers`) | 1, 2, 4, 5 |
| `scorecard.html` | SME PR Readiness Scorecard — 10 questions, runs in the browser, nothing stored | 3 |
| `rent-now-buy-as-pr.html` | "Rent Now, Buy as PR" ABSD comparison + calculator, printable | 2 |

## Settings
Edit the top of `assets/main.js`:
- `bookingUrl` — where every "Book a call / profile review" button goes (currently Platinum's contact page; swap in a Calendly link when ready)
- `partnerEmail` — set to the partnerships inbox to make partner buttons open an email instead

## Custom domain
1. Repo → Settings → Pages → Source: *Deploy from a branch*, `main`, `/ (root)`.
2. Settings → Pages → Custom domain: enter your domain and save (GitHub adds a `CNAME` file).
3. At your DNS provider:
   - Subdomain (e.g. `partners.example.com`): `CNAME` record → `tsidadmin.github.io`
   - Apex domain (`example.com`): `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. Once the certificate is issued, tick **Enforce HTTPS**.

## Before launch (from the brief)
- Platinum to approve positioning line, proof points and the three anonymised client stories
- Referral fee wording stays non-specific until confirmed per partner type (CEA / MAS rules)
- Never add copy that promises or implies guaranteed approval
- ABSD rates as at Oct 2026 — recheck with IRAS if rates change
