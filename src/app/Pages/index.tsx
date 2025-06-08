'use client'; // Needed if you're using Next.js App Router

import { useEffect, useState } from 'react';
import { createClient } from '@/app/lib/supabaseClient';

export default function Home() {
  const [fields, setFields] = useState<any[]>([]);
  const supabase = createClient(); // ✅ create browser supabase client

  useEffect(() => {
    const fetchFields = async () => {
      const { data, error } = await supabase.from('custom_fields').select('*');
      if (error) {
        console.error('Error fetching fields:', error.message);
      } else {
        setFields(data || []);
      }
    };

    fetchFields();
  }, [supabase]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">My Portfolio</h1>
      <div className="mt-4 space-y-2">
        {fields.map((field) => (
          <div key={field.id} className="border p-2 rounded">
            <strong>{field.key}:</strong> {field.value}
          </div>
        ))}
      </div>
    </main>
  );
}
