"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface Trail {
  x: number
  y: number
  life: number
  hue: number
}

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const trails = useRef<Trail[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const raf = useRef<number>(0)
  const hueRef = useRef(160) // start at primary hue

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  const animate = useCallback(() => {
    // Smooth follow for ring
    pos.current.x += (target.current.x - pos.current.x) * 0.15
    pos.current.y += (target.current.y - pos.current.y) * 0.15

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${pos.current.x - 18}px, ${pos.current.y - 18}px)`
    }

    // Update trail
    hueRef.current = (hueRef.current + 0.3) % 360
    trails.current = trails.current
      .map((t) => ({ ...t, life: t.life - 0.02 }))
      .filter((t) => t.life > 0)

    // Draw trails on canvas
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (const trail of trails.current) {
          const size = trail.life * 3
          ctx.beginPath()
          ctx.arc(trail.x, trail.y, size, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${trail.hue}, 100%, 70%, ${trail.life * 0.4})`
          ctx.fill()
        }
      }
    }

    raf.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      trails.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        hue: hueRef.current,
      })
      if (trails.current.length > 40) trails.current.shift()
    }

    const handleDown = () => setIsClicking(true)
    const handleUp = () => setIsClicking(false)

    const handleOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[role='button']") ||
        el.closest("[role='link']")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    window.addEventListener("mousemove", handleMove, { passive: true })
    window.addEventListener("mouseover", handleOver, { passive: true })
    window.addEventListener("mousedown", handleDown)
    window.addEventListener("mouseup", handleUp)
    window.addEventListener("resize", handleResize)

    raf.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseover", handleOver)
      window.removeEventListener("mousedown", handleDown)
      window.removeEventListener("mouseup", handleUp)
      window.removeEventListener("resize", handleResize)
    }
  }, [isTouchDevice, animate])

  if (isTouchDevice) return null

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99996]"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`cursor-dot ${isHovering ? "hovering" : ""}`}
        style={{
          transform: `translate(-100px, -100px)`,
          ...(isClicking && !isHovering
            ? { width: 12, height: 12, background: "hsl(var(--secondary))" }
            : {}),
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? "hovering" : ""}`}
        style={{ transform: `translate(-100px, -100px)` }}
        aria-hidden="true"
      />
    </>
  )
}
