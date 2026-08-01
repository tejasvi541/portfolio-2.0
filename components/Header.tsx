"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Twitter, FileText, Linkedin, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

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
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="pt-28 pb-20 relative z-10"
    >
      <div className="container mx-auto px-6 md:px-8 max-w-5xl">
        <div className="war-card overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-secondary" />

          <div className="flex items-center justify-between mb-10 pb-4 border-b border-border">
            <div className="status-online">Available for work</div>
            <span className="font-mono text-[10px] text-muted-foreground">Toronto, ON</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans mb-5 text-balance">
                Tejasvi
              </h1>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-primary font-mono text-sm font-medium">{"> "}</span>
                <span className="font-mono text-sm text-foreground h-5">
                  {displayedTitle}
                  <span className="text-primary animate-pulse">|</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
                Full-stack engineer building distributed backend systems and
                ML/AI infrastructure. Currently at Limelight Software in Toronto,
                shipping OLAP state synchronization and real-time data pipelines.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-button flex items-center gap-2 group"
                  >
                    <link.icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
