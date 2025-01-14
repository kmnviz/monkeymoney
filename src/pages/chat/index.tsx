'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/chat/Header';
import ChatInitializer from '@/components/chat/ChatInitializer';
import ChatDialog from '@/components/chat/ChatDialog';

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
    const response = await axios.post('/api/chat', { prompt: message});
    addMessage('AI', response.data.message);
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title="AI Chat Assistant" />
      <main className="flex-grow overflow-hidden">
        {!chatStarted ? (
          <ChatInitializer onStart={startChat} />
        ) : (
          <ChatDialog messages={messages} onSendMessage={(message) => {
            sendMessage(message)
          }} />
        )}
      </main>
    </div>
  )
}
