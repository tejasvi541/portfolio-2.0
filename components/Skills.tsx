"use client"

import { motion } from "framer-motion"

const tints = ["tint-sage", "tint-salmon", "tint-peach", "tint-lime", "tint-sky", "tint-periwinkle"]

export default function Skills() {
  const skillCategories = [
    { name: "Languages", skills: ["Java", "Python", "TypeScript", "JavaScript", "C++", "SQL", "Shell", "Bash"] },
    { name: "Backend", skills: ["Spring Boot", "Hibernate", "JPA", "Node.js", "Next.js", "Express.js", "Hono.js", "FastAPI"] },
    { name: "Frontend", skills: ["React.js", "Next.js", "Angular.js", "React Native", "Redux", "Tailwind CSS", "Shadcn UI"] },
    { name: "Databases & Messaging", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Zookeeper", "Elasticsearch", "Drizzle ORM", "Prisma"] },
    { name: "Cloud & DevOps", skills: ["AWS (ECS, S3, EC2)", "CloudWatch", "Docker", "Kubernetes", "CI/CD", "Jenkins", "GitHub Actions", "Microservices"] },
    { name: "Tools & ML/AI", skills: ["Git", "REST", "gRPC", "WebSockets", "JWT", "Linux", "PyTorch", "TensorFlow", "RAG", "LangChain", "GenAI"] },
  ]

  return (
    <section id="skills" className="mb-24">
      <div className="section-header">
        <span className="index">01</span>
        <h2>Tech Stack</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            className="border border-border overflow-hidden"
          >
            <div className="bg-background text-xs font-sans font-bold uppercase px-4 py-3 border-b border-border">
              {category.name}
            </div>
            <div className={`${tints[index % tints.length]} flex flex-wrap gap-2 p-4`}>
              {category.skills.map((skill) => (
                <span key={skill} className="tech-tag">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
