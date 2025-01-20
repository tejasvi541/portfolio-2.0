import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderGit2 } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform using MERN stack",
    },
    {
      name: "Task Management App",
      description: "Developed a React Native mobile app for task management",
    },
    {
      name: "Data Visualization Tool",
      description: "Created a data visualization tool using D3.js and Vue.js",
    },
    {
      name: "AI Chatbot",
      description:
        "Implemented an AI-powered chatbot using natural language processing",
    },
  ];

  return (
    <section id="projects" className="mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FolderGit2 className="mr-2" /> Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="terminal-border terminal-glow bg-background text-foreground square-tile">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
