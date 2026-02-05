import { tools } from "@/data/tools";
import { Eye } from "lucide-react";

const ToolsSlider = () => {
  const scrollToTool = (id: number) => {
    document.getElementById(`tool-${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="tools-slider" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-gradient">Powerful Extensions</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Discover our collection of premium Chrome extensions designed to boost your productivity
        </p>
      </div>

      {/* Infinite slider */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="slider-track">
          {/* Duplicate items for seamless loop */}
          {[...tools, ...tools].map((tool, index) => (
            <div
              key={`${tool.id}-${index}`}
              className="flex-shrink-0 w-80 mx-4"
            >
              <div className="glass-card group cursor-pointer h-full">
                {/* Icon with glow */}
                <div className={`icon-glow w-16 h-16 flex items-center justify-center mb-6 group-hover:animate-pulse-glow`}>
                  <tool.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{tool.name}</h3>
                <p className="text-muted-foreground mb-6">{tool.description}</p>

                <button 
                  onClick={() => scrollToTool(tool.id)}
                  className="btn-glass text-sm py-2 px-4 w-full flex items-center justify-center gap-2 group-hover:border-glow"
                >
                  <Eye className="w-4 h-4" />
                  View Tool
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSlider;
