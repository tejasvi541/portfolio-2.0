"use client"

import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const tints = ["tint-sage", "tint-salmon", "tint-peach", "tint-lime", "tint-sky", "tint-periwinkle"]

export default function Projects() {
  const projects = [
    {
      id: "01",
      title: "Distributed Leader Election Service",
      description: "Fault-tolerant leader election module using Java and Apache Zookeeper, leveraging ephemeral sequential znodes and Watcher events within a Spring Boot framework for robust distributed consensus.",
      link: "https://github.com/tejasvi541",
      tech: ["Java", "Spring Boot", "Zookeeper", "Kafka", "Maven"],
    },
    {
      id: "02",
      title: "Learning Management System",
      description: "Full-stack LMS using Next.js 14 (App Router) & TypeScript, featuring SSR/ISR, Stripe payments, Mux video streaming, and PostgreSQL via Drizzle ORM. Drag-and-drop course UI secured by Clerk RBAC.",
      link: "https://github.com/tejasvi541/LMS",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Mux"],
    },
    {
      id: "03",
      title: "Scalable Chat Application",
      description: "Distributed, real-time chat backend using TypeScript, Socket.io, and Kafka for high-throughput fault-tolerant message queuing, storing messages in PostgreSQL. Dockerized for 10K+ msg/sec at <100ms P99.",
      link: "https://github.com/tejasvi541/Not-Simple-ChatApp",
      tech: ["TypeScript", "React", "Socket.io", "Kafka", "PostgreSQL", "Redis"],
    },
    {
      id: "04",
      title: "VLM Number Plate Recognition",
      description: "Fine-tuned a 330M TrOCR (ViT encoder/RoBERTa decoder) on the CENPARMI LPR dataset, achieving 86.8% accuracy (2.3% CER) with sub-1s inference via a custom SafeForwardModel wrapper and data collator.",
      link: "https://github.com/tejasvi541",
      tech: ["PyTorch", "Transformers (ViT/RoBERTa)", "Flask", "Attention"],
    },
    {
      id: "05",
      title: "Multimodal Vision Transformer (PaliGemma/Siglip)",
      description: "Siglip ViT & PaliGemma multimodal model in PyTorch, covering patch/positional embeddings, multi-head self-attention, and an inference pipeline with KV cache and GPU-accelerated Docker deployment.",
      link: "https://github.com/tejasvi541/Pali-Gemma",
      tech: ["PyTorch", "ViT", "Gemma", "Docker"],
    },
    {
      id: "06",
      title: "LLaMA 2 Implementation",
      description: "LLaMA 2 architected from scratch in PyTorch, implementing RoPE, GQA, and RMS normalization, with top-p sampling, temperature scaling, and efficient KV caching for fast autoregressive inference.",
      link: "https://github.com/tejasvi541/LLaMA-2",
      tech: ["PyTorch", "LLaMA Stack", "Docker"],
    },
  ]

  return (
    <section id="projects" className="mb-24">
      <div className="section-header">
        <span className="index">03</span>
        <h2>Projects</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="border border-border overflow-hidden group block"
          >
            <div className="bg-background flex items-start justify-between px-5 py-3 border-b border-border">
              <div className="flex-1">
                <span className="text-[10px] text-primary font-sans font-bold">#{project.id}</span>
                <h3 className="text-sm font-sans font-bold mt-1 leading-snug group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-1 ml-3" />
            </div>

            <div className={`${tints[index % tints.length]} p-5`}>
              <p className="text-[12px] mb-4 leading-relaxed line-clamp-2 font-mono">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span key={tech} className="tech-tag text-[9px] py-[2px] px-2">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
