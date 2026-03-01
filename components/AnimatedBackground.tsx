"use client"

import { useEffect, useRef, useCallback } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; speed: number }>>([])
  const scrollY = useRef(0)
  const mouse = useRef({ x: -1000, y: -1000 })
  const raf = useRef<number>(0)

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const count = Math.min(Math.floor((canvas.width * canvas.height) / 18000), 80)
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
    }))
  }, [])

  useEffect(() => {
    init()

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const handleScroll = () => { scrollY.current = window.scrollY }
    const handleMouse = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY } }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouse, { passive: true })

    const style = getComputedStyle(document.documentElement)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const primaryColor = style.getPropertyValue("--primary").trim()
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = maxScroll > 0 ? scrollY.current / maxScroll : 0

      const pts = particles.current
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]

        // Scroll-reactive parallax offset
        const parallax = scrollProgress * p.speed * 120

        // Mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = (p.y - parallax % canvas.height) - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.8
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }

        p.vx *= 0.97
        p.vy *= 0.97
        p.x += p.vx
        p.y += p.vy

        // Wrap around
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const drawY = ((p.y - parallax) % canvas.height + canvas.height) % canvas.height

        ctx.beginPath()
        ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${primaryColor} / ${p.alpha})`
        ctx.fill()

        // Connection lines
        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j]
          const drawY2 = ((p2.y - parallax) % canvas.height + canvas.height) % canvas.height
          const ldx = p.x - p2.x
          const ldy = drawY - drawY2
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy)
          if (ldist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, drawY)
            ctx.lineTo(p2.x, drawY2)
            ctx.strokeStyle = `hsl(${primaryColor} / ${(1 - ldist / 120) * 0.06})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      raf.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouse)
    }
  }, [init])

  return (
    <div className="animated-bg" aria-hidden="true">
      <div className="noise" />
      <div className="grid-layer" />
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="glow glow-3" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />
    </div>
  )
}
