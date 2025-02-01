import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL="https://fycbjeyeybxwrgttsuld.supabase.co";
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5Y2JqZXlleWJ4d3JndHRzdWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzOTgzODUsImV4cCI6MjA1Mzk3NDM4NX0.m7IGfMywJGrRBjrxPzvYJkbRQihMr4jAI5tPQ7tVbeo";

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase URL and Key must be defined in environment variables');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;

