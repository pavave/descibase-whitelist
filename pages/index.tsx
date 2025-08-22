import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [wallet, setWallet] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.from('whitelist').insert([{ email, wallet_address: wallet, comment }]);
    if (!error) setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>DeSciBase Whitelist</title>
        <meta name="description" content="Join the whitelist for DeSciBase — decentralized scientific publishing." />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <h1>Whitelist Signup</h1>
        {submitted ? (
          <p>✅ Thank you! You're on the list.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="text" placeholder="Wallet Address" value={wallet} onChange={e => setWallet(e.target.value)} />
            <textarea placeholder="Comment" value={comment} onChange={e => setComment(e.target.value)} />
            <button type="submit">Join</button>
          </form>
        )}
      </main>
    </>
  );
}
