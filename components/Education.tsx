"use client"

import { motion } from "framer-motion"

const tints = ["tint-olive", "tint-steel"]

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
    <section id="education" className="mb-24">
      <div className="section-header">
        <span className="index">04</span>
        <h2>Education</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="border border-border overflow-hidden"
          >
            <div className="bg-background px-5 py-4 border-b border-border">
              <h3 className="text-sm font-sans font-bold mb-1">{edu.degree}</h3>
              <p className="text-xs text-muted-foreground font-mono">
                {edu.school} &middot; {edu.location}
              </p>
            </div>
            <div className={`${tints[index % tints.length]} flex items-center justify-between px-5 py-3`}>
              <span className="text-[10px] font-mono">{edu.year}</span>
              <span className="text-[10px] font-sans font-bold">{edu.focus}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
