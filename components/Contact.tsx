import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Mail className="mr-2" /> Contact Me
      </h2>
      <form className="max-w-md mx-auto terminal-border p-4">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Name"
            className="bg-background text-foreground terminal-border"
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            className="bg-background text-foreground terminal-border"
          />
        </div>
        <div className="mb-4">
          <Textarea
            placeholder="Message"
            className="bg-background text-foreground terminal-border"
            rows={4}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-foreground text-background hover:bg-foreground/90">
          Send Message
        </Button>
      </form>
    </section>
  );
}
