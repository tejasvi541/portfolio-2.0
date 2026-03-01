"use client"

import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export default function Projects() {
  const projects = [
    {
      id: "01",
      title: "Transformer Model for Bilingual Translation",
      description: "Engineered a transformer model for bilingual translation using PyTorch, incorporating custom tokenization and positional encoding techniques for efficient sequence-to-sequence learning.",
      link: "https://github.com/tejasvi541/transformer",
      tech: ["PyTorch", "HuggingFace", "Docker"],
    },
    {
      id: "02",
      title: "Learning Management System",
      description: "Constructed a scalable LMS using Next.js, Prisma, and Postgres, integrating Stripe payments, video on demand via Mux, and dynamic content management with drag-and-drop.",
      link: "https://github.com/tejasvi541/LMS",
      tech: ["Next.js", "TypeScript", "Docker", "PostgreSQL", "Stripe"],
    },
    {
      id: "03",
      title: "LLaMA 2 Implementation",
      description: "Architected the LLaMA 2 model from scratch in PyTorch, focusing on rotary positional encoding, grouped multihead attention, KV cache, and RMS normalization.",
      link: "https://github.com/tejasvi541/LLaMA-2",
      tech: ["PyTorch", "LLaMA Stack", "Docker"],
    },
    {
      id: "04",
      title: "Scalable Chat Application",
      description: "Engineered a scalable chat server using TypeScript, Socket.io, and Kafka for distributed messaging, with PostgreSQL and Redis for robust data persistence.",
      link: "https://github.com/tejasvi541/Not-Simple-ChatApp",
      tech: ["TypeScript", "React.js", "Socket.io", "Kafka", "PostgreSQL", "Redis"],
    },
    {
      id: "05",
      title: "Vision Transformer (ViT)",
      description: "Implementation of Vision Transformer for image classification, including custom PatchEmbedding layer and complete ViT model tested on Caltech-256 dataset.",
      link: "https://github.com/tejasvi541/ViT",
      tech: ["Python", "PyTorch", "Computer Vision", "Docker"],
    },
    {
      id: "06",
      title: "Pali-Gemma Vision Transformer",
      description: "Siglip Vision Transformer with spatial attention mechanisms and efficient patch embeddings, featuring multi-headed self-attention and positional encoding.",
      link: "https://github.com/tejasvi541/Pali-Gemma",
      tech: ["Python", "PyTorch", "Transformer", "Docker"],
    },
    {
      id: "07",
      title: "Go RESTful API Server",
      description: "RESTful API built with Gin framework featuring JWT authentication for secure user login and event management. CRUD operations backed by PostgreSQL.",
      link: "https://github.com/tejasvi541/Go-Server",
      tech: ["Go", "Gin", "JWT", "PostgreSQL", "Docker"],
    },
    {
      id: "08",
      title: "Skin Disease Classifier",
      description: "React Native mobile app for real-time skin disease detection, leveraging a fine-tuned XceptionNet model with 23-class classification on Dermnet dataset.",
      link: "https://github.com/tejasvi541/skin-disease-classifier",
      tech: ["Python", "React Native", "TensorFlow"],
    },
  ]

  return (
    <section id="projects" className="mb-32 relative z-10">
      <div className="section-header">
        <span className="index">03</span>
        <h2 className="font-sans">Projects</h2>
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
            className="war-card group block"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <span className="text-[10px] text-primary font-mono opacity-50">#{project.id}</span>
                <h3 className="text-sm font-sans font-bold mt-1 leading-snug group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1 ml-3" />
            </div>

            <p className="text-[11px] text-muted-foreground mb-4 leading-relaxed line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech, techIndex) => (
                <span key={techIndex} className="tech-tag text-[9px] py-[2px] px-2">
                  {tech}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
