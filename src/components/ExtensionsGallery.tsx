import { useState, useEffect } from "react";
import { extensions } from "@/data/extensions";
import ExtensionCard from "./ExtensionCard";

const ExtensionsGallery = () => {
  const [downloads, setDownloads] = useState<Record<string, number>>({});

  // Initialize downloads from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("extension_downloads");
    if (stored) {
      setDownloads(JSON.parse(stored));
    } else {
      const initialDownloads: Record<string, number> = {};
      extensions.forEach((ext) => {
        initialDownloads[ext.id] = ext.downloads;
      });
      setDownloads(initialDownloads);
      localStorage.setItem("extension_downloads", JSON.stringify(initialDownloads));
    }
  }, []);

  const handleExtensionDownload = (extensionId: string) => {
    setDownloads((prev) => {
      const updated = { ...prev };
      updated[extensionId] = (updated[extensionId] || 0) + 1;
      localStorage.setItem("extension_downloads", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <section className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-gradient">Chrome Extensions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed to supercharge your productivity and enhance your browsing experience
          </p>
        </div>

        {/* Extensions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {extensions.map((extension, idx) => (
            <div
              key={extension.id}
              className="animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <ExtensionCard
                extension={extension}
                downloads={downloads[extension.id] || extension.downloads}
                onDownload={handleExtensionDownload}
              />
            </div>
          ))}
        </div>

        {/* Total Stats */}
        <div className="mt-16 glass-card p-8 text-center">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {Object.values(downloads).reduce((a, b) => a + b, 0).toLocaleString()}
              </p>
              <p className="text-muted-foreground">Total Downloads</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {extensions.length}
              </p>
              <p className="text-muted-foreground">Extensions</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                500+
              </p>
              <p className="text-muted-foreground">Technologies Detected</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtensionsGallery;
