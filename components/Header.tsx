"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Github, Twitter, FileText, Linkedin, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const titles = ["AI Engineer", "Software Engineer", "Backend Engineer"];

export default function Header() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
          <h1 className="text-4xl font-bold">TEJASVI</h1>
          <p className="h-6">{displayedTitle}</p>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
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
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4">
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
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-16 mt-4 md:mt-0">
        <Button variant="link" className="font-bold">
          <Link
            href="https://github.com/tejasvi541"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center">
            <Github className="w-6 h-6 mr-2" />
            <span>GitHub</span>
          </Link>
        </Button>
        <Button variant="link" className="font-bold">
          <Link
            href="https://x.com/weinsimulation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center">
            <Twitter className="w-6 h-6 mr-2" />
            <span>𝕏</span>
          </Link>
        </Button>
        <Button variant="link" className="font-bold">
          <Link
            href="https://linkedin.com/in/t3jasvi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center">
            <Linkedin className="w-6 h-6 mr-2" />
            <span>Linkedin</span>
          </Link>
        </Button>
        <Button variant="link" className="font-bold">
          <Link
            href="https://www.dropbox.com/scl/fi/2ocu8ompjf6v5374r1xgr/Resume_Tejasvi_Tech.pdf?rlkey=cyifgx9ii3tuulz7stxkh0sma&st=vp8x3w09&dl=0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center">
            <FileText className="w-6 h-6 mr-2" />
            <span>Resume</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
