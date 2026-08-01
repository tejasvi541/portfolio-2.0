"use client"

import { motion } from "framer-motion"

export default function Education() {
  const education = [
    {
      degree: "Masters in Computer Science (Applied)",
      school: "Concordia University",
      location: "Montreal, QC",
      year: "Jan 2024 -- May 2025",
      focus: "AI/ML, Scalable Systems, Full-Stack Engineering",
    },
    {
      degree: "B.Tech. Computer Science & Engineering",
      school: "Kurukshetra University",
      location: "Kurukshetra, India",
      year: "Aug 2019 -- Sep 2023",
      focus: "Software Engineering, Data Structures, Algorithms",
    },
  ]

  return (
    <section id="education" className="mb-32 relative z-10">
      <div className="section-header">
        <span className="index">05</span>
        <h2 className="font-sans">Education</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="war-card"
          >
            <h3 className="text-sm font-sans font-bold mb-1">{edu.degree}</h3>
            <p className="text-xs text-muted-foreground font-mono mb-4">
              {edu.school} &middot; {edu.location}
            </p>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-[10px] text-muted-foreground font-mono">{edu.year}</span>
              <span className="text-[10px] text-primary font-mono">{edu.focus}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
