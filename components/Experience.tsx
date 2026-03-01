"use client"

import { motion } from "framer-motion"

export default function Experience() {
  const experiences = [
    {
      title: "Full Stack Engineer",
      company: "Limelight Software",
      location: "Toronto, ON",
      period: "Oct 2025 -- Present",
      status: "Current",
      logs: [
        { tag: "OPTIMIZATION", text: "Engineered OLAP grid ecosystem; reduced network overhead by 60% via serialization pipelines" },
        { tag: "RENDERING", text: "Re-architected frontend layout engine. Reconciled Flexbox/JS virtualization for sub-millisecond rendering" },
        { tag: "STABILITY", text: "Orchestrated client-side semaphore locking to resolve distributed deadlocks between React & Java sessions" },
        { tag: "INTEGRITY", text: "Implemented pre-emptive DAG traversal validation to prevent heap corruption in disjointed hierarchies" },
      ],
    },
    {
      title: "Full-Stack Developer Intern",
      company: "Hilo Design",
      location: "Remote",
      period: "Nov 2022 -- May 2023",
      status: "Completed",
      logs: [
        { tag: "LATENCY", text: "Optimized Node.js/MySQL backend to achieve sub-200ms (p-95) response times" },
        { tag: "SCALING", text: "Deployed Dockerized microservices on AWS ECS with CloudWatch monitoring" },
        { tag: "CACHING", text: "Implemented Redis caching strategies, reducing DB query latency by 30%" },
      ],
    },
  ]

  return (
    <section id="experience" className="mb-32 relative z-10">
      <div className="section-header">
        <span className="index">02</span>
        <h2 className="font-sans">Experience</h2>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="war-card"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 pb-4 border-b border-border">
              <div>
                <h3 className="text-base font-sans font-bold mb-1">{exp.title}</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  {exp.company} &middot; {exp.location}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[10px] text-muted-foreground font-mono">{exp.period}</span>
                <span className={`text-[10px] font-mono px-2 py-1 border ${
                  exp.status === "Current"
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground"
                }`}>
                  {exp.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 terminal-log">
              {exp.logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i + 0.2 }}
                  className="flex items-start gap-3"
                >
                  <span className="tag flex-shrink-0">[{log.tag}]</span>
                  <span>{log.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
