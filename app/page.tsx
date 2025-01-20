import Header from "@/components/Header"
import Education from "@/components/Education"
import Skills from "@/components/Skills"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <Education />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}

