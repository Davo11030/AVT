import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export const createClient = () => {
  // Verifica que las variables de entorno estén definidas
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or Anon Key in environment variables');
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};
