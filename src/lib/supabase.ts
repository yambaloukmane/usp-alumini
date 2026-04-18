import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Protection contre le crash au build si les variables sont absentes
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("⚠️ Supabase URL ou Anon Key manquante. Le site ne pourra pas charger de données réelles.");
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);
