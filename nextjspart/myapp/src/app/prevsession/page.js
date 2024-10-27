'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { numConv } from '../accessFirebase';

export default function VerticalColorfulLinks() {
  const [links, setLinks] = useState([]); // Use state for links to trigger re-render

  const initlinks = async () => {
    const num = await numConv();
    console.log(num);

    // Generate links array based on the number
    const generatedLinks = Array.from({ length: num }, (_, i) => i + 1);
    setLinks(generatedLinks); // Update the state
  };

  useEffect(() => {
    initlinks();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Navigation Links</h1>
        <nav className="space-y-3">
          {links.map((id) => (
            <Link key={id} href={`./prevsession/${id}`} className="block w-full">
              <span className="block w-full py-3 px-6 text-center text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 bg-gray-600 hover:bg-gray-700">
                Session {id}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
