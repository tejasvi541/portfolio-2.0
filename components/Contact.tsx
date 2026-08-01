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
    <section id="contact" className="mb-32 relative z-10">
      <div className="section-header">
        <span className="index">04</span>
        <h2 className="font-sans">Get in Touch</h2>
      </div>

      <p className="text-xs font-mono text-muted-foreground mb-6 max-w-2xl">
        Toronto, ON, Canada &middot;{" "}
        <a href="mailto:t3jasvii@gmail.com" className="text-primary hover:underline">
          t3jasvii@gmail.com
        </a>
      </p>

      <motion.form
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        onSubmit={handleSubmit}
        className="war-card max-w-2xl"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono text-primary mb-2">Name</label>
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="bg-input border-border focus:border-primary h-11 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-primary mb-2">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="bg-input border-border focus:border-primary h-11 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-primary mb-2">Message</label>
            <Textarea
              name="message"
              placeholder="Your message..."
              required
              rows={6}
              className="bg-input border-border focus:border-primary text-xs font-mono resize-none"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="brutal-button w-full h-12 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            {isLoading ? "Sending..." : "Send Message"}
          </motion.button>
        </div>
      </motion.form>
    </section>
  )
}
