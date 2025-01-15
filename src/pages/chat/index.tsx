'use client';

import { useState } from 'react';
import axios from 'axios';
import Header from '@/components/chat/Header';
import ChatInitializer from '@/components/chat/ChatInitializer';
import ChatDialog from '@/components/chat/ChatDialog';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});


export default function ChatApp() {
  const [chatStarted, setChatStarted] = useState(false)
  const [messages, setMessages] = useState<Array<{ id: string; user: string; timestamp: Date; content: string }>>([])

  const startChat = async (initialMessage: string) => {
    setChatStarted(true)
    await sendMessage(initialMessage);
  }

  const addMessage = (user: string, content: string) => {
    setMessages(prevMessages => [...prevMessages, { id: Date.now().toString(), user, timestamp: new Date(), content }])
  }

  const sendMessage = async (message) => {
    addMessage('User', message)
    const response = await axios.post('/api/chat', { prompt: message });
    addMessage('AI', response.data.message);
  }

  return (
    <div
      className={`chat-wrapper flex flex-col h-full ${spaceGrotesk.variable}`}
    >
      <div className="chat-dialog-background-wrapper">
        <div className="circle-container">
          <div className="circle" id="circle1"></div>
          <div className="circle" id="circle2"></div>
          <div className="circle" id="circle3"></div>
        </div>
      </div>
      <main className="chat-main flex-grow overflow-hidden">
        {!chatStarted ? (
          <ChatInitializer onStart={startChat}/>
        ) : (
          <ChatDialog messages={messages} onSendMessage={(message) => {
            sendMessage(message)
          }}/>
        )}
      </main>
    </div>
  )
}
