"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Twitter, FileText, Linkedin } from "lucide-react"

const titles = ["Full Stack Engineer", "AI/ML Engineer", "Distributed Systems"]

export default function Header() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayedTitle, setDisplayedTitle] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    const currentTitle = titles[titleIndex]

    if (isDeleting) {
      if (displayedTitle === "") {
        setIsDeleting(false)
        setTitleIndex((prev) => (prev + 1) % titles.length)
      } else {
        timer = setTimeout(() => {
          setDisplayedTitle(currentTitle.substring(0, displayedTitle.length - 1))
        }, 30)
      }
    } else {
      if (displayedTitle === currentTitle) {
        timer = setTimeout(() => setIsDeleting(true), 3000)
      } else {
        timer = setTimeout(() => {
          setDisplayedTitle(currentTitle.substring(0, displayedTitle.length + 1))
        }, 70)
      }
    }

    return () => clearTimeout(timer)
  }, [titleIndex, displayedTitle, isDeleting])

  const links = [
    { href: "https://github.com/tejasvi541", icon: Github, label: "GitHub" },
    { href: "https://x.com/weinsimulation", icon: Twitter, label: "X" },
    { href: "https://linkedin.com/in/t3jasvi", icon: Linkedin, label: "LinkedIn" },
    {
      href: "/resume.pdf",
      icon: FileText,
      label: "Resume",
    },
  ]

  return (
    <header className="pt-28 pb-16">
      <div className="container mx-auto px-6 md:px-8 max-w-5xl">
        <div className="border border-border overflow-hidden">
          {/* Ribbon-card title bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-background">
            <div className="status-online">Available for work</div>
            <span className="font-mono text-[11px] text-muted-foreground">Toronto, ON</span>
          </div>

          {/* Ribbon-card body */}
          <div className="tint-sage px-6 py-10 md:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              <div>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 uppercase">
                  Tejasvi
                </h1>
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-sans text-sm font-bold">{"> "}</span>
                  <span className="font-sans text-sm font-bold h-5 uppercase">
                    {displayedTitle}
                    <span className="text-primary">|</span>
                  </span>
                </div>
                <p className="font-mono text-sm max-w-lg leading-relaxed">
                  Full-stack engineer building distributed backend systems and
                  ML/AI infrastructure. Currently at Limelight Software in Toronto,
                  shipping OLAP state synchronization and real-time data pipelines.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-button flex items-center gap-2"
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
