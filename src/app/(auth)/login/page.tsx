'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [needsVerify, setNeedsVerify] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNeedsVerify(false);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error === 'EmailNotVerified') {
      setError('Please verify your email first.');
      setNeedsVerify(true);
    } else if (res?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to EfieDirect</h1>
        {error && (
          <p className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
            {error}{' '}
            {needsVerify && (
              <Link href={`/verify-otp?email=${encodeURIComponent(email)}`} className="underline font-semibold">
                Verify now
              </Link>
            )}
          </p>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 border rounded-lg" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 border rounded-lg" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Login</button>
        <p className="text-center text-sm mt-4 text-gray-600">Do not have an account? <Link href="/register" className="text-blue-600 font-bold">Register</Link></p>
      </form>
    </div>
  );
}
