import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectModal } from "./ProjectModal";
import { api } from "@/lib/api";



export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [heroData, setHeroData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const loadData = async () => {
      try {
        const [portfolioResult, heroResult] = await Promise.all([
          api.getPortfolioV2(),
          api.getHeroV2()
        ]);
        
        if (portfolioResult.success) {
          const formattedProjects = portfolioResult.data.map((project: any) => ({
            id: project.id,
            title: project.title,
            tech: project.tech && project.tech.length > 0 ? project.tech.join(' + ') : 'Web Development',
            image: project.cover_image || '/placeholder.svg',
            description: project.description
          }));
          setProjects(formattedProjects.slice(0, 9));
        }
        
        if (heroResult.success) {
          setHeroData(heroResult.data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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
            {mounted && !loading && projects.map((project, index) => (
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
              <span className="text-gradient">{heroData?.name || 'Abdul Hasan'}</span>
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground" dangerouslySetInnerHTML={{ __html: heroData?.description || "Hi, I'm a passionate <span class='text-primary font-semibold'>Full-Stack Developer</span> specializing in web applications, API integrations, and creative tech solutions." }} />
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
