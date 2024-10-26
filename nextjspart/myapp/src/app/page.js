'use client'
import Link from 'next/link'
import MyChart from './compos/mychart'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Abstract circles */}
      <div className="absolute top-8 right-8 w-16 h-16 bg-white rounded-full opacity-80"></div>
      <div className="absolute top-4 right-28 w-8 h-8 bg-white rounded-full opacity-80"></div>
      
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Happiness is your right!!
        </h1>
        
        <p className="text-xl text-white mb-6">
          Let's see your progress
        </p>
        
        <Link href="/progress" className="inline-block bg-teal-500 text-white font-semibold py-3 px-8 rounded-full text-lg mb-12 hover:bg-teal-600 transition-colors">
          Let's go!
        </Link>
        
        <p className="text-xl text-white mb-6">
          Start a new session
        </p>
        
        <Link href="/newsession" className="inline-block bg-purple-500 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-purple-600 transition-colors">
          Alright!
        </Link>  
        <p> {"\n"} </p>
        <MyChart /> 
      </div>
    </main>
  )
}
