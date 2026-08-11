"use client"

import { motion } from "framer-motion"

const tints = ["tint-steel", "tint-lime"]

export default function Experience() {
  const experiences = [
    {
      title: "Full Stack Engineer",
      company: "Limelight Software",
      location: "Toronto, ON",
      period: "Oct 2025 -- Present",
      status: "Current",
      logs: [
        { tag: "SYNC", text: "Engineered a unified OLAP state synchronization layer bridging in-memory cubes with bulk reload APIs, enforcing a strict backend single-source-of-truth model that prevented cross-session data divergence" },
        { tag: "STABILITY", text: "Stabilized multi-dimensional query execution with pre-validation guards on OLAP INTERSECT/search endpoints, eliminating recurring Bad Request cascades without adding latency" },
        { tag: "PIPELINE", text: "Refactored backend orchestration into a deterministic Persist → Cache Mutate → Publish pipeline, decoupling transactional writes from async eventing" },
        { tag: "CONCURRENCY", text: "Eliminated race conditions, duplicate cache invalidations, and non-deterministic state during high-volume reloads, restoring thread-safe execution" },
        { tag: "PARSING", text: "Extended ANTLR-based parsing and AST evaluation with dependency-aware stale marking, deterministically re-triggering formula recomputation across multi-threaded pipelines" },
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
    <section id="experience" className="mb-24">
      <div className="section-header">
        <span className="index">02</span>
        <h2>Experience</h2>
      </div>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="border border-border overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 px-6 py-4 border-b border-border bg-background">
              <div>
                <h3 className="text-base font-sans font-bold mb-1">{exp.title}</h3>
                <p className="text-xs text-muted-foreground font-mono">
                  {exp.company} &middot; {exp.location}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[10px] text-muted-foreground font-mono">{exp.period}</span>
                <span className={`text-[10px] font-sans font-bold uppercase px-2 py-1 border ${
                  exp.status === "Current"
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
                }`}>
                  {exp.status}
                </span>
              </div>
            </div>

            <div className={`${tints[index % tints.length]} space-y-3 terminal-log p-6`}>
              {exp.logs.map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="tag flex-shrink-0">[{log.tag}]</span>
                  <span>{log.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
