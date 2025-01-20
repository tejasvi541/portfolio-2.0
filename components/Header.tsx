"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mb-12 terminal-border p-4">
      <h1 className="text-4xl font-bold mb-4">John Doe</h1>
      <p className="mb-4">Software Engineer</p>
      <nav className="flex justify-between items-center">
        <div>
          <Button
            variant="link"
            className="text-foreground"
            onClick={() => scrollTo("#education")}>
            Education
          </Button>
          <Button
            variant="link"
            className="text-foreground"
            onClick={() => scrollTo("#skills")}>
            Skills
          </Button>
          <Button
            variant="link"
            className="text-foreground"
            onClick={() => scrollTo("#projects")}>
            Projects
          </Button>
          <Button
            variant="link"
            className="text-foreground"
            onClick={() => scrollTo("#contact")}>
            Contact
          </Button>
        </div>
        <div>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 hover:underline">
            GitHub
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-4 hover:underline">
            X
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline">
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}
