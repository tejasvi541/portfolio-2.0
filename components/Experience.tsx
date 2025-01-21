import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      title: "Teaching Assistant COMP-249-Object Oriented Programming",
      company: "Concordia University, Montreal, QC",
      period: "Jul 2024 - Sep 2024",
      description: [
        "Delivered instruction on advanced Java topics: inheritance, polymorphism, abstract classes, and interfaces & Guided students through hands-on lab sessions, providing in-depth feedback on assignments and exams.",
      ],
    },
    {
      title: "Full Stack Intern",
      company: "Hilo Design, Remote",
      period: "Nov 2022 - May 2023",
      description: [
        "Developed a secure Node.js backend with MySQL integration, implementing JWT-based authentication for Shopify API, achieving sub-1s response times and supporting 1000s of users.",
        "Designed and Implemented a React.js frontend with Redux, incorporating unit tests for reliability and maintaining millisecond-level reload times under high concurrency.",
        "Deployed containerized microservices using Docker on AWS ECS with auto-scaling, achieving a 40% reduction in provisioning time and supporting up to 10000 requests per second.",
        "Implemented optimized MySQL indexing and Redis caching layers, reducing query latency by 30% and maintaining sub-200ms p95 response times under load.",
      ],
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
              {Array.isArray(exp.description) ? (
                <ul className="list-disc pl-4 space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{exp.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
