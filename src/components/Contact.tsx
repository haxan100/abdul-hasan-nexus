import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Github, Linkedin, Youtube, Send as TelegramIcon, Mail, Send } from "lucide-react";
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: TelegramIcon, href: "#", label: "Telegram" },
  ];

  return (
    <section id="contact" className="min-h-screen flex items-center py-20 bg-gradient-to-b from-space-blue/20 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-4">
              <span className="text-gradient">Let's Connect</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's build something amazing together!
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Form */}
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="glassmorphism p-8 rounded-2xl space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="bg-background/50 border-primary/30 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 font-orbitron group"
                >
                  <Send className="mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Social Links & Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="glassmorphism p-6 rounded-2xl">
                <h3 className="font-orbitron font-bold text-lg mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Get In Touch
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Feel free to reach out through any of these platforms. I'm always open to discussing new projects and opportunities.
                </p>
                <div className="space-y-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-primary/10 border border-border hover:border-primary/50 transition-all group"
                      >
                        <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="glassmorphism p-6 rounded-2xl">
                <h3 className="font-orbitron font-bold text-lg mb-3">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  Average response time: <span className="text-primary font-semibold">24 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
