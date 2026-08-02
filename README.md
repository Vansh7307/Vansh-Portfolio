# Vansh Portfolio

A modern, animated developer portfolio built with **HTML, CSS, and JavaScript** — now deployed on **Vercel** with **Supabase** as the backend for the contact form.

## 🚀 Stack

| Layer | Technology |
| ----- | ---------- |
| Frontend | HTML, CSS, JavaScript (vanilla) |
| Hosting / Deployment | [Vercel](https://vercel.com) |
| Backend / Database | [Supabase](https://supabase.com) (PostgreSQL) |
| Version Control | GitHub |

## 📁 Project Structure

```
Portfolio-main/
├── index.html            # Main portfolio page
├── style.css             # Styles & animations
├── script.js             # Interactions & Supabase contact form logic
├── supabase-config.js    # Supabase client config
├── supabase/
│   └── schema.sql        # SQL to create the contact_messages table
├── vercel.json           # Vercel static deployment config
├── .gitignore
└── README.md
```

---

## 🔧 Local Development

Simply open `index.html` in a browser, or serve it locally:

```bash
# Using VS Code Live Server extension, or:
npx serve .
```

---

## ☁️ Deploy on Vercel

### Option A — Import from GitHub (recommended)

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and sign in.
3. Click **Import** on your `Vansh-Portfolio` repo.
4. Vercel auto-detects it as a static site (framework: **Other**).
5. Click **Deploy**. Done — you get a URL like `vansh-portfolio.vercel.app`.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
# from the project folder:
vercel --prod
```

### `vercel.json`

The included `vercel.json` enables clean URLs, caches `assets/`, and rewrites all routes to `index.html` (SPA-friendly).

---

## 🗄️ Set up Supabase (contact form backend)

1. Create a free project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run everything in [`supabase/schema.sql`](supabase/schema.sql).
   This creates the `contact_messages` table with Row Level Security:
   - **Anonymous** visitors can only insert.
   - Only **authenticated** users can read/update/delete.
3. Go to **Project Settings → API** and copy the **Project URL** and **anon public key**.
4. Configure the site — create a `.env` file (local) or set env vars (Vercel):

   ```env
   VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
   ```

   Then load them into `supabase-config.js` via `window.SUPABASE_URL` and
   `window.SUPABASE_ANON_KEY` (or paste the values directly into the placeholders).

> ⚠️ **Never commit real keys.** The `anon` key is meant to be public-safe, but keep
> it restricted via RLS as shown in the schema.

---

## 📬 Contact Form

The contact section includes a name / email / message form. On submit it:
1. Validates the fields in the browser.
2. Inserts a row into the `contact_messages` Supabase table.
3. Shows a success / error message.

To view messages: open your Supabase dashboard → **Table Editor → contact_messages**.

---

## 🧹 Migrating from old platforms

- **Streamlit** → replaced with **Vercel** for project demos.
- **Firebase** → replaced with **Supabase** for backend/database.

---

## 🏷️ Live Demo Links (Projects)

| # | Project | Demo |
| - | ------- | ---- |
| 1 | Movies Recommendation System | https://movies-recommendation-system.vercel.app/ |
| 2 | Water Tracker | https://dailywater-tracker.vercel.app/ |
| 3 | BMI Calculator | https://bodymi-calc.vercel.app/ |
| 4 | Literary Compass | https://literary-compass-india.vercel.app/ |
| 5 | HueLedger | https://hueledger.vercel.app/ |
| 6 | WeekWise | https://week-wise.vercel.app/ |
| 7 | PlantrixAI | https://plantrixai.vercel.app/ |
| 8 | QuickSort | https://quicksortfiles.vercel.app/ |

---

© 2026 Aayush Mehta. All rights reserved.

