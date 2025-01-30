"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Twitter, FileText, Linkedin } from "lucide-react";

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
    <header className="pt-20 pb-8 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold">TEJASVI</h1>
            <p className="h-6">{displayedTitle}</p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/tejasvi541"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:text-accent">
              <Github className="w-5 h-5 mr-2" />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://x.com/weinsimulation"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:text-accent">
              <Twitter className="w-5 h-5 mr-2" />
              <span>𝕏</span>
            </Link>
            <Link
              href="https://linkedin.com/in/t3jasvi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:text-accent">
              <Linkedin className="w-5 h-5 mr-2" />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://www.dropbox.com/scl/fi/2ocu8ompjf6v5374r1xgr/Resume_Tejasvi_Tech.pdf?rlkey=cyifgx9ii3tuulz7stxkh0sma&st=vp8x3w09&dl=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center hover:text-accent">
              <FileText className="w-5 h-5 mr-2" />
              <span>Resume</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
