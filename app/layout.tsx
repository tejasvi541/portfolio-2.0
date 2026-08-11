import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type React from "react";

// Arial Black / Helvetica / Times New Roman are OS defaults on every
// consumer platform — no webfonts needed (see DESIGN.md's "Note on Font
// Substitutes"). Font stacks live in app/globals.css.

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
    <html lang="en">
      <head>
        {/* Light is the default — this only ever adds the "dark" class, and
            only if the visitor previously opted in, so there's no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();",
          }}
        />
      </head>
      <body>
        <Analytics />
        <SpeedInsights />
        <div className="page-frame flex flex-col">
          <Navbar />
          <Header />
          <main className="container mx-auto px-6 md:px-8 py-8 pt-24 flex-1 w-full max-w-5xl">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
