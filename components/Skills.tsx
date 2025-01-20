import { Card, CardContent } from "@/components/ui/card";
import { Code, Server, Database, GitBranch, Globe, Cpu } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      name: "Frontend",
      icon: <Code className="w-6 h-6" />,
      skills: [
        "React",
        "Next.js",
        "Vue.js",
        "Angular",
        "HTML5",
        "CSS3",
        "JavaScript",
        "TypeScript",
      ],
    },
    {
      name: "Backend",
      icon: <Server className="w-6 h-6" />,
      skills: [
        "Node.js",
        "Express",
        "Django",
        "Flask",
        "Ruby on Rails",
        "ASP.NET",
        "Java Spring",
        "PHP",
      ],
    },
    {
      name: "Database",
      icon: <Database className="w-6 h-6" />,
      skills: [
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Elasticsearch",
        "Cassandra",
        "Oracle",
        "SQLite",
      ],
    },
    {
      name: "DevOps",
      icon: <GitBranch className="w-6 h-6" />,
      skills: [
        "Docker",
        "Kubernetes",
        "Jenkins",
        "GitLab CI",
        "AWS",
        "Azure",
        "GCP",
        "Terraform",
      ],
    },
    {
      name: "Mobile",
      icon: <Globe className="w-6 h-6" />,
      skills: [
        "React Native",
        "Flutter",
        "iOS (Swift)",
        "Android (Kotlin)",
        "Xamarin",
        "Ionic",
        "PhoneGap",
        "Unity",
      ],
    },
    {
      name: "Other",
      icon: <Cpu className="w-6 h-6" />,
      skills: [
        "GraphQL",
        "REST APIs",
        "WebSockets",
        "Machine Learning",
        "AI",
        "Blockchain",
        "IoT",
        "Microservices",
      ],
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
