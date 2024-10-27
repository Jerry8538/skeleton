
'use client'

import { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'
import Navbar from '../compos/navbar.js'
import { useEffect } from 'react'
import { addConversation, addMessage, getOutput, endConv } from '../accessFirebase.js'
import { useRouter } from 'next/navigation'


let flag=1 // so that the conversation doesn't get added multiple times
export default function ChatInterface() {
  const question_list = [
    "Can you describe situations that make you feel anxious or worried? What thoughts typically accompany those feelings?",
    "How do you feel about your current job or career path? Are there specific aspects that cause you stress or uncertainty?",
    "Can you share your thoughts and feelings when you experience sadness or hopelessness? What triggers these emotions for you?",
    "How do you feel about your eating habits and body image? Can you talk about any recent changes in your appetite or eating patterns?",
    "What concerns do you have about your health? Can you describe any specific thoughts or fears that come to mind regarding your physical well-being?",
    "Can you discuss your sleep patterns recently? What challenges do you face when trying to fall asleep or stay asleep?",
    "What aspects of your life bring you joy or hope? Can you share any recent experiences that made you feel positive or grateful?",
    "What are the main sources of stress in your life right now? How do you typically cope with these stressors?",
    "Have there been moments when you've felt overwhelmed to the point of considering self-harm or feeling that life is not worth living? What led to those feelings, and how did you cope with them?"
  ]
  const [messages, setMessages] = useState([{ role: 'assistant', content: question_list[0] }])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(1)

  
  if (flag === 1){
    addConversation()
    flag=0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    // Add user's message to the chat
    setMessages(prevMessages => [...prevMessages, { role: 'user', content: inputMessage }])
    setInputMessage('')
    setLoading(true)
    
    try {
      console.log(inputMessage)
      console.log(messages)
      await addMessage(inputMessage)
      setCount(count + 1)
      console.log(count)
      // Add the assistant's response to the chat
      if(count <= 9){
        var contentdisplayed = question_list[count]
      }
      else{contentdisplayed = getOutput()}
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: contentdisplayed }])
    } catch (error) {
      console.error('Error fetching AI response:', error)
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: 'Failed to fetch response.' }])
    } finally {
      setLoading(false)
    }
  }

  const router = useRouter()

  const endSession = async (e) => {
    e.preventDefault()
    try {
      // End the session
      console.log("Session Ended")
      await endConv()
      router.push('/')
    } catch (error) {
      console.error('Error ending session:', error)
    }
  }
  return (
    <>
      
      <div className="flex flex-col h-screen bg-gray-900 text-gray-100"> 
        
        <header className="bg-gray-800 p-4 text-right">
        <Navbar />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            <center>Ongoing Session</center> 
          </h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600" onClick={endSession}>
            End Session
    </button>
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
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="flex items-start max-w-[70%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500">
                  <Bot size={16} />
                </div>
                <div className="mx-2 p-3 rounded-lg bg-blue-600">
                  Typing...
                </div>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-gray-800">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow bg-gray-700 text-gray-100 border border-gray-600 rounded-md p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button type="submit" disabled = {loading} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-md">
            <Send size={18} />
            <span className="sr-only">Send</span>
          </button>
        </form>  
      </div>
    </>
  ) 
}