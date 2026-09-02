import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://zmlbijflvrukttlrfhlo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptbGJpamZsdnJ1a3R0bHJmaGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzODg1NzEsImV4cCI6MjEwMDk2NDU3MX0.YXMDV-vgBL37ZDCitUBqxVcv5uR-1HFCV7FP-kInbA0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getFromSupabase<T>(key: string, fallback: T): Promise<T> {
  try {
    const { data, error } = await supabase
      .from("portfolio_content")
      .select("data")
      .eq("key", key)
      .single();

    if (error || !data || !data.data) {
      return fallback;
    }

    if (typeof fallback === "object" && fallback !== null && !Array.isArray(fallback)) {
      return { ...fallback, ...data.data };
    }
    return data.data as T;
  } catch {
    return fallback;
  }
}

export async function saveToSupabase<T>(key: string, data: T): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("portfolio_content")
      .upsert({ key, data, updated_at: new Date().toISOString() });

    if (error) {
      console.warn("Supabase upsert error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Supabase save exception:", err);
    return false;
  }
}
