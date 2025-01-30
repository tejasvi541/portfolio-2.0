"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64; // 4rem or 64px
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-sm border-b border-foreground/10"
          : "bg-transparent"
      }`}>
      <div className="container mx-auto px-4 h-full flex items-center justify-between md:justify-center">
        <div className="flex items-center space-x-4 md:absolute md:left-4">
          <Link href="/" passHref>
            <Button
              variant="ghost"
              className="text-foreground hover:text-accent">
              Home
            </Button>
          </Link>
          {/* <Link href="/blog" passHref>
            <Button
              variant="ghost"
              className="text-foreground hover:text-accent">
              Blog
            </Button>
          </Link> */}
        </div>
        <div className="hidden md:flex items-center justify-center space-x-4">
          <Button
            variant="ghost"
            className="text-foreground hover:text-accent"
            onClick={() => scrollToSection("skills")}>
            Skills
          </Button>
          <Button
            variant="ghost"
            className="text-foreground hover:text-accent"
            onClick={() => scrollToSection("experience")}>
            Experience
          </Button>
          <Button
            variant="ghost"
            className="text-foreground hover:text-accent"
            onClick={() => scrollToSection("projects")}>
            Projects
          </Button>
          <Button
            variant="ghost"
            className="text-foreground hover:text-accent"
            onClick={() => scrollToSection("contact")}>
            Contact
          </Button>
        </div>
        <div className="flex items-center space-x-4 md:absolute md:right-4">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden text-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] p-0 full-screen-sidebar">
              <nav className="flex flex-col h-full bg-background">
                <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                  <X className="h-8 w-8 text-foreground" />
                  <span className="sr-only">Close</span>
                </SheetClose>
                <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                  <Button
                    variant="ghost"
                    className="text-2xl text-foreground hover:text-accent"
                    onClick={() => scrollToSection("skills")}>
                    Skills
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-2xl text-foreground hover:text-accent"
                    onClick={() => scrollToSection("experience")}>
                    Experience
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-2xl text-foreground hover:text-accent"
                    onClick={() => scrollToSection("projects")}>
                    Projects
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-2xl text-foreground hover:text-accent"
                    onClick={() => scrollToSection("contact")}>
                    Contact
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
