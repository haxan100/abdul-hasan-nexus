import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function TechnicalSkills() {
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const result = await api.getSkillsV2();
        if (result.success) {
          setSkills(result.data);
        }
      } catch (error) {
        console.error('Error loading skills:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gradient-to-b from-background to-space-blue/10">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16">
              <span className="text-gradient">Technical Skills</span>
            </h2>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-space-blue/10">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-16">
            <span className="text-gradient">Technical Skills</span>
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="glassmorphism p-4 rounded-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
                    <span className="text-foreground font-medium">{skill}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}