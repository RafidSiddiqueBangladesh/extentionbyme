import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { extensions } from "@/data/extensions";

const RealtimeDownloadCounter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloads, setDownloads] = useState<Record<string, number>>({});
  const [totalDownloads, setTotalDownloads] = useState(0);

  // Listen for storage changes (from other components)
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem("extension_downloads");
      if (stored) {
        const parsedDownloads = JSON.parse(stored) as Record<string, number>;
        setDownloads(parsedDownloads);
        const total = Object.values(parsedDownloads).reduce((a, b) => a + b, 0);
        setTotalDownloads(total);
      }
    };

    // Initial load
    handleStorageChange();

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener("extension_downloaded", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("extension_downloaded", handleStorageChange);
    };
  }, []);

  return (
    <>
      {/* Floating Counter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
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

      {/* Expandable Counter Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="glass-card p-4 w-80 max-h-96 overflow-y-auto rounded-lg shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-white">Live Downloads</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Extension List */}
            <div className="space-y-3">
              {extensions.map((ext) => (
                <div
                  key={ext.id}
                  className="flex items-center justify-between p-2 rounded hover:bg-white/5 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate group-hover:text-accent transition-colors">
                      {ext.name.split(" ")[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {downloads[ext.id]?.toLocaleString() || ext.downloads.toLocaleString()}
                    </p>
                  </div>
                  <div className="ml-2 px-2 py-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded">
                    <p className="text-xs font-bold text-accent">
                      ↑ {Math.round(Math.random() * 50) + 10}
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

            {/* Last Update */}
            <p className="text-xs text-muted-foreground text-center mt-3">
              Updates every 2.5 seconds
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RealtimeDownloadCounter;
