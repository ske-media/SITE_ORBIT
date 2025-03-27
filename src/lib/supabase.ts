import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://maimdijbhthacjtrbxgm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1haW1kaWpiaHRoYWNqdHJieGdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzNjAzMDUsImV4cCI6MjA1MzkzNjMwNX0.iz-xQKxzWPT0yO3shBAYeOknw4UApBrFt9CxIZRr3tQ';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});