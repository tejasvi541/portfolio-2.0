"use client"

import { motion } from "framer-motion"

export default function Skills() {
  const skillCategories = [
    { name: "Languages", skills: ["Java", "Python", "TypeScript", "JavaScript", "C++", "Go", "SQL"] },
    { name: "Frontend", skills: ["React.js", "Next.js", "Vue.js", "Redux", "Tailwind CSS", "Framer Motion"] },
    { name: "Backend", skills: ["Node.js", "Spring Boot", "Express", "Django", "Flask", "REST APIs"] },
    { name: "Databases", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Drizzle ORM", "Prisma"] },
    { name: "Infrastructure", skills: ["Docker", "AWS ECS", "Git", "Kafka", "Zookeeper", "Socket.io"] },
    { name: "ML / AI", skills: ["PyTorch", "TensorFlow", "LLaMA", "Transformers", "Computer Vision"] },
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
