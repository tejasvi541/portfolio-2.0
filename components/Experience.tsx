import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovators Inc.",
      period: "2023 - Present",
      description:
        "Led development of cloud-native applications and mentored junior developers.",
    },
    {
      title: "Software Engineer",
      company: "Digital Solutions Ltd.",
      period: "2021 - 2023",
      description:
        "Developed and maintained full-stack web applications using React and Node.js.",
    },
    {
      title: "Junior Developer",
      company: "StartUp Nexus",
      period: "2019 - 2021",
      description:
        "Assisted in building and testing mobile applications using React Native.",
    },
  ];

  return (
    <section id="experience" className="mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Briefcase className="mr-2" /> Experience
      </h2>
      <div className="relative pl-8 border-l-2 border-foreground">
        {experiences.map((exp, index) => (
          <Card
            key={index}
            className="mb-8 terminal-border terminal-glow bg-background text-foreground">
            <CardContent className="p-4">
              <div className="absolute w-4 h-4 bg-foreground rounded-full -left-[9px]" />
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <p className="text-sm mb-2">
                {exp.company} | {exp.period}
              </p>
              <p>{exp.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
