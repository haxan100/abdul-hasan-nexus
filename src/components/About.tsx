import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function About() {
  const [displayedText, setDisplayedText] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const fullText = "Turning ideas into scalable, beautiful, and efficient systems.";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const result = await api.getTechnicalSkills();
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

  return (
    <section id="about" className="min-h-screen flex items-center py-20 bg-gradient-to-b from-background to-space-blue/20">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center mb-4">
            <span className="text-gradient">About Me</span>
          </h2>
          
          <div className="h-8 mb-12 text-center">
            <p className="text-lg md:text-xl text-primary font-medium font-orbitron">
              {displayedText}
              <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
            </p>
          </div>

          <div className="glassmorphism p-8 md:p-12 rounded-2xl space-y-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                My name is <span className="text-foreground font-semibold">Abdul Hasan</span>, a graduate from{" "}
                <span className="text-foreground font-semibold">S1 STIKOM CKI Cengkareng</span> (Akreditasi B).
              </p>
              
              <p className="text-lg">
                With over <span className="text-primary font-semibold">5 years of experience</span> as a Full-Stack Developer,
                I specialize in building robust web applications and seamless integrations.
              </p>

              <div className="pt-4">
                <h3 className="text-xl font-orbitron font-bold text-foreground mb-3">Technical Skills</h3>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-3">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
                        <span className="text-foreground">{skill}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <h3 className="text-xl font-orbitron font-bold text-foreground mb-3">Focus Areas</h3>
                <p className="text-lg">
                  I focus on developing <span className="text-secondary font-semibold">e-commerce systems</span>,{" "}
                  <span className="text-secondary font-semibold">business automation</span>, and{" "}
                  <span className="text-secondary font-semibold">cross-platform integrations</span> that drive business growth and efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
