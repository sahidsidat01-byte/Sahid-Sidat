import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Storage keys for user-configured credentials in preview
const STORAGE_URL_KEY = 'jessa_supabase_url';
const STORAGE_KEY_KEY = 'jessa_supabase_anon_key';

// Read from env or localStorage
export function getSupabaseCredentials() {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

  const storedUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_URL_KEY) : null;
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_KEY) : null;

  const url = storedUrl || envUrl || '';
  const key = storedKey || envKey || '';

  const isConfigured = Boolean(url && key && !url.includes('your-project-id') && url.startsWith('http'));

  return { url, key, isConfigured };
}

export function saveSupabaseCredentials(url: string, key: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_URL_KEY, url.trim());
    localStorage.setItem(STORAGE_KEY_KEY, key.trim());
  }
}

export function clearSupabaseCredentials() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_URL_KEY);
    localStorage.removeItem(STORAGE_KEY_KEY);
  }
}

let supabaseInstance: SupabaseClient<any> | null = null;

export function getSupabaseClient(): SupabaseClient<any> | null {
  const { url, key, isConfigured } = getSupabaseCredentials();

  if (!isConfigured) {
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return supabaseInstance;
}

// Reset instance when credentials change
export function resetSupabaseClient() {
  supabaseInstance = null;
  return getSupabaseClient();
}

// Quick health check to test if Supabase credentials can connect
export async function testSupabaseConnection(testUrl?: string, testKey?: string): Promise<{ success: boolean; message: string }> {
  try {
    const { url, key } = testUrl && testKey 
      ? { url: testUrl, key: testKey } 
      : getSupabaseCredentials();

    if (!url || !key || url.includes('your-project-id')) {
      return { success: false, message: 'Supabase URL or Anon Key is missing or invalid.' };
    }

    const testClient = createClient(url, key);
    // Ping public table or auth
    const { error } = await testClient.from('appointments').select('id').limit(1);

    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist yet, we still know the API credentials worked
      if (error.message.includes('relation "appointments" does not exist') || error.code === '42P01') {
        return { 
          success: true, 
          message: 'Connected to Supabase! Note: Database tables need to be created using the provided SQL schema script.' 
        };
      }
      return { success: false, message: error.message };
    }

    return { success: true, message: 'Successfully connected to Supabase backend!' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Connection failed.' };
  }
}
