'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchFilter() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (location) query.append('location', location);
    if (type) query.append('type', type);
    router.push(`/?${query.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-3 w-full max-w-4xl mx-auto -mt-10 relative z-10 border border-gray-100">
      <input 
        type="text" 
        placeholder="Location (e.g., Sunyani, East Legon, Kumasi)" 
        className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <select 
        className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Any Type</option>
        <option value="RENT">For Rent</option>
        <option value="BUY">For Sale</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
        Search
      </button>
    </form>
  );
}
