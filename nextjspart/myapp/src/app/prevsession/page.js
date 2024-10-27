'use client'

import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { numConv } from '../accessFirebase'
export default function VerticalColorfulLinks() {
  const links = []
  const initlinks = async () => {
    //const num = await numConv()
    const num = 3
    for (let i = 1; i <= num; i++) {
      links.push(i)
    }
  }

  useEffect(() => {
    initlinks()
  }, [])

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
  )
}