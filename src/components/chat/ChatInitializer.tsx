import { useState } from 'react'
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const predefinedQuestions = [
  "When is the next match Celtic vs Dundee?",
  "What is the odd for 2-1 correct score?",
  "What league is Celtic vs Dundee playing in?",
  "What is the probability ot 2-1 correct score?"
]

export default function ChatInitializer({ onStart }: { onStart: (message: string) => void }) {
  const [input, setInput] = useState('')

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <Input
        type="text"
        placeholder="Type your question here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full max-w-2xl mb-4"
      />
      <Button onClick={() => onStart(input)} className="mb-8">Start Chat</Button>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {predefinedQuestions.map((question, index) => (
          <Button key={index} onClick={() => onStart(question)} variant="outline">
            {question}
          </Button>
        ))}
      </div>
    </div>
  )
}
