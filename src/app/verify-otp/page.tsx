'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyOtpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get('email') || '';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error || 'Verification failed');
    }
  };

  const handleResend = async () => {
    setError('');
    await fetch('/api/auth/resend-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    setResent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-2 text-center">Verify your email</h1>
        <p className="text-center text-sm text-gray-600 mb-6">We sent a 6-digit code to <span className="font-semibold">{email}</span></p>
        {error && <p className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>}
        {resent && <p className="bg-green-50 text-green-700 p-3 rounded mb-4 text-sm">New code sent!</p>}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Verification Code</label>
          <input type="text" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} required className="w-full p-3 border rounded-lg text-center text-2xl tracking-widest" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Verify</button>
        <button type="button" onClick={handleResend} className="w-full mt-3 text-blue-600 text-sm font-semibold">Resend code</button>
      </form>
    </div>
  );
}

export default function VerifyOtp() {
  return (
    <Suspense>
      <VerifyOtpForm />
    </Suspense>
  );
}
