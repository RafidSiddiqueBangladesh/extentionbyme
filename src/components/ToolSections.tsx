import { useState } from "react";
import { Download, ChevronDown, ChevronUp, Check, AlertCircle, Play, Zap, Shield, BarChart3, Eye } from "lucide-react";

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
  howToUse 
}: ToolSectionProps) => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  return (
    <section id={`tool-${id}`} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left - Mockup Image */}
          <div className="order-2 lg:order-1">
            <div className="glass-card p-4 animate-fade-in">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted/20">
                <img 
                  src={mockupImage} 
                  alt={`${name} interface`}
                  className="w-full h-full object-cover"
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
              <button className="btn-glass-primary w-full flex items-center justify-center gap-3 mb-6">
                <Download className="w-5 h-5" />
                Download {name}
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
    name: "Speed Analyzer",
    description: "Analyze and optimize website loading performance",
    longDescription: "Get detailed insights into page load times, resource usage, and performance bottlenecks. Receive actionable recommendations to make websites faster.",
    icon: Zap,
    videoId: "dQw4w9WgXcQ",
    requiresApi: false,
    mockupImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    howToUse: [
      "Click the extension icon on any webpage",
      "Wait for the analysis to complete",
      "Review the performance score and metrics",
      "Follow the optimization suggestions",
    ],
  },
  {
    id: 2,
    name: "Privacy Guard",
    description: "Protect your browsing data with advanced security",
    longDescription: "Block trackers, manage cookies, and ensure your online privacy. Get real-time alerts about potential security threats.",
    icon: Shield,
    videoId: "dQw4w9WgXcQ",
    requiresApi: false,
    mockupImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    howToUse: [
      "Enable the extension from the toolbar",
      "Configure your privacy preferences",
      "Browse normally - threats are blocked automatically",
      "Check the dashboard for blocked trackers",
    ],
  },
  {
    id: 3,
    name: "Analytics Pro",
    description: "Track productivity metrics and browsing patterns",
    longDescription: "Understand how you spend time online with detailed analytics. Set goals, track progress, and optimize your digital habits.",
    icon: BarChart3,
    videoId: "dQw4w9WgXcQ",
    requiresApi: true,
    mockupImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    howToUse: [
      "Enter your API key in the settings",
      "Let the extension track your browsing",
      "View detailed reports in the dashboard",
      "Set productivity goals and track progress",
    ],
  },
  {
    id: 4,
    name: "Focus Mode",
    description: "Block distractions and stay focused",
    longDescription: "Create custom block lists, set focus sessions, and eliminate digital distractions. Boost your productivity with Pomodoro timers and break reminders.",
    icon: Eye,
    videoId: "dQw4w9WgXcQ",
    requiresApi: false,
    mockupImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
    howToUse: [
      "Add distracting websites to your block list",
      "Start a focus session from the popup",
      "The extension blocks listed sites during sessions",
      "Take scheduled breaks when prompted",
    ],
  },
];

const ToolSections = () => {
  return (
    <div className="relative">
      {toolsData.map((tool) => (
        <ToolSection key={tool.id} {...tool} />
      ))}
    </div>
  );
};

export default ToolSections;
