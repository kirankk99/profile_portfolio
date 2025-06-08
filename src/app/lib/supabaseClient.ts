
// /lib/supabaseClient.ts
'use client'; // Required for client-side Supabase

import { createBrowserClient } from '@supabase/ssr';

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // export const getServerSideProps = async (ctx) => {
  //   const supabase = createServerClient(ctx.req, ctx.res);
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  
  //   if (!user) {
  //     return { redirect: { destination: '/login', permanent: false } };
  //   }
  
  //   return { props: { user } };
  // };
  