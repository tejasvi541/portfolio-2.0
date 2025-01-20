import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export default function Education() {
  const education = [
    {
      degree: "Master's in Applied Computer Science",
      school: "Concordia University, Montreal, QC",
      year: "Jan 2024 - May 2025",
      desc: "Focused on AI/ML, scalable systems, and full-stack development; Bachelor's in Computer Science & Engineering with a strong foundation in core computing principles.",
    },
    {
      degree: "Bachelor's of Technology (Computer Science & Engineering)",
      school: "Kurukshetra University, Kurukshetra, HR",
      year: "Aug 2019 - Sept 2023",
      desc: "Specialized in software engineering, data structures, algorithms, and database management systems.",
    },
  ];

  return (
    <section id="education" className="mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <GraduationCap className="mr-2" /> Education
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((edu, index) => (
          <Card
            key={index}
            className="terminal-border terminal-glow bg-background text-foreground">
            <CardHeader>
              <CardTitle>{edu.degree}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold">{edu.school}</p>

              <p className="underline">{edu.year}</p>

              <br />
              {edu.desc && <p>{edu.desc}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
