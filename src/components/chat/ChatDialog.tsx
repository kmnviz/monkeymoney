import { useRef, useEffect } from 'react';
import Message from '@/components/chat/Message';
import MessageInput from '@/components/chat/MessageInput';

interface ChatDialogProps {
  messages: Array<{ id: string; user: string; timestamp: Date; content: string }>
  onSendMessage: (message: string) => void
}

export default function ChatDialog({ messages, onSendMessage }: ChatDialogProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    console.log('on message: ', messages);
  }, [messages]);

  return (
    <div className="chat-dialog-wrapper flex flex-col h-full">
      <div className="chat-dialog-background-wrapper">
        <div className="circle-container">
          <div className="circle" id="circle1"></div>
          <div className="circle" id="circle2"></div>
          <div className="circle" id="circle3"></div>
        </div>
      </div>
      <div className="chat-dialog-content-wrapper flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
        <div ref={messagesEndRef}/>
      </div>
      <MessageInput onSendMessage={onSendMessage}/>
    </div>
  )
}
