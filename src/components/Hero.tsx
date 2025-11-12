import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectModal } from "./ProjectModal";

const projects = [
  { id: 1, title: "E-Commerce Platform", tech: "Laravel + Vue.js", image: "/placeholder.svg", description: "Full-featured e-commerce platform with payment integration and admin dashboard." },
  { id: 2, title: "API Integration Hub", tech: "Node.js + Redis", image: "/placeholder.svg", description: "Centralized API management system with caching and rate limiting." },
  { id: 3, title: "Automation System", tech: "PHP + RabbitMQ", image: "/placeholder.svg", description: "Automated workflow system for business process optimization." },
  { id: 4, title: "CMS Dashboard", tech: "React + MySQL", image: "/placeholder.svg", description: "Content management system with real-time editing capabilities." },
  { id: 5, title: "Payment Gateway", tech: "CodeIgniter", image: "/placeholder.svg", description: "Secure payment processing system with multiple gateway support." },
  { id: 6, title: "Real-time Chat", tech: "WebSocket + Redis", image: "/placeholder.svg", description: "Real-time messaging application with file sharing and group chat." },
  { id: 7, title: "Analytics Dashboard", tech: "React + PostgreSQL", image: "/placeholder.svg", description: "Data visualization dashboard with interactive charts and reports." },
  { id: 8, title: "Microservices API", tech: "Node.js + Docker", image: "/placeholder.svg", description: "Scalable microservices architecture with containerized deployment." },
  { id: 9, title: "Inventory System", tech: "Laravel + MySQL", image: "/placeholder.svg", description: "Inventory management system with barcode scanning and reporting." },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className="relative w-full max-w-4xl aspect-square mb-8 mx-auto">
            {/* Center Profile Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-white p-1 shadow-2xl">
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D5603AQEENpdwjOLNwA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1711003767182?e=1764806400&v=beta&t=sC2bnFpcX0w-hNksIZflUz956WsAkCfwwdM8pQd8A3w"
                    alt="Abdul Hasan Profile"
                    className="w-full h-full rounded-full object-cover border-2 border-gray-200 shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Orbiting Projects - Fixed Distance */}
            {mounted && projects.map((project, index) => (
              <div
                key={project.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  animation: `orbit-fixed ${30 + index * 5}s linear infinite`,
                  animationDelay: `${-index * 5}s`,
                }}
              >
                <button
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                  className="glassmorphism px-3 py-2 rounded-xl hover:glow-cyan transition-all duration-300 hover:scale-110 group cursor-pointer shadow-lg border-2 border-primary/20 hover:border-primary/50"
                >
                  <div className="text-sm font-orbitron font-bold text-primary group-hover:text-secondary transition-colors">
                    {project.title}
                  </div>
                  <div className="text-xs text-muted-foreground group-hover:text-primary/80 transition-colors">{project.tech}</div>
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
      
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
