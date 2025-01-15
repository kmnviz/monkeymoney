import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full px-4 py-2 text-gray-700 bg-white border rounded-sm focus:outline-none focus:border-transparent ${className}`}
      {...props}
    />
  )
}
