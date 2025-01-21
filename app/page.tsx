"use client";
import { useEffect } from "react";
import Header from "@/components/Header";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import FallingBackground from "@/components/FallingBackground";

export default function Home() {
  useEffect(() => {
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const targetId = (e.target as HTMLAnchorElement)
        .getAttribute("href")
        ?.substring(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        targetElement?.scrollIntoView({ behavior: "smooth" });
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener("click", smoothScroll));

    return () => {
      links.forEach((link) => link.removeEventListener("click", smoothScroll));
    };
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 relative">
      <FallingBackground />
      <Header />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Contact />
    </main>
  );
}
