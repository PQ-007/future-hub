"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"        // Use class strategy to toggle 'dark' class
      defaultTheme="dark"      // Start with dark theme by default
      enableSystem={false}     // Disable OS-based theme switching
    >
      {children}
    </NextThemesProvider>
  )
}
