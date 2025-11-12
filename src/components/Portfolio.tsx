import { ExternalLink, Code } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-featured online store with payment gateway integration, inventory management, and real-time analytics",
    tech: ["Laravel", "Vue.js", "MySQL", "Redis"],
    image: "e-commerce",
  },
  {
    id: 2,
    title: "API Integration Hub",
    description: "Centralized API management system connecting multiple third-party services with rate limiting and caching",
    tech: ["Node.js", "Express", "Redis", "RabbitMQ"],
    image: "api-hub",
  },
  {
    id: 3,
    title: "Business Automation System",
    description: "Automated workflow management for enterprise operations with custom rule engine and notifications",
    tech: ["PHP", "CodeIgniter", "MySQL", "RabbitMQ"],
    image: "automation",
  },
  {
    id: 4,
    title: "CMS Dashboard",
    description: "Content management system with real-time collaboration, version control, and multi-language support",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    image: "cms",
  },
  {
    id: 5,
    title: "Payment Gateway Integration",
    description: "Secure payment processing system with multiple gateway support and fraud detection",
    tech: ["CodeIgniter", "MySQL", "Stripe", "Midtrans"],
    image: "payment",
  },
  {
    id: 6,
    title: "Inventory Management",
    description: "Real-time inventory tracking with barcode scanning, alerts, and predictive analytics",
    tech: ["Laravel", "MySQL", "Redis", "Chart.js"],
    image: "inventory",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-space-blue/20 to-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing projects that combine cutting-edge technology with practical business solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="glassmorphism rounded-xl overflow-hidden hover:glow-cyan transition-all duration-500 group hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-20 h-20 text-primary/40 group-hover:text-primary/60 transition-colors" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-orbitron font-bold text-foreground group-hover:text-gradient transition-all">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-primary text-primary hover:bg-primary/10 group/btn"
                  >
                    <Code className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                    View Code
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 group/btn"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
