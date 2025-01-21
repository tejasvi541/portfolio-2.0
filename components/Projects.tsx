"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderGit2, ExternalLink, GithubIcon } from "lucide-react";
import Image from "next/image";
import GitHubCalendar from "react-github-calendar";
import React, { Suspense } from "react";
interface Project {
  name: string;
  description: string;
  link: string;
  image: string;
  tech: string[];
  github?: string;
}

async function fetchGitHubData(repo: string) {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: { Authorization: `token ${token}` },
  });
  return response.json();
}

const GitHubCalendarWrapper = () => {
  return (
    <div className="flex mb-4 justify-center">
      <Suspense
        fallback={
          <div className="text-center">Loading GitHub contributions...</div>
        }>
        <GitHubCalendar username={"tejasvi541"} />
      </Suspense>
    </div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData: Project[] = [
        {
          name: "Transformer Model for Bilingual Translation",
          description:
            "Engineered a transformer model for bilingual translation using PyTorch, incorporating custom tokenization and positional encoding techniques for efficient sequence-to-sequence learning.",
          link: "https://github.com/tejasvi541/transformer",
          image: "/placeholder.svg?height=100&width=100",
          tech: ["PyTorch", "HuggingFace", "Docker"],
          github: "tejasvi541/transformer",
        },
        {
          name: "Learning Management System",
          description:
            "Constructed a scalable Learning Management System using Next.js, Prisma, and Postgres, integrating secure Stripe payments, fast video on demand via Mux, and dynamic content management with drag-and-drop functionality.",
          link: "https://github.com/tejasvi541/LMS",
          image: "/placeholder.svg?height=100&width=100",
          tech: ["Next.js", "TypeScript", "Docker", "PostgreSQL", "Stripe"],
        },
        {
          name: "LLaMA 2 Implementation",
          description:
            "Architected the LLaMA 2 model architecture from scratch in PyTorch, focusing on rotary positional encoding, grouped multihead attention, KV cache, and RMS normalization to enhance model efficiency.",
          link: "https://github.com/tejasvi541/LLaMA-2",
          image: "/placeholder.svg?height=100&width=100",
          tech: ["PyTorch", "LLaMA Stack", "Docker"],
          github: "tejasvi541/LLaMA-2",
        },
        {
          name: "Scalable Chat App",
          description:
            "Engineered a scalable chat server using TypeScript, Socket.io, and Kafka for distributed messaging, with PostgreSQL and Redis for robust data persistence and inter-service communication.",
          link: "https://github.com/tejasvi541/Not-Simple-ChatApp",
          image: "/placeholder.svg?height=100&width=100",
          tech: [
            "TypeScript",
            "React.js",
            "Socket.io",
            "Kafka",
            "PostgreSQL",
            "Redis",
            "Docker",
          ],
          github: "tejasvi541/Not-Simple-ChatApp",
        },
        {
          name: "Vision Transformer (ViT)",
          description:
            "This repository provides an unofficial PyTorch implementation of the Vision Transformer (ViT) model, introduced in the paper 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale.' The implementation includes a custom PatchEmbedding layer and a complete ViT model for image classification tasks, tested on the Caltech-256 dataset. The project also includes training, inference, and Docker support for easy deployment",
          link: "https://github.com/tejasvi541/ViT",
          image: "/placeholder.svg?height=100&width=100",
          tech: [
            "Python",
            "PyTorch",
            "Computer Vision",
            "Patch Embedding",
            "Transformer",
            "Docker",
            "Caltech-256",
          ],
          github: "tejasvi541/ViT",
        },
        {
          name: "Pali-Gemma",
          description:
            "This repository implements the Siglip Vision Transformer (ViT), a deep learning model designed for vision tasks, leveraging the transformer architecture introduced in 'Attention Is All You Need' and adapted for image processing. Siglip extends the Vision Transformer (ViT) framework by incorporating spatial attention mechanisms and efficient patch embeddings to process images as sequences of patches. The implementation includes modules for patch embedding, multi-headed self-attention, positional encoding, and transformer encoder layers, all built using PyTorch. The project is containerized with Docker for seamless deployment and includes inference scripts for practical use cases.",
          link: "https://github.com/tejasvi541/Pali-Gemma",
          image: "/placeholder.svg?height=100&width=100",
          tech: [
            "Python",
            "PyTorch",
            "Computer Vision",
            "Transformer",
            "Docker",
            "Inference",
            "Patch embedding",
            "Positional encoding",
            "Multi-headed self-attention",
          ],
          github: "tejasvi541/Pali-Gemma",
        },
        {
          name: "Go Server",
          description:
            "The Go-Server project is a RESTful API built with the 'Gin' framework in 'Go,'featuring 'JWT authentication' for secure user login and event management. It supports CRUD operations for events, user registration, and unregistration, all backed by a 'PostgreSQL' database. The project is containerized using 'Docker' for easy deployment and scalability.",
          link: "https://github.com/tejasvi541/Go-Server",
          image: "/placeholder.svg?height=100&width=100",
          tech: [
            "Go",
            "Gin Framework",
            "JWT Authentication",
            "RESTful API",
            "PostgreSQL",
            "Docker",
            "Event Management",
          ],
          github: "tejasvi541/Go-Server",
        },
        {
          name: "Skin Disease Classifier App",
          description:
            "Created a React Native mobile app for real-time skin disease detection, leveraging a fine-tuned XceptionNet model with 23-class classification getting around 42% accuracy because of dataset limitations.",
          link: "https://github.com/tejasvi541/skin-disease-classifier",
          image: "/placeholder.svg?height=100&width=100",
          tech: ["Python", "JavaScript", "React Native", "TensorFlow"],
        },
      ];

      const updatedProjects = await Promise.all(
        projectsData.map(async (project) => {
          if (project.github) {
            try {
              const data = await fetchGitHubData(project.github);
              return {
                ...project,
                stars: data.stargazers_count,
                forks: data.forks_count,
              };
            } catch (error) {
              console.error(
                `Error fetching GitHub data for ${project.github}:`,
                error
              );
              return project;
            }
          }
          return project;
        })
      );

      setProjects(updatedProjects);
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FolderGit2 className="mr-2" /> Projects
      </h2>
      <GitHubCalendarWrapper />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="terminal-border terminal-glow bg-background text-foreground">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{project.name}</span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer">
                  <p className="flex items-center gap-2">
                    <GithubIcon className="w-5 h-5" />
                    <ExternalLink className="w-5 h-5" />
                  </p>
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start mb-4">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  width={100}
                  height={100}
                  className="mr-4"
                />
                <p className="text-sm">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs bg-foreground text-background px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
