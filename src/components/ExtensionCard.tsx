import { Download, ExternalLink, Play, Zap } from "lucide-react";
import { Extension } from "@/data/extensions";

interface ExtensionCardProps {
  extension: Extension;
  downloads: number;
  onDownload: (extensionId: string) => void;
}

const ExtensionCard = ({ extension, downloads, onDownload }: ExtensionCardProps) => {
  const handleDownload = () => {
    onDownload(extension.id);
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent("extension_downloaded"));
    
    // Simulate ZIP download
    const link = document.createElement("a");
    link.href = extension.zipUrl || "#";
    link.download = `${extension.id}-extension.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="glass-card p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{extension.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {extension.description}
          </p>
        </div>
        <div className="ml-4 flex items-center gap-2 bg-gradient-to-r from-accent/20 to-primary/20 px-3 py-1 rounded-full">
          <Download className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold text-white">{downloads.toLocaleString()}</span>
        </div>
      </div>

      {/* Features */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Features</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {extension.features.slice(0, 4).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1 flex-shrink-0" />
              <span className="text-xs text-muted-foreground line-clamp-1">{feature}</span>
            </div>
          ))}
        </div>
        {extension.features.length > 4 && (
          <p className="text-xs text-primary/60 mt-2 font-medium">
            +{extension.features.length - 4} more features
          </p>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-2">
        {extension.youtubeUrl && (
          <a
            href={extension.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 btn-glass flex items-center justify-center gap-2 text-sm py-2 hover:bg-accent/20"
          >
            <Play className="w-4 h-4" />
            Watch Demo
          </a>
        )}
        <button 
          onClick={handleDownload}
          className="flex-1 btn-glass-primary flex items-center justify-center gap-2 text-sm py-2"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button className="btn-glass p-2">
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ExtensionCard;
