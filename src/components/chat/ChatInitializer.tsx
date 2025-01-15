import { useState } from 'react'
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

const predefinedQuestions = [
  "When is the next match Dundee vs Rangers?",
  "What odd can you suggest for Aberdeen vs St. Mirren?",
  "What league is Celtic playing in?",
  "What is the probability Ross County vs Hibernian to end 3-3 Draw?"
]

export default function ChatInitializer({ onStart }: { onStart: (message: string) => void }) {
  const [input, setInput] = useState('')

  return (
    <div
      className="chat-initializer-wrapper flex flex-col items-center justify-center h-full p-4 relative"
    >
      <h1 className="chat-initializer-title mb-8">Let me help you bet</h1>
      <Textarea
        type="text"
        placeholder="Ask me something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full max-w-2xl h-32"
      />
      <div className="w-full max-w-2xl relative">
        <Button
          onClick={() => onStart(input)}
          className="chat-initializer-start-button"
        >
          Start
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mt-8">
        {predefinedQuestions.map((question, index) => (
          <Button key={index} onClick={() => onStart(question)} variant="outline">
            {question}
          </Button>
        ))}
      </div>
    </div>
  )
}
