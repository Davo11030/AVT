import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = 'https://qdwxxmgubxanttuhzfdl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkd3h4bWd1YnhhbnR0dWh6ZmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2OTExMjcsImV4cCI6MjA0ODI2NzEyN30.nDiIUFK5vEtYoM7jViVL_r1h2RGNKLdTz-fNvGpTMeg';

// Crea el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);  // Asegúrate de exportar la instancia
