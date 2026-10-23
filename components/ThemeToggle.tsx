'use client'

import React from 'react'
import { useTheme } from './ThemeProvider'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className={`h-9 w-9 p-0 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors shadow-sm ${className || ''}`}
      title={theme === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-all hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-700 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
