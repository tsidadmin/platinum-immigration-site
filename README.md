# Platinum Immigration — Partner & Scorecard Site

Static campaign site for the Platinum Immigration Partner & Founder outreach campaign (Oct 2026).
Plain HTML/CSS/JS, no build step. Hosted on GitHub Pages.

## Page
One landing page (`index.html`) with sections: hero, owners vs partners, partner types (CSP, property, HR, advisers), SME PR Readiness Scorecard, what ICA looks at, "Rent Now, Buy as PR" ABSD calculator, client stories, FAQ, WhatsApp CTA.

Logo and hero image load from platinum-immigration.com.

## Settings
Edit the top of `assets/main.js`:
- `whatsappNumber`: every CTA opens WhatsApp to Luis (+65 8268 7880)
- `messages`: the pre-filled WhatsApp text for each CTA (general, owner, partner, property). The scorecard pre-fills the visitor's score.

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
