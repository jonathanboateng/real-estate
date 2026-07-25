'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProperty() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '', description: '', price: '', location: '', type: 'RENT', bedrooms: '1', bathrooms: '1', images: '', localTags: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price),
      bedrooms: parseInt(form.bedrooms),
      bathrooms: parseInt(form.bathrooms),
      images: form.images ? form.images.split(',').map(s => s.trim()) : [],
      localTags: form.localTags ? form.localTags.split(',').map(s => s.trim()) : ['Efie a ne boɔ nyɛ den']
    };

    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      setError('Failed to create property');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto border">
        <h1 className="text-2xl font-bold mb-6">Add New Listing</h1>
        {error && <p className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input type="text" placeholder="e.g., 2 Bedroom Chamber and Hall in Sunyani" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="w-full p-3 border rounded-lg" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Price (GHS)</label>
            <input type="number" placeholder="1500" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Location</label>
            <input type="text" placeholder="Sunyani, Estate" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required className="w-full p-3 border rounded-lg" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Type</label>
            <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full p-3 border rounded-lg bg-white">
              <option value="RENT">Rent</option>
              <option value="BUY">Buy</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Bedrooms</label>
            <input type="number" value={form.bedrooms} onChange={e => setForm({...form, bedrooms: e.target.value})} className="w-full p-3 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Bathrooms</label>
            <input type="number" value={form.bathrooms} onChange={e => setForm({...form, bathrooms: e.target.value})} className="w-full p-3 border rounded-lg" />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Local Tags (comma-separated)</label>
          <input type="text" placeholder="Efie a ne boɔ nyɛ den, Shia mlɛo" value={form.localTags} onChange={e => setForm({...form, localTags: e.target.value})} className="w-full p-3 border rounded-lg" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Image URLs (comma-separated links)</label>
          <input type="text" placeholder="https://images.unsplash.com/photo-..., https://..." value={form.images} onChange={e => setForm({...form, images: e.target.value})} className="w-full p-3 border rounded-lg" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Description & Rules</label>
          <textarea rows={4} placeholder="Describe the property, water flow status, prepaid meter, etc." value={form.description} onChange={e => setForm({...form, description: e.target.value})} required className="w-full p-3 border rounded-lg"></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Publish Listing</button>
      </form>
    </div>
  );
}
