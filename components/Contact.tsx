"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const [error, setError] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  interface EmailFormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    message: HTMLTextAreaElement;
  }

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        form.current!,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        () => {
          toast({
            title: "Success!",
            description: "Your message has been sent successfully.",
          });
          form.current!.reset();
        },
        () => {
          setError(true);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to send message. Please try again.",
          });
        }
      );
  };

  return (
    <section id="contact" className="mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Mail className="mr-2" /> Contact Me
      </h2>
      <form
        onSubmit={sendEmail}
        ref={form}
        className="max-w-md mx-auto terminal-border p-4">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Name"
            className="bg-background text-foreground terminal-border"
            name="name"
            required
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="your@email.com"
            className="bg-background text-foreground terminal-border"
            name="email"
            required
          />
        </div>
        <div className="mb-4">
          <Textarea
            placeholder="Message"
            className="bg-background text-foreground terminal-border"
            name="message"
            rows={4}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-[1.02]">
          Send Message
        </Button>
      </form>
    </section>
  );
}
