import { Card, CardContent } from "@/components/ui/card";
import { Code, Server, Database, GitBranch, Globe, Cpu } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      name: "Languages",
      icon: <Code className="w-6 h-6" />,
      skills: [
        "Python",
        "JavaScript",
        "Typescript",
        "Go",
        "Java",
        "C++",
        "Erlang",
      ],
    },
    {
      name: "Frontend",
      icon: <Server className="w-6 h-6" />,
      skills: [
        "React.js",
        "Next.js",
        "TailwindCSS",
        "Shadcn-UI",
        "Ember.js",
        "HTML5",
        "CSS",
      ],
    },
    {
      name: "Backend",
      icon: <Server className="w-6 h-6" />,
      skills: [
        "Node.js",
        "Express",
        "Bun",
        "Honojs",
        "Gin",
        "Django",
        "Flask",
        "Java Spring",
      ],
    },
    {
      name: "Machine Learning & AI",
      icon: <Cpu className="w-6 h-6" />,
      skills: [
        "TensorFlow",
        "PyTorch",
        "Langchain",
        "Scikit-learn",
        "Keras",
        "OpenCV",
        "Numpy",
        "Pandas",
        "Optuna",
      ],
    },
    {
      name: "Database",
      icon: <Database className="w-6 h-6" />,
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite"],
    },
    {
      name: "DevOps",
      icon: <GitBranch className="w-6 h-6" />,
      skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Github Actions"],
    },
  ];

  return (
    <section id="skills" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCategories.map((category, index) => (
          <Card
            key={index}
            className="terminal-border terminal-glow bg-background text-foreground">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                {category.icon}
                <h3 className="text-xl font-bold ml-2">{category.name}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
