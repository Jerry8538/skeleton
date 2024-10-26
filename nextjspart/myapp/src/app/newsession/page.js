import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NewSession() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start px-4 py-8">
      {/* Header */}
      <div className="w-full max-w-md bg-indigo-400 rounded-full mb-12">
        <div className="flex items-center justify-between px-6 py-3">
          <Link href="/" className="text-white hover:text-gray-200">
            <Home size={24} />
            <span className="sr-only">Home</span>
          </Link>
          <span className="text-white text-lg font-semibold">Begin your new Session</span>
          <div className="w-6"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Abstract face */}
      <div className="relative w-40 h-40 mb-8">
        <div className="absolute top-0 left-0 w-16 h-16 bg-green-400 rounded-full"></div>
        <div className="absolute top-0 right-0 w-16 h-16 bg-orange-400 rounded-tr-full"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-green-400 rounded-b-full"></div>
      </div>

      {/* Feel free to type section */}
      <p className="text-white text-xl mb-4">Feel free to type what you are feeling</p>
      <Link 
        href="/chatbot" 
        className="bg-teal-500 text-white font-semibold py-2 px-8 rounded-full text-lg mb-12 hover:bg-teal-600 transition-colors"
      >
        chatbot
      </Link>

      {/* Record what you want to say section */}
      <p className="text-white text-xl mb-4">Record what you want to say</p>
      <Link 
        href="/upload" 
        className="bg-purple-500 text-white font-semibold py-2 px-8 rounded-full text-lg hover:bg-purple-600 transition-colors"
      >
        Upload
      </Link>
    </div>
  )
}