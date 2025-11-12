import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <ThemeToggle />
      <div className="snap-start"><Hero /></div>
      <div className="snap-start"><About /></div>
      <div className="snap-start"><Portfolio /></div>
      <div className="snap-start"><Experience /></div>
      <div className="snap-start"><Contact /></div>
      <Footer />
    </div>
  );
};

export default Index;
