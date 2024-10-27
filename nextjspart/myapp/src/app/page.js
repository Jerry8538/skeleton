'use client'
import Link from 'next/link'
//import MyChart from './compos/overall'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          Happiness is your right!!
        </h1>
      </div>
      <br></br>
      <br></br>
      {/* Abstract circles */}
      <div className="absolute top-8 right-8 w-16 h-16 bg-white rounded-full opacity-80"></div>
      <div className="absolute top-4 right-28 w-8 h-8 bg-white rounded-full opacity-80"></div>
      <div className="text-center z-10">
        <center>
          <div className="relative w-40 h-40 mb-8">
            <div className="absolute top-0 left-0 w-16 h-16 bg-green-400 rounded-full"></div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-400 rounded-tr-full"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-green-400 rounded-b-full"></div>
          </div>
        </center>
        <br></br>
        <br></br>
        <Link href="/progress" className="inline-block bg-teal-500 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-teal-600 transition-colors">
          Check your Progress &#128513;
        </Link>
        <div className="mb-4"></div>
        <Link href="/prevsession" className="inline-block bg-green-500 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition-colors">
          Check previous sessions &#x21ba;
          </Link>
          <div className="mb-4"></div>
        <Link href="/chatbot" className="inline-block bg-purple-500 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-purple-600 transition-colors">
          Start a new session! &#x21d2;
        </Link>  
        <p> {"\n"} </p>
      </div>
    </main>
  )
}
