"use client"

import { useState } from "react"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import emailjs from "@emailjs/browser"

const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID
const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!serviceId || !templateId || !publicKey) {
      toast({
        variant: "destructive",
        title: "Not configured",
        description: "Email service is not configured.",
      })
      return
    }
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = (formData.get("name") as string) || ""
    const email = (formData.get("email") as string) || ""
    const message = (formData.get("message") as string) || ""

    try {
      await emailjs.send(
        serviceId,
        templateId,
        { name, email, message },
        { publicKey }
      )

      toast({
        title: "Message sent",
        description: "Thanks! I'll get back to you soon.",
      })
      e.currentTarget.reset()
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again."
      toast({
        variant: "destructive",
        title: "Failed to send",
        description: message,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="mb-24">
      <div className="section-header">
        <span className="index">05</span>
        <h2>Get in Touch</h2>
      </div>

      {/* cta-block-red */}
      <div
        className="max-w-2xl mb-6 p-5 border border-border"
        style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
      >
        <p className="text-sm font-mono leading-relaxed">
          Based in Toronto, ON, Canada. Open to full-stack, backend, and ML/AI engineering
          roles &mdash; reach out at{" "}
          <a href="mailto:t3jasvii@gmail.com" className="underline" style={{ color: "hsl(var(--primary-foreground))" }}>
            t3jasvii@gmail.com
          </a>{" "}
          or use the form below.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        onSubmit={handleSubmit}
        className="border border-border p-6 max-w-2xl"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-sans font-bold uppercase mb-2">Name</label>
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="bg-input border-border focus:border-primary h-11 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-sans font-bold uppercase mb-2">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="bg-input border-border focus:border-primary h-11 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-sans font-bold uppercase mb-2">Message</label>
            <Textarea
              name="message"
              placeholder="Your message..."
              required
              rows={6}
              className="bg-input border-border focus:border-primary text-xs font-mono resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="brutal-button w-full h-12 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </motion.form>
    </section>
  )
}
