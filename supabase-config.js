/**
 * Supabase Configuration
 * ========================
 * This file initializes the Supabase client used across the portfolio.
 *
 * ── SETUP ─────────────────────────────────────────────────────────────
 * 1. Create a free project at https://supabase.com
 * 2. In your project dashboard go to:
 *      Project Settings → API
 * 3. Copy the "Project URL" and the "publishable / anon public" key.
 * 4. Paste the values into the placeholders below.
 *
 *    NEVER place your SECRET (sb_secret_...) or service_role key here.
 *    The publishable key is safe for the browser because Row Level
 *    Security (RLS) restricts anonymous users to INSERT only.
 *
 * 5. Run the SQL in `supabase/schema.sql` once in the Supabase SQL editor.
 * ────────────────────────────────────────────────────────────────────────
 */

const SUPABASE_URL =
  window.SUPABASE_URL || "https://podpvbdktpkroklgunwb.supabase.co";
const SUPABASE_ANON_KEY =
  window.SUPABASE_ANON_KEY ||
  "sb_publishable_WM1gvvuz4MVTBzXPXHW75g_pV-PGEDn";

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
        "[Supabase] Not configured. Add your URL and publishable key in supabase-config.js"
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

