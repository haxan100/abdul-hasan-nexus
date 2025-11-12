import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Code2 } from "lucide-react";

const projects = [
  { id: 1, title: "E-Commerce Platform", tech: "Laravel + Vue.js", rotation: 0 },
  { id: 2, title: "API Integration Hub", tech: "Node.js + Redis", rotation: 72 },
  { id: 3, title: "Automation System", tech: "PHP + RabbitMQ", rotation: 144 },
  { id: 4, title: "CMS Dashboard", tech: "React + MySQL", rotation: 216 },
  { id: 5, title: "Payment Gateway", tech: "CodeIgniter", rotation: 288 },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-space-deep via-background to-background">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container px-4 z-10">
        <div className="flex flex-col items-center text-center">
          {/* Orbit Container */}
          <div className="relative w-full max-w-2xl aspect-square mb-8">
            {/* Center Avatar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary p-1 animate-glow">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <Code2 className="w-16 h-16 text-primary" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary blur-xl opacity-50" />
              </div>
            </div>

            {/* Orbiting Projects */}
            {mounted && projects.map((project, index) => (
              <div
                key={project.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  animation: `orbit ${20 + index * 2}s linear infinite`,
                  animationDelay: `${-index * 4}s`,
                }}
              >
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="glassmorphism px-4 py-2 rounded-lg hover:glow-cyan transition-all duration-300 hover:scale-110 group cursor-pointer"
                >
                  <div className="text-xs font-orbitron font-bold text-primary group-hover:text-secondary transition-colors">
                    {project.title}
                  </div>
                  <div className="text-[10px] text-muted-foreground">{project.tech}</div>
                </button>
              </div>
            ))}
          </div>

          {/* Hero Text */}
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold">
              <span className="text-gradient">Abdul Hasan</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Hi, I'm a passionate <span className="text-primary font-semibold">Full-Stack Developer</span> specializing in web applications, API integrations, and creative tech solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-orbitron group"
              >
                Hire Me
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('portfolio')}
                className="border-primary text-primary hover:bg-primary/10 font-orbitron"
              >
                See My Works
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
