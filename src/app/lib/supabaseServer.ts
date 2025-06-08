// supabaseServer.ts
import { createServerClient } from "@supabase/ssr";
import { cookies as getCookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await getCookies(); // ✅ FIX: Await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet:any) {
          try {
            cookiesToSet.forEach(({ name, value, options }:any) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Safe to ignore in Server Components or if using middleware for session refresh
          }
        },
      },
    }
  );
};
