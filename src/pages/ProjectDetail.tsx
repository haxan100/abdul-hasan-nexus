import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, Users, Code2, Star, Clock, User, Tag, Zap, Eye, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageModal } from "@/components/ImageModal";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

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
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState<{ url: string; caption: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      
      try {
        const id = Number(slug);
        if (!isNaN(id)) {
          const result = await api.getPortfolioDetailV2(id);
          if (result.success) {
            setProject(result.data);
          }
        }
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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

        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-3xl"></div>
            <div className="relative glassmorphism rounded-3xl p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                {project.featured && (
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">Featured Project</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6">
                <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text">
                  {project.title}
                </span>
              </h1>
              
              {project.subtitle && (
                <h2 className="text-2xl md:text-3xl text-secondary mb-6 font-light">{project.subtitle}</h2>
              )}
              
              {project.caption && (
                <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  {project.caption}
                </p>
              )}
              
              <div className="prose prose-lg max-w-4xl mx-auto mb-8">
                <p className="text-xl text-foreground/90 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {project.category && (
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                    <Tag className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-semibold text-primary">{project.category}</p>
                  </div>
                )}
                {project.duration && (
                  <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                    <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold text-secondary">{project.duration}</p>
                  </div>
                )}
                {project.client && (
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                    <User className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-semibold text-primary">{project.client}</p>
                  </div>
                )}
                {project.project_type && (
                  <div className="bg-secondary/10 rounded-xl p-4 border border-secondary/20">
                    <Code2 className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-semibold text-secondary">{project.project_type}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Technologies Section */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                  <span className="text-gradient">Technologies Used</span>
                </h2>
                <p className="text-muted-foreground">Cutting-edge tools and frameworks powering this project</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {project.technologies.map((tech: string, index: number) => (
                  <div
                    key={tech}
                    className="group glassmorphism rounded-xl p-6 text-center hover:glow-primary transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                      <Code2 className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="font-semibold text-sm group-hover:text-gradient transition-all">{tech}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cover Image */}
          {project.cover_image && (
            <div className="mb-16">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative glassmorphism rounded-2xl overflow-hidden">
                  <img
                    src={project.cover_image.startsWith('http') ? project.cover_image : `http://localhost:3000${project.cover_image}`}
                    alt={project.cover_caption || project.title}
                    className="w-full h-64 md:h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  {project.cover_caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-lg font-medium">{project.cover_caption}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Features Section */}
          {project.features && project.features.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                  <span className="text-gradient">Key Features</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">Powerful capabilities that make this project stand out</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.features.map((feature: string, index: number) => (
                  <div
                    key={index}
                    className="group glassmorphism rounded-xl p-6 hover:glow-secondary transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-secondary/30 group-hover:to-primary/30 transition-all">
                        <Zap className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-gradient transition-all mb-2">
                          {feature}
                        </h3>
                        <div className="w-full h-1 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full group-hover:from-secondary/40 group-hover:to-primary/40 transition-all"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Images */}
          {project.gallery_images && project.gallery_images.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                  <span className="text-gradient">Project Gallery</span>
                </h2>
                <p className="text-muted-foreground">Visual showcase of the project's interface and features</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.gallery_images.map((image: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => openImageModal(project.gallery_images, index)}
                    className="group relative glassmorphism rounded-xl overflow-hidden cursor-pointer hover:glow-primary transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={image.url.startsWith('http') ? image.url : `http://localhost:3000${image.url}`}
                        alt={image.caption}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    {image.caption && (
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{image.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {project.skills && project.skills.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
                  <span className="text-gradient">Skills Demonstrated</span>
                </h2>
                <p className="text-muted-foreground">Core competencies showcased in this project</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {project.skills.map((skill: string, index: number) => (
                  <span
                    key={skill}
                    className="px-6 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 text-secondary border border-secondary/30 hover:from-secondary/20 hover:to-primary/20 hover:scale-105 transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Background Image */}
          {project.background_image && (
            <div className="mb-16">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-primary/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative glassmorphism rounded-2xl overflow-hidden">
                  <img
                    src={project.background_image.startsWith('http') ? project.background_image : `http://localhost:3000${project.background_image}`}
                    alt={project.background_caption || 'Background'}
                    className="w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  {project.background_caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-lg font-medium">{project.background_caption}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="glassmorphism rounded-xl p-6 hover:glow-primary transition-all duration-500">
              <h3 className="text-xl font-orbitron font-bold mb-6 text-gradient flex items-center gap-2">
                <Star className="w-5 h-5" />
                Project Info
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-primary/10">
                  <span className="text-muted-foreground">ID</span>
                  <span className="font-semibold text-primary">#{project.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary/10">
                  <span className="text-muted-foreground">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary/10">
                  <span className="text-muted-foreground">Priority</span>
                  <span className="font-semibold text-secondary">{project.priority}</span>
                </div>
                {project.completion_date && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-semibold text-primary">{new Date(project.completion_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="glassmorphism rounded-xl p-6 hover:glow-secondary transition-all duration-500">
              <h3 className="text-xl font-orbitron font-bold mb-6 text-gradient flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                Quick Links
              </h3>
              <div className="space-y-3">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all group">
                    <Eye className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-primary font-medium">Live Website</span>
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-all group">
                    <Github className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform" />
                    <span className="text-secondary font-medium">Source Code</span>
                  </a>
                )}
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all group">
                    <ExternalLink className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-primary font-medium">Demo</span>
                  </a>
                )}
              </div>
            </div>

            <div className="glassmorphism rounded-xl p-6 hover:glow-primary transition-all duration-500">
              <h3 className="text-xl font-orbitron font-bold mb-6 text-gradient flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-primary/10">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-semibold text-primary">{new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-semibold text-secondary">{new Date(project.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="glassmorphism p-6 rounded-xl mb-12">
              <h3 className="text-2xl font-orbitron font-bold mb-6 text-center text-gradient">Key Features</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          {(project.demo_url || project.live_url || project.github_url) && (
            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-3xl"></div>
                <div className="relative glassmorphism rounded-3xl p-8 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
                    <span className="text-gradient">Explore This Project</span>
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Ready to see this project in action? Check out the live demo, explore the code, or visit the deployed application.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <Eye className="w-5 h-5 mr-3" />
                          View Live Site
                        </Button>
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                          <ExternalLink className="w-5 h-5 mr-3" />
                          Try Demo
                        </Button>
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                          <Github className="w-5 h-5 mr-3" />
                          View Source
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
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