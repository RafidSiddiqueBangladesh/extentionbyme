import { Chrome, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Logo & Description */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="icon-glow w-12 h-12 flex items-center justify-center">
                  <Chrome className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xl font-bold text-gradient">ExtensionHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Premium Chrome extensions for productivity and privacy.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Support
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center md:justify-end gap-4">
              <a 
                href="#" 
                className="btn-glass p-3 rounded-xl hover:border-glow"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="btn-glass p-3 rounded-xl hover:border-glow"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="btn-glass p-3 rounded-xl hover:border-glow"
                aria-label="Chrome Web Store"
              >
                <Chrome className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright & Credits */}
          <div className="mt-8 pt-8 border-t border-border/30 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ExtensionHub. All rights reserved.
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Built by </span>
              <span className="text-gradient font-semibold">Rafid Siddique</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
