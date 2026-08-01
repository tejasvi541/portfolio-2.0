"use client"

import { motion } from "framer-motion"

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
    <section id="skills" className="mb-32 relative z-10">
      <div className="section-header">
        <span className="index">01</span>
        <h2 className="font-sans">Tech Stack</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            className="war-card group"
          >
            <div className="text-xs text-primary font-sans font-semibold mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-primary inline-block" />
              {category.name}
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 + skillIndex * 0.03 }}
                  className="tech-tag"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
