'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-cyan-400 text-navy-900 hover:bg-cyan-300 shadow-lg shadow-cyan-400/25 hover:shadow-cyan-300/40',
  secondary: 'bg-navy-900 text-white hover:bg-navy-800',
  ghost: 'bg-transparent text-navy-900 hover:bg-navy-900/5',
  outline: 'bg-transparent text-navy-900 border-2 border-navy-900 hover:bg-navy-900 hover:text-white',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-full
        transition-all duration-300 ease-out
        transform hover:scale-[1.02] active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

