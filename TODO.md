# Deployment Platform Migration TODO

## Objective
Remove old deployment platforms (Streamlit, Firebase) and set up new platforms (Vercel, Supabase). Deploy the portfolio to GitHub, then prepare for Vercel + Supabase.

## Steps

- [x] 1. Update index.html content:
  - [x] Hero code window: `Firebase` → `Supabase`
  - [x] About card 04 "Deployment Ready": remove Streamlit, add Supabase
  - [x] Skills > Tools & Platforms: `Streamlit` → `Supabase`
  - [x] Project 1: `Streamlit` tag → `Vercel`; update demo URL to Vercel
  - [x] Project 2: `Firebase` tag → `Supabase`; update description
- [x] 2. Create `vercel.json` (Vercel deployment config)
- [x] 3. Create `supabase-config.js` (Supabase client config)
- [x] 4. Add Supabase-powered contact form to index.html + script.js
- [x] 5. Add contact form styles to style.css
- [x] 6. Create `.gitignore`
- [x] 7. Create `README.md` (setup + deployment steps)
- [x] 8. git init + commit + push to `https://github.com/Vansh7307/Vansh-Portfolio.git`
- [ ] 9. Provide Vercel + Supabase deployment instructions

