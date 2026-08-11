import { Github, Twitter, Linkedin } from "lucide-react"

const links = [
  { href: "https://github.com/tejasvi541", icon: Github, label: "GitHub" },
  { href: "https://x.com/weinsimulation", icon: Twitter, label: "X" },
  { href: "https://linkedin.com/in/t3jasvi", icon: Linkedin, label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="footer-band">
      <div className="container mx-auto px-6 md:px-8 max-w-5xl py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[12px]">&copy; {new Date().getFullYear()} Tejasvi. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] hover:text-primary transition-colors"
              style={{ color: "hsl(var(--link))" }}
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
