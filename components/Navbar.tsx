"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      // Track active section
      const sections = ["skills", "experience", "projects", "education", "contact"]
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    setIsOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = element.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top: offset, behavior: "smooth" })
    }
  }, [])

  const navItems = [
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <nav className="top-banner fixed top-0 left-0 right-0 z-50 h-14">
      <div className="container mx-auto px-6 md:px-8 max-w-5xl h-full flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link href="/">
            <Button variant="ghost" className="nav-link h-8 px-3">
              Home
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="ghost" className="nav-link h-8 px-3">
              Blog
            </Button>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`nav-link h-8 px-3 ${activeSection === item.id ? "active" : ""}`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden nav-link h-8 w-8 p-0">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full full-screen-sidebar bg-background border-l border-border p-0">
              <nav className="flex flex-col h-full">
                <SheetClose className="absolute right-4 top-4 brutal-button p-2">
                  <X className="h-5 w-5" />
                </SheetClose>
                <div className="flex-grow flex flex-col items-center justify-center gap-4">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className="brutal-button text-sm px-8 py-4 font-sans"
                      onClick={() => scrollToSection(item.id)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
