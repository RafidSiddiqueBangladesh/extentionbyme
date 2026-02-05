import { useState, useEffect } from "react";
import { Download, ChevronDown, ChevronUp, Check, AlertCircle, Play, Zap, Shield, BarChart3, Eye, Brain, X } from "lucide-react";
import { getGoogleDriveImageUrl } from "@/utils/googleDrive";

interface ToolSectionProps {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  icon: React.ElementType;
  videoId: string;
  requiresApi: boolean;
  mockupImage: string;
  howToUse: string[];
  zipUrl?: string;
}

const installationSteps = [
  "Download the ZIP file from the button above",
  "Unzip the downloaded file to a folder",
  "Open Chrome and go to chrome://extensions",
  "Enable 'Developer Mode' in the top right corner",
  "Click 'Load Unpacked' button",
  "Select the unzipped folder and confirm",
];

const ToolSection = ({ 
  id, 
  name, 
  description, 
  longDescription,
  icon: Icon, 
  videoId, 
  requiresApi,
  mockupImage,
  howToUse,
  zipUrl,
}: ToolSectionProps) => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [downloadCount, setDownloadCount] = useState(0);

  // Load initial download count
  useEffect(() => {
    const stored = localStorage.getItem(`extension_downloads_${id}`);
    if (stored) {
      setDownloadCount(parseInt(stored));
    }
  }, [id]);

  const handleDownload = () => {
    const newCount = downloadCount + 1;
    setDownloadCount(newCount);
    localStorage.setItem(`extension_downloads_${id}`, newCount.toString());
    
    // Dispatch custom event for counter updates
    window.dispatchEvent(new CustomEvent("extension_downloaded", { detail: { id, count: newCount } }));
    
    // Trigger ZIP download
    if (zipUrl) {
      // Convert Google Drive view link to direct download link
      const fileIdMatch = zipUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      const fileId = fileIdMatch ? fileIdMatch[1] : null;
      
      if (fileId) {
        // Direct download URL from Google Drive
        const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        const link = document.createElement("a");
        link.href = directDownloadUrl;
        link.download = `${name.replace(/\s+/g, "-")}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <section id={`tool-${id}`} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left - Mockup Image */}
          <div className="order-2 lg:order-1">
            <div className="glass-card p-4 animate-fade-in">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted/20">
                <img 
                  src={getGoogleDriveImageUrl(mockupImage)} 
                  alt={`${name} interface`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.backgroundColor = "#1a1a1a";
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-3">
                {name} Interface Preview
              </p>
            </div>
          </div>

          {/* Center - Main Glass Panel */}
          <div className="order-1 lg:order-2">
            <div className="glass-strong p-8 rounded-3xl border-glow animate-fade-in">
              {/* Icon */}
              <div className="icon-glow w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Icon className="w-10 h-10 text-primary" />
              </div>

              {/* Title & Description */}
              <h2 className="text-3xl font-bold text-center mb-4 text-gradient">{name}</h2>
              <p className="text-lg text-muted-foreground text-center mb-6">{description}</p>
              <p className="text-sm text-muted-foreground/80 text-center mb-8">{longDescription}</p>

              {/* API Badge */}
              <div className="flex justify-center mb-8">
                <div className={`glass px-4 py-2 rounded-full flex items-center gap-2 ${
                  requiresApi ? 'border-secondary/50' : 'border-accent/50'
                }`}>
                  {requiresApi ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-secondary" />
                      <span className="text-sm">API Key Required</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-accent" />
                      <span className="text-sm">No API Needed</span>
                    </>
                  )}
                </div>
              </div>

              {/* Download Button */}
              <button 
                onClick={handleDownload}
                className="btn-glass-primary w-full flex items-center justify-center gap-3 mb-6 relative group"
              >
                <Download className="w-5 h-5" />
                <span>Download {name}</span>
                {downloadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-background text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {downloadCount}
                  </span>
                )}
              </button>

              {/* Collapsible Instructions */}
              <div className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setIsInstructionsOpen(!isInstructionsOpen)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/20 transition-colors"
                >
                  <span className="font-semibold">Installation & Usage Guide</span>
                  {isInstructionsOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                
                {isInstructionsOpen && (
                  <div className="px-4 pb-4 space-y-6 animate-fade-in">
                    {/* Installation Steps */}
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Installation Steps</h4>
                      <ol className="space-y-2">
                        {installationSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* How to Use */}
                    <div>
                      <h4 className="font-semibold mb-3 text-accent">How to Use</h4>
                      <ul className="space-y-2">
                        {howToUse.map((step, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Video */}
          <div className="order-3">
            <div className="video-glass-frame animate-fade-in">
              <div className="aspect-video rounded-xl overflow-hidden bg-muted/20 relative group cursor-pointer">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`${name} Tutorial`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-3">
                Watch Tutorial Video
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

// Tool data
const toolsData: ToolSectionProps[] = [
  {
    id: 1,
    name: "Video Certificate Generator",
    description: "Track video watching progress and generate certificates",
    longDescription: "Real-time watch time tracking with 70% completion threshold. Generates beautiful HTML5 Canvas certificates. Automatically detects playlists. Download certificates as PNG. All data stored locally.",
    icon: Zap,
    videoId: "tHvdSP-UQyI",
    requiresApi: false,
    mockupImage: "/images/certificate  generator.png",
    howToUse: [
      "Install the extension and start watching videos",
      "Progress is tracked automatically in the sidebar",
      "Reach 70% watch time to unlock certificate",
      "Download your certificate as PNG",
    ],
    zipUrl: "https://drive.google.com/file/d/14cGkXFp7GTnQe46X3xIcH9hcdbXhnuvC/view?usp=sharing",
  },
  {
    id: 2,
    name: "Speed - Video Speed Controller",
    description: "Speed up YouTube and any video up to 4x",
    longDescription: "Control playback speed with preset buttons (0.5x to 4x). Custom speed slider for fine-tuning. Works on YouTube, Vimeo, and all HTML5 video players. One-click reset. Keyboard shortcuts support.",
    icon: Zap,
    videoId: "P0tXHG_hL2U",
    requiresApi: false,
    mockupImage: "/images/speed.png",
    howToUse: [
      "Click the extension icon to open speed controls",
      "Use preset buttons or the custom slider",
      "Speed applies instantly to any video",
      "Use Ctrl+Shift+= and Ctrl+Shift+- for keyboard control",
    ],
    zipUrl: "https://drive.google.com/file/d/15FRrZ6LCYCo5Uvu94FtLPY1QnCK8h9lf/view?usp=sharing",
  },
  {
    id: 3,
    name: "Tech Detective",
    description: "Detect 500+ technologies with AI tool detection",
    longDescription: "Detects 500+ technologies with 100% accuracy via 5 detection methods (HTML, DOM, JS, Headers, Scripts). AI tool detection for OpenAI, Claude, Gemini. Competitor analysis and side-by-side tech stack comparison.",
    icon: Shield,
    videoId: "Shywq1sdEkE",
    requiresApi: false,
    mockupImage: "/images/tech detector.png",
    howToUse: [
      "Click the extension icon on any website",
      "View detected technologies in the popup",
      "Analyze competitor tech stacks",
      "Compare technologies side-by-side",
    ],
    zipUrl: "https://drive.google.com/file/d/177oxkpsmsPu3P-8gKZAnjOT37Di24Xo3/view?usp=sharing",
  },
  {
    id: 4,
    name: "YouTube & FB Analytics",
    description: "Extract YouTube and Facebook metrics instantly",
    longDescription: "Get channel, video, and post data with formatted metrics. YouTube: likes, comments, views. Facebook: post reactions and engagement. SEO keyword competitor analysis included.",
    icon: BarChart3,
    videoId: "DmW0EJFrrLg",
    requiresApi: false,
    mockupImage: "/images/youtibe and fb.png",
    howToUse: [
      "Visit any YouTube video or Facebook post",
      "Click the extension icon to extract data",
      "View formatted metrics and competitor info",
      "Export data for your analysis",
    ],
    zipUrl: "https://drive.google.com/file/d/177oxkpsmsPu3P-8gKZAnjOT37Di24Xo3/view?usp=sharing",
  },
  {
    id: 5,
    name: "LeetCode Whisper",
    description: "AI-powered hints for LeetCode problems",
    longDescription: "Get intelligent hints from GPT-4o or Gemini. Interactive chat interface to ask questions. AI analyzes your code directly from LeetCode editor. Chat history per problem. Secure local API key storage.",
    icon: Brain,
    videoId: "wwU0an5cXFg",
    requiresApi: true,
    mockupImage: "/images/letcodesolver.png",
    howToUse: [
      "Enter your OpenAI or Google API key in settings",
      "Open any LeetCode problem",
      "Ask the AI for hints or code analysis",
      "View chat history for the problem",
    ],
    zipUrl: "https://drive.google.com/file/d/16A5cY3R3C0dDKn1nXFVp0MZx4uu9K4fO/view?usp=sharing",
  },
];

const ToolSections = () => {
  const [allDownloads, setAllDownloads] = useState<Record<number, number>>({});
  const [isCounterOpen, setIsCounterOpen] = useState(false);

  useEffect(() => {
    // Load all download counts
    const counts: Record<number, number> = {};
    toolsData.forEach((tool) => {
      const stored = localStorage.getItem(`extension_downloads_${tool.id}`);
      counts[tool.id] = stored ? parseInt(stored) : 0;
    });
    setAllDownloads(counts);

    // Listen for download events
    const handleDownload = (e: CustomEvent) => {
      const { id, count } = e.detail;
      setAllDownloads((prev) => ({ ...prev, [id]: count }));
    };

    window.addEventListener("extension_downloaded", handleDownload as EventListener);
    return () => window.removeEventListener("extension_downloaded", handleDownload as EventListener);
  }, []);

  const totalDownloads = Object.values(allDownloads).reduce((a, b) => a + b, 0);

  return (
    <>
      <div className="relative">
        {toolsData.map((tool) => (
          <ToolSection key={tool.id} {...tool} />
        ))}
      </div>

      {/* Real-time Download Counter */}
      <button
        onClick={() => setIsCounterOpen(!isCounterOpen)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Animated pulse background */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full opacity-75 group-hover:opacity-100 transition-opacity blur-lg" />
          
          {/* Main button */}
          <div className="relative bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 rounded-full p-3 shadow-lg hover:shadow-xl transition-all transform group-hover:scale-110">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-white animate-pulse" />
              <span className="text-sm font-bold text-white min-w-[50px]">
                {totalDownloads.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg" />
        </div>
      </button>

      {/* Counter Details Panel */}
      {isCounterOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="glass-card p-4 w-80 max-h-96 overflow-y-auto rounded-lg shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-white">Downloads</h3>
              </div>
              <button
                onClick={() => setIsCounterOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Extension List */}
            <div className="space-y-3">
              {toolsData.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate group-hover:text-accent transition-colors">
                      {tool.name.split(" ")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {allDownloads[tool.id]?.toLocaleString() || "0"} downloads
                    </p>
                  </div>
                  <div className="ml-2 px-2 py-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded">
                    <p className="text-xs font-bold text-accent">
                      ↓
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Total</p>
                <p className="text-lg font-bold text-gradient">
                  {totalDownloads.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ToolSections;
