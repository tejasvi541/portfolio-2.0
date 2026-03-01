import "./globals.css";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import MagneticCursor from "@/components/MagneticCursor";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type React from "react";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Tejasvi | Full-Stack Engineer",
  description:
    "Full-Stack Engineer specializing in distributed systems, ML/AI infrastructure, and high-performance web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <body className={jetbrainsMono.className}>
        <Analytics />
        <SpeedInsights />
        <AnimatedBackground />
        <MagneticCursor />
        <Navbar />
        <Header />
        <main className="container mx-auto px-6 md:px-8 py-8 pt-24 relative z-10 max-w-5xl">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
