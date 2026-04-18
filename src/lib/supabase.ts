import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txavfwglrtwbvatolftz.supabase.co').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4YXZmd2dscnR3YnZhdG9sZnR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0Njc4MjQsImV4cCI6MjA5MjA0MzgyNH0.4qgHUEhkPDafkfnLEsmelc9JIe4LrbdtuF40-l6YJEs').trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
