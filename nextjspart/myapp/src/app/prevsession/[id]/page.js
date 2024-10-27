'use client'

import React from 'react';
import {useParams} from 'next/navigation'


export default function Dashboard() {
    const { id } = useParams()
    console.log(id)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-gray-800 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">Session Dashboard</h1>
      </header>
      <div className="flex mt-4">
        <div className="bg-gray-500 flex-1 m-2 p-4 rounded-lg shadow-lg">
          <h2 className="font-semibold">Polarity</h2>
          <p>See how the sentiment of the user changes over the whole interaction</p>
          <div className="mt-4">
            <div className="flex justify-center space-x-4">
              chart 2
            </div>
          </div>
        </div>
        <div className="bg-gray-500 flex-1 m-2 p-4 rounded-lg shadow-lg">
          <h2 className="font-semibold">Header</h2>
          <p>Subhead</p>
          <div className="mt-4">
            <div className="flex justify-center space-x-4">
              chart 1
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-400 mt-4 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Summary Title {id}</h3>
        <p>Summary</p>
      </div>
    </div>
  );
}