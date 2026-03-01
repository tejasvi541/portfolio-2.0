"use client"

import { useState } from "react"
import type React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { sendContactEmail } from "@/app/actions/contact"

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await sendContactEmail({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
      })

      if (!result.success) {
        throw new Error(result.error || "Failed to send message")
      }

      toast({
        title: "Message sent",
        description: "Thanks! I'll get back to you soon.",
      })
      e.currentTarget.reset()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Failed to send",
        description: error.message || "Something went wrong. Please try again.",
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
