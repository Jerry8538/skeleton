'use client'

import { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'
import { addData, getData, resetData } from './accessFirebase'

export default function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    //resetData() // this removes everything and sets count to 0
    addData(inputMessage) // list of prev messages
    const messages = getData() // this returns a list, use this wherever
    console.log(messages)

    setMessages(prevMessages => [...prevMessages, { role: 'user', content: inputMessage }])
    setInputMessage('')

    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'This is a simulated AI response.' }])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          AI Chatbot
        </h1>
      </header>
      <div className="flex-grow mb-4 mx-4 mt-4 p-4 overflow-auto bg-gray-800 border border-gray-700 rounded-lg">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start max-w-[70%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' ? 'bg-purple-500' : 'bg-blue-500'
              }`}>
                {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`mx-2 p-3 rounded-lg ${
                message.role === 'user' ? 'bg-purple-600' : 'bg-blue-600'
              }`}>
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-gray-800">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-md">
          <Send size={18} />
          <span className="sr-only">Send</span>
        </button>
      </form>
    </div>
  )
}