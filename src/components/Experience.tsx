import { Briefcase, Code2, Database, Server, Zap } from "lucide-react";

const experiences = [
  {
    year: "2020 - Present",
    position: "Senior Full-Stack Developer",
    company: "Tech Solutions Inc.",
    description: "Leading development of enterprise applications and API integrations",
  },
  {
    year: "2018 - 2020",
    position: "Full-Stack Developer",
    company: "Digital Innovations",
    description: "Developed e-commerce platforms and business automation systems",
  },
  {
    year: "2017 - 2018",
    position: "Backend Developer",
    company: "StartUp Tech",
    description: "Built scalable backend services and database architectures",
  },
];

const skills = [
  { name: "PHP / Laravel", icon: Code2 },
  { name: "JavaScript / Node.js", icon: Zap },
  { name: "MySQL / Redis", icon: Database },
  { name: "API Integration", icon: Server },
];

export function Experience() {
  return (
    <section id="experience" className="min-h-screen flex items-center py-20 bg-gradient-to-b from-background to-space-blue/20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="text-gradient">Experience & Skills</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Timeline */}
          <div className="space-y-8">
            <h3 className="text-2xl font-orbitron font-bold mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              Work Experience
            </h3>
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary animate-pulse" />
                <div className="glassmorphism p-6 rounded-lg hover:glow-cyan transition-all duration-300">
                  <div className="text-sm font-orbitron text-primary mb-2">{exp.year}</div>
                  <h4 className="text-lg font-bold mb-1">{exp.position}</h4>
                  <div className="text-sm text-secondary mb-2">{exp.company}</div>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-8">
            <h3 className="text-2xl font-orbitron font-bold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-secondary" />
              Technical Skills
            </h3>
            <div className="space-y-6">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div key={skill.name} className="glassmorphism p-6 rounded-lg hover:glow-purple transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional Skills Tags */}
            <div className="glassmorphism p-6 rounded-lg">
              <h4 className="font-orbitron font-bold mb-4">Additional Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "CodeIgniter",
                  "RabbitMQ",
                  "Docker",
                  "Git",
                  "PM2",
                  "Linux",
                  "REST API",
                  "WebSockets",
                  "Microservices",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
