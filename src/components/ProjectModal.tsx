import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface Project {
  id: number;
  title: string;
  tech: string;
  image: string;
  description: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-orbitron text-2xl text-gradient">
            {project.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="space-y-2">
            <p className="text-primary font-semibold">{project.tech}</p>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}