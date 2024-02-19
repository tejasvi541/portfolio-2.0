import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tejasvi's Space",
  description:
    "Highly motivated and innovative computer science student with a passion for machine learning and software engineering. Experienced in developing complex algorithms and applications, with a strong track record of delivering high-quality solutions. Committed to continuous learning and pushing the boundaries of technology to drive meaningful impact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-screen bg-gradient-to-b from-blue-50 to-slate-500">
          <div className="h-24">
            <Navbar />
          </div>
        </div>
        <div className="h-[calc(100vh-6rem)]">{children}</div>
      </body>
    </html>
  );
}
