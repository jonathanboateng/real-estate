'use client';
import Link from 'next/link';

export default function RegisterChoice() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border text-center">
        <h1 className="text-2xl font-bold mb-2">Join EfieDirect</h1>
        <p className="text-gray-600 mb-8">Tell us why you are here</p>
        <div className="space-y-4">
          <Link href="/register/seeker" className="block w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700">
            I am looking for a home
          </Link>
          <Link href="/register/owner" className="block w-full bg-gray-800 text-white py-4 rounded-lg font-bold hover:bg-gray-900">
            I have a home to list
          </Link>
        </div>
        <p className="text-center text-sm mt-6 text-gray-600">Already have an account? <Link href="/login" className="text-blue-600 font-bold">Login</Link></p>
      </div>
    </div>
  );
}
