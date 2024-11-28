
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    'https://qdwxxmgubxanttuhzfdl.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkd3h4bWd1YnhhbnR0dWh6ZmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2OTExMjcsImV4cCI6MjA0ODI2NzEyN30.nDiIUFK5vEtYoM7jViVL_r1h2RGNKLdTz-fNvGpTMeg',
  );
