import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react"; // Added import for React
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tejasvi's Portfolio",
  description: "Personal portfolio and blog of Tejasvi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
        <Navbar />
        <Header />
        <main className="container mx-auto px-4 py-8 pt-16">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
