"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Twitter, FileText } from "lucide-react";

const titles = ["AI Engineer", "Software Engineer", "Backend Engineer"];

export default function Header() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      if (displayedTitle === "") {
        setIsDeleting(false);
        setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
      } else {
        timer = setTimeout(() => {
          setDisplayedTitle(
            currentTitle.substring(0, displayedTitle.length - 1)
          );
        }, 50);
      }
    } else {
      if (displayedTitle === currentTitle) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else {
        timer = setTimeout(() => {
          setDisplayedTitle(
            currentTitle.substring(0, displayedTitle.length + 1)
          );
        }, 100);
      }
    }

    return () => clearTimeout(timer);
  }, [titleIndex, displayedTitle, isDeleting]);

  return (
    <header className="mb-12 terminal-border p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-4xl font-bold">John Doe</h1>
          <p className="h-6">{displayedTitle}</p>
        </div>
        <nav className="flex items-center space-x-4">
          <Link href="#skills" passHref legacyBehavior>
            <Button variant="link" className="text-foreground">
              Skills
            </Button>
          </Link>
          <Link href="#experience" passHref legacyBehavior>
            <Button variant="link" className="text-foreground">
              Experience
            </Button>
          </Link>
          <Link href="#education" passHref legacyBehavior>
            <Button variant="link" className="text-foreground">
              Education
            </Button>
          </Link>
          <Link href="#projects" passHref legacyBehavior>
            <Button variant="link" className="text-foreground">
              Projects
            </Button>
          </Link>
          <Link href="#contact" passHref legacyBehavior>
            <Button variant="link" className="text-foreground">
              Contact
            </Button>
          </Link>
        </nav>
      </div>
      <div className="flex justify-end space-x-4">
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center">
          <Github className="w-6 h-6 mr-2" />
          <span>GitHub</span>
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center">
          <Twitter className="w-6 h-6 mr-2" />
          <span>Twitter</span>
        </Link>
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center">
          <FileText className="w-6 h-6 mr-2" />
          <span>Resume</span>
        </Link>
      </div>
    </header>
  );
}
