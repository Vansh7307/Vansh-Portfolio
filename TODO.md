# Add Resume Feature — Vansh Portfolio

## Objective
Add a "Resume" link/button throughout the portfolio pointing to `assets/Vansh-Resume.pdf`, referencing the layout style from aayushmehta.in. Keep the existing GitHub button (do not replace it).

## Steps

- [x] 1. Add Resume button in navbar `.nav-actions` (left of GitHub) using `.nav-resume-btn`
- [x] 2. Restyle GitHub navbar button as a ghost/outline `.nav-ghost-btn` (keep it, since Resume takes the gradient style)
- [x] 3. Add "View Resume" secondary button in hero `.hero-actions` (after GitHub, before Contact Me)
- [x] 4. Add "Resume" secondary button in contact `.contact-actions` (after Email Me)
- [x] 5. Add "Resume" link in profile modal `.profile-modal-links`
- [x] 6. Add `.nav-ghost-btn` CSS styles + hide it on mobile alongside `.nav-resume-btn`
- [x] 7. Verify all resume links point to `assets/Vansh-Resume.pdf`

---

# Add Offer Letter & Certificate Buttons — Vansh Portfolio

## Objective
Add "Offer Letter" buttons to 4 experience cards and "Certificate" buttons to 5 others (Experience section), pointing to files in `assets/offer-letters/` and `assets/certificates/`.

## Steps

- [x] 1. Add `.education-docs` / `.document-btn` / `.document-btn-cert` CSS styles
- [x] 2. Offer Letter — Campus Ambassador (EdiGlobe) → `ediglobe.pdf`
- [x] 3. Offer Letter — Software Engineer Intern (Clinch Cloud Workforce) → `clinch cloud.pdf`
- [x] 4. Offer Letter — Web Development Intern (Amdox Technologies) → `Amdox.pdf`
- [x] 5. Offer Letter — Python Programming Intern (CodSoft) → `codsoft.png`
- [x] 6. Certificate — College Ambassador Techfest (IIT Bombay) → `iit techfest.pdf`
- [x] 7. Certificate — Web Design Intern (EDC info-net) → `web design at EDC.png`
- [x] 8. Certificate — Python Intern (EDC info-net) → `python intern.png`
- [x] 9. Certificate — Programming in C & C++ (EDC info-net) → `C&C++.png`
- [x] 10. Certificate — Web Developer (CyberZee) → `web developer at cyberzee.png`
- [x] 11. Update all links to match user-provided filenames (URL-encoded spaces/special chars)
- [x] 12. Verify all links match the actual files in the folders
- [x] 13. Add "Offer Letter — Coming Soon" disabled button in AWS Student Builder Campus Leader card

---

# Add Certifications Section — Vansh Portfolio

## Objective
Replace the "Certifications Coming Soon" placeholder with a grid of 18 certificate cards, grouped by issuer with color-coded accents. Each card shows the certificate name, issuing company, and a "View Certificate" button.

## Certifications (18)

### IBM (blue)
1. Data Science with Scala
2. Data Analysis with Python
3. Data Visualization with Python
4. IBM Cloud Essentials
5. Build Your Own Chatbot
6. SQL and Relational Databases 101

### Google Cloud Skills Boost (green)
7. Deploying SAP on Google Cloud
8. Enterprise Agents and Use Cases
9. Agent Fundamentals
10. Introduction to AI Agents
11. Create Your First Gemini Enterprise Application
12. Introduction to Generative AI

### Microsoft (cyan)
13. Introduction to AI and ML
14. Introduction to Azure OpenAI managed identity authentication with Python

### Deloitte Australia via Forage (purple)
15. Cyber Job Simulation
16. Data Analytics Job Simulation
17. Technology Job Simulation

### Forage Academy (yellow)
18. Data Labeling Job Simulation

## Steps

- [x] 1. Add `.certification-grid`, `.cert-card`, `.cert-issuer`, `.cert-view-btn`, and issuer accent CSS
- [x] 2. Replace Certifications "Coming Soon" box with the 18-card grid in index.html
- [x] 3. Add `.cert-card` to scroll-reveal lists in style.css and script.js
- [x] 4. Add `.certification-grid` to responsive media queries
- [x] 5. Create `assets/certifications/` folder and verify links
- [x] 6. User dropped certificate files into `assets/certifications/` — all linked and verified

## Badge Conversion (added files in `assets/badges/`)

- [x] 7. Converted 5 Google Cloud cards to "View Badge" buttons → `assets/badges/` (Deploying SAP, Enterprise Agents, Agent Fundamentals, Introduction to AI Agents, Introduction to Generative AI)
- [x] 8. Converted/added 4 Microsoft cards to "View Badge" buttons → `assets/badges/` (Machine Learning in Azure, Generative AI in Microsoft Foundry, Azure OpenAI Managed Identity, Generative AI and Agents)
- [x] 9. Added `.badge-view-btn` CSS variant (yellow accent)
- [x] 10. Added CyberZee certification card → `assets/certifications/cyberzee certificate by srm.jpeg` with `.cert-cyberzee` (orange accent)
- [x] 11. Verified all badge (9), certification (12), certificate (5), and offer-letter (4) links resolve to real files

---

# Add Link Verification Script

## Objective
Create a reusable PowerShell script that automatically verifies every local `assets/...` link in `index.html` resolves to a real file on disk (handles URL-encoding like `%20`, `%26`, `%2B`).

## Steps

- [x] 1. Create `verify_links.ps1` — extracts `href`/`src` attributes pointing to `assets/`, URL-decodes them, and checks file existence
- [x] 2. Print a ✅/❌ report with a final summary and exit code (0 = all OK, 1 = broken links) so it can be used in CI/pre-commit
- [x] 3. Run the script — **36/36 asset links OK**

