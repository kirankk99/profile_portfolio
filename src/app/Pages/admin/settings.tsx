import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabaseClient';
import { createClient } from '@/app/lib/supabaseClient';


interface Field {
  id: string;
  key: string;
  type: string;
  value: string;
}

export default function Settings() {
  const [fields, setFields] = useState<Field[]>([]);
  const supabase = createClient(); // ✅ create browser supabase client
  const [newField, setNewField] = useState({ key: '', type: 'text', value: '' });

  useEffect(() => {
    const fetchFields = async () => {
      const { data } = await supabase.from('custom_fields').select('*');
      setFields(data || []);
    };
    fetchFields();
  }, []);

  const handleAdd = async () => {
    const { data, error } = await supabase.from('custom_fields').insert([newField]);
    if (!error && data) {
      setFields((prev) => [...prev, data[0]]);
      setNewField({ key: '', type: 'text', value: '' });
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Admin Settings</h1>
      <div className="mt-4">
        <input
          className="border p-2 mr-2"
          placeholder="Key"
          value={newField.key}
          onChange={(e) => setNewField({ ...newField, key: e.target.value })}
        />
        <select
          className="border p-2 mr-2"
          value={newField.type}
          onChange={(e) => setNewField({ ...newField, type: e.target.value })}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="note">Note</option>
        </select>
        <input
          className="border p-2 mr-2"
          placeholder="Value"
          value={newField.value}
          onChange={(e) => setNewField({ ...newField, value: e.target.value })}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {fields.map((field) => (
          <div key={field.id} className="border p-2 rounded">
            <strong>{field.key}</strong> ({field.type}): {field.value}
          </div>
        ))}
      </div>
    </main>
  );
}
