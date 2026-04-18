import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

// Protection contre le crash au build si les variables sont absentes
if (typeof window !== "undefined" && (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder'))) {
    console.warn("⚠️ Supabase URL ou Anon Key manquante ou incorrecte.");
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder-usp.supabase.co',
    supabaseAnonKey || 'placeholder'
);
