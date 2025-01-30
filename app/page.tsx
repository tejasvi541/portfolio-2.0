import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <section id="skills" className="mb-24">
        <Skills />
      </section>
      <section id="experience" className="mb-24">
        <Experience />
      </section>
      <section id="projects" className="mb-24">
        <Projects />
      </section>
      <section id="contact" className="mb-24">
        <Contact />
      </section>
    </>
  );
}
