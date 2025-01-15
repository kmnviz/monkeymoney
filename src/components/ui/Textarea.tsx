import React, { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export function Textarea({ className = '', ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-sm focus:outline-none focus:border-transparent ${className}`}
      {...props}
    />
  )
}
