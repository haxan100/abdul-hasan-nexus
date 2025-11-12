import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, Users, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageModal } from "@/components/ImageModal";
import { useState } from "react";

const projectsData = {
  "e-commerce-platform": {
    title: "E-Commerce Platform",
    description: "Full-featured online store with payment gateway integration, inventory management, and real-time analytics",
    tech: ["Laravel", "Vue.js", "MySQL", "Redis"],
    duration: "6 months",
    team: "4 developers",
    year: "2023",
    images: [
      { url: "/placeholder.svg", caption: "Homepage with product showcase and search functionality" },
      { url: "/placeholder.svg", caption: "Admin dashboard for inventory management" },
      { url: "/placeholder.svg", caption: "Payment gateway integration with multiple providers" },
      { url: "/placeholder.svg", caption: "Mobile responsive design" },
      { url: "/placeholder.svg", caption: "Real-time analytics dashboard" }
    ],
    features: [
      "Multi-vendor marketplace",
      "Real-time inventory tracking",
      "Payment gateway integration",
      "Advanced search & filtering",
      "Mobile responsive design",
      "Admin analytics dashboard"
    ],
    challenges: "Implementing real-time inventory synchronization across multiple vendors while maintaining high performance.",
    solution: "Used Redis for caching and WebSocket connections for real-time updates, reducing page load times by 60%."
  },
  "api-integration-hub": {
    title: "API Integration Hub",
    description: "Centralized API management system connecting multiple third-party services with rate limiting and caching",
    tech: ["Node.js", "Express", "Redis", "RabbitMQ"],
    duration: "4 months",
    team: "3 developers",
    year: "2023",
    images: [
      { url: "/placeholder.svg", caption: "API dashboard showing real-time metrics" },
      { url: "/placeholder.svg", caption: "Rate limiting configuration panel" },
      { url: "/placeholder.svg", caption: "API documentation interface" }
    ],
    features: [
      "Centralized API management",
      "Rate limiting & throttling",
      "Real-time monitoring",
      "Automatic documentation",
      "Error tracking & logging"
    ],
    challenges: "Managing high-volume API requests while ensuring system stability and performance.",
    solution: "Implemented intelligent rate limiting and caching strategies, handling 10k+ requests per minute."
  }
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImages, setSelectedImages] = useState<{ url: string; caption: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  const project = slug ? projectsData[slug as keyof typeof projectsData] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-orbitron mb-4">Project Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const openImageModal = (images: { url: string; caption: string }[], index: number = 0) => {
    setSelectedImages(images);
    setInitialIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-space-deep via-background to-background">
      <div className="container px-4 py-8">
        <Link to="/#portfolio">
          <Button variant="ghost" className="mb-8 text-primary hover:text-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
              <span className="text-gradient">{project.title}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              {project.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 glassmorphism px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm">{project.duration}</span>
              </div>
              <div className="flex items-center gap-2 glassmorphism px-4 py-2 rounded-lg">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm">{project.team}</span>
              </div>
              <div className="flex items-center gap-2 glassmorphism px-4 py-2 rounded-lg">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-sm">{project.year}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {project.images.map((image, index) => (
              <div
                key={index}
                onClick={() => openImageModal(project.images, index)}
                className="glassmorphism rounded-lg overflow-hidden cursor-pointer hover:glow-cyan transition-all duration-300 hover:scale-105"
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="glassmorphism p-6 rounded-xl">
              <h3 className="text-xl font-orbitron font-bold mb-4 text-gradient">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="glassmorphism p-6 rounded-xl">
                <h3 className="text-xl font-orbitron font-bold mb-4 text-gradient">Challenge</h3>
                <p className="text-muted-foreground">{project.challenges}</p>
              </div>

              <div className="glassmorphism p-6 rounded-xl">
                <h3 className="text-xl font-orbitron font-bold mb-4 text-gradient">Solution</h3>
                <p className="text-muted-foreground">{project.solution}</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Live Demo
            </Button>
          </div>
        </div>
      </div>

      <ImageModal
        images={selectedImages}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={initialIndex}
      />
    </div>
  );
}