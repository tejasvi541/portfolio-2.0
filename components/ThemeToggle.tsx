"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  // Default state matches what the server renders (light, no class). The
  // blocking inline script in the root layout already applied a saved
  // "dark" class to <html> before paint if needed; this effect just syncs
  // this component's own icon to that same source of truth.
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="nav-link h-8 w-8 p-0">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
