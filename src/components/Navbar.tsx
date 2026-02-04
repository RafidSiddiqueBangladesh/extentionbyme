import { Chrome, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="container mx-auto">
        <div className="glass px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Chrome className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">ExtensionHub</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('tools-slider')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Tools
            </button>
            <button 
              onClick={() => scrollToSection('tool-1')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Extensions
            </button>
            <a 
              href="#" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </a>
            <button className="btn-glass-primary py-2 px-4 text-sm">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 glass p-4 rounded-xl animate-fade-in">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('tools-slider')}
                className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Tools
              </button>
              <button 
                onClick={() => scrollToSection('tool-1')}
                className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Extensions
              </button>
              <a 
                href="#" 
                className="py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Docs
              </a>
              <button className="btn-glass-primary py-2 px-4 text-sm mt-2">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
