import { createClient } from '@supabase/supabase-js';

const supabaseURL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const envReady = Boolean(supabaseURL && supabaseAnonKey);

export const supabase = createClient(supabaseURL ?? '', supabaseAnonKey?? '');