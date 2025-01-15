import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
  className?: string
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const baseStyles = 'chat-button px-4 py-2 rounded-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
  const variantStyles = {
    primary: 'chat-button-primary',
    outline: 'chat-button-secondary'
  }

  console.log('className: ', className);

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    />
  )
}
