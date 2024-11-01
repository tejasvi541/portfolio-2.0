import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/TransitionProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tejasvi's Space",
  description:
    "I am a Master's student in Applied Computer Science at Concordia University, where I maintain a strong academic record with a GPA of 3.8/4.3. I hold a Bachelor’s degree in Computer Science and Engineering, and my expertise spans full-stack development, machine learning, and AI. I have hands-on experience with projects involving transformer models, scalable web applications, and mobile app development. Additionally, I have served as a Teaching Assistant and possess strong programming skills in Java, Python, and various web technologies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TransitionProvider>{children}</TransitionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
