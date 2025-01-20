import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

export default function Education() {
  const education = [
    { degree: "BS in Computer Science", school: "University of Technology", year: "2018-2022" },
    { degree: "MS in Software Engineering", school: "Tech Institute", year: "2022-2024" },
  ]

  return (
    <section id="education" className="mb-12">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <GraduationCap className="mr-2" /> Education
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((edu, index) => (
          <Card key={index} className="terminal-border terminal-glow bg-background text-foreground">
            <CardHeader>
              <CardTitle>{edu.degree}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{edu.school}</p>
              <p>{edu.year}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

