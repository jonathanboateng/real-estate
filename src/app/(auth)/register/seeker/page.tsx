'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterSeeker() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'SEEKER', phone: '', gender: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      router.push(`/verify-otp?email=${encodeURIComponent(form.email)}`);
    } else {
      const data = await res.json();
      setError(data.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-6 text-center">Find a Home</h1>
        {error && <p className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="w-full p-3 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="w-full p-3 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Phone Number</label>
          <input type="text" placeholder="0241234567" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required className="w-full p-3 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Gender</label>
          <select value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} required className="w-full p-3 border rounded-lg">
            <option value="">Select</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required className="w-full p-3 border rounded-lg" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Register</button>
        <p className="text-center text-sm mt-4 text-gray-600">Already have an account? <Link href="/login" className="text-blue-600 font-bold">Login</Link></p>
      </form>
    </div>
  );
}
