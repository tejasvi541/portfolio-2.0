import { Card, CardContent } from "@/components/ui/card"
import { Code, Server, Database, GitGraphIcon as Git } from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      name: "Frontend",
      icon: <Code />,
      skills: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS"],
    },
    {
      name: "Backend",
      icon: <Server />,
      skills: ["Node.js", "Express", "Python", "Django"],
    },
    {
      name: "Database",
      icon: <Database />,
      skills: ["SQL", "MongoDB", "PostgreSQL"],
    },
    {
      name: "Tools",
      icon: <Git />,
      skills: ["Git", "Docker", "AWS", "CI/CD"],
    },
  ]

  return (
    <section id="skills" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillCategories.map((category, index) => (
          <Card key={index} className="terminal-border terminal-glow bg-background text-foreground">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                {category.icon}
                <h3 className="text-xl font-bold ml-2">{category.name}</h3>
              </div>
              <ul>
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>{skill}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

