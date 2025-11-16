import { ExternalLink, Code, Image, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { ImageModal } from "./ImageModal";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";



export function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState<{ url: string; caption: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const result = await api.getPortfolioV2();
        if (result.success) {
          setProjects(result.data);
        }
      } catch (error) {
        console.error('Error loading portfolio:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  const openImageModal = (images: { url: string; caption: string }[]) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };

  return (
    <section id="portfolio" className="min-h-screen flex items-center py-20 bg-gradient-to-b from-space-blue/20 to-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
            <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing projects that combine cutting-edge technology with practical business solutions
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
            <div
              key={project.id}
              className="glassmorphism rounded-xl overflow-hidden hover:glow-cyan transition-all duration-500 group hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                {project.cover_image ? (
                  <img 
                    src={project.cover_image.startsWith('http') ? project.cover_image : `http://localhost:3000${project.cover_image}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="w-20 h-20 text-primary/40 group-hover:text-primary/60 transition-colors" />
                  </div>
                )}
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
                  {project.tech && project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openImageModal(project.images)}
                    className="border-primary text-primary hover:bg-primary/10 group/btn"
                  >
                    <Image className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  </Button>
                  <Link to={`/project/${project.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-secondary text-secondary hover:bg-secondary/10 group/btn"
                    >
                      <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 group/btn"
                  >
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
        
        <ImageModal
          images={selectedImages}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
}
