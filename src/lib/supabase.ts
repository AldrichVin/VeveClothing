import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://gysdbzolqcirvcouqdui.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5c2Riem9scWNpcnZjb3VxZHVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MDg0ODMsImV4cCI6MjA4NzE4NDQ4M30.X-b8V3oCuZvJzvDEJzr01b0bIfNXB17sYhE72tHv6wc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
export const isSupabaseConfigured = true
