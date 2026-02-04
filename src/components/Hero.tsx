import { ArrowRight, Download } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const Hero = () => {
  const scrollToTools = () => {
    document.getElementById('tools-slider')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm text-muted-foreground">Chrome Extension Platform</span>
        </div>

        {/* Main glass card */}
        <div className="glass-card p-8 md:p-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-glow">Fast your speed</span>
            <br />
            <span className="text-gradient">and get recognition</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Supercharge your productivity with our powerful Chrome extensions. 
            Automate workflows, enhance visibility, and achieve more in less time.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToTools}
              className="btn-glass-primary group flex items-center gap-3"
            >
              Explore Tools
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="btn-glass flex items-center gap-3">
              <Download className="w-5 h-5" />
              Download Extensions
            </button>
          </div>
        </div>

        {/* Floating stats with animated counters */}
        <div className="grid grid-cols-3 gap-4 mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="glass p-4 rounded-xl text-center hover:border-glow transition-all duration-300">
            <AnimatedCounter end={52400} suffix="+" duration={2500} />
            <div className="text-sm text-muted-foreground">Downloads</div>
          </div>
          <div className="glass p-4 rounded-xl text-center hover:border-glow transition-all duration-300">
            <AnimatedCounter end={4900} prefix="" suffix="" duration={2000} />
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
          <div className="glass p-4 rounded-xl text-center hover:border-glow transition-all duration-300">
            <AnimatedCounter end={10} suffix="+" duration={1500} />
            <div className="text-sm text-muted-foreground">Extensions</div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border border-secondary/20 rounded-full animate-float-delayed" />
      <div className="absolute top-1/2 left-5 w-16 h-16 border border-accent/20 rounded-full animate-float-slow" />
    </section>
  );
};

export default Hero;
