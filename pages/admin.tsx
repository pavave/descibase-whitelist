import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Head from 'next/head';

type Entry = {
  id: string;
  email: string;
  wallet_address: string;
  comment: string;
  created_at: string;
};

export default function Admin() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('whitelist').select('*').order('created_at', { ascending: false });
      if (data) setEntries(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Whitelist Admin</title>
      </Head>
      <main style={{ padding: '2rem' }}>
        <h1>📋 Whitelist Entries</h1>
        <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Wallet</th>
              <th>Comment</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id}>
                <td>{entry.email}</td>
                <td>{entry.wallet_address}</td>
                <td>{entry.comment}</td>
                <td>{new Date(entry.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
