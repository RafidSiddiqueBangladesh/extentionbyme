import FloatingParticles from "@/components/FloatingParticles";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsSlider from "@/components/ToolsSlider";
import ToolSections from "@/components/ToolSections";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* Floating particles background */}
      <FloatingParticles />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <ToolsSlider />
        <ToolSections />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
