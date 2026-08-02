/**
 * Supabase Configuration
 * ========================
 * This file initializes the Supabase client used across the portfolio.
 *
 * ── SETUP ─────────────────────────────────────────────────────────────
 * 1. Create a free project at https://supabase.com
 * 2. In your project dashboard go to:
 *      Project Settings → API
 * 3. Copy the "Project URL" and the "anon public" key.
 * 4. Create a `.env` file in this folder with:
 *
 *      VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
 *      VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
 *
 *    (For plain static hosting without a bundler, you can instead paste
 *     the values directly into the placeholders below. Do NOT commit
 *     real keys to GitHub if the anon key is restricted — see README.)
 *
 * 5. Run the SQL in `supabase/schema.sql` once in the Supabase SQL editor.
 * ────────────────────────────────────────────────────────────────────────
 */

const SUPABASE_URL = window.SUPABASE_URL || "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";

/**
 * A tiny, dependency-free Supabase client.
 * Only implements the REST calls this site needs (insert rows).
 *
 * If you prefer the official client, install it instead:
 *   npm install @supabase/supabase-js
 *   const { createClient } = require("@supabase/supabase-js")
 *   const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
 */
const supabaseClient = {
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
  initialized: Boolean(
    SUPABASE_URL &&
    SUPABASE_URL !== "YOUR_SUPABASE_URL" &&
    SUPABASE_ANON_KEY &&
    SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
  ),

  /**
   * Insert a row into a table.
   * @param {string} table - Table name, e.g. "contact_messages"
   * @param {object} payload - Row data
   * @returns {Promise<{data: object|null, error: object|null}>}
   */
  async insert(table, payload) {
    if (!this.initialized) {
      console.warn(
        "[Supabase] Not configured. Add your URL and anon key in supabase-config.js"
      );
      return { data: null, error: { message: "Supabase is not configured." } };
    }

    const response = await fetch(`${this.url}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        apikey: this.anonKey,
        Authorization: `Bearer ${this.anonKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const message = await response.text();
      return { data: null, error: { message } };
    }

    return { data: true, error: null };
  }
};

window.supabaseClient = supabaseClient;

