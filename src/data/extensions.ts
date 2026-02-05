export interface Extension {
  id: string;
  name: string;
  description: string;
  features: string[];
  imageUrl?: string;
  downloadUrl?: string;
  youtubeUrl?: string;
  downloads: number;
  zipUrl?: string;
}

export const extensions: Extension[] = [
  {
    id: "video-certificate",
    name: "Video Certificate Generator",
    description: "Track video watching progress on YouTube and generate digital certificates upon 70% completion.",
    features: [
      "Real-time Watch Time Tracking",
      "70% Completion Threshold",
      "Playlist Detection",
      "Beautiful HTML5 Canvas Certificates",
      "Floating Sidebar Widget",
      "Download as PNG",
      "Local Storage - No External Tracking",
    ],
    imageUrl: "https://drive.google.com/file/d/1qLyCU9Ff-yowwx_kOKIJtc4vFnGLF5rT/view?usp=sharing",
    youtubeUrl: "https://www.youtube.com/watch?v=tHvdSP-UQyI",
    zipUrl: "https://drive.google.com/file/d/14cGkXFp7GTnQe46X3xIcH9hcdbXhnuvC/view?usp=sharing",
    downloads: 12450,
  },
  {
    id: "speed-controller",
    name: "Speed - Video Speed Controller",
    description: "Speed up YouTube and any video playing in Chrome up to 4x speed with just a click!",
    features: [
      "Preset Speed Buttons (0.5x to 4x)",
      "Custom Speed Slider",
      "Works Everywhere (YouTube, Vimeo, HTML5)",
      "One-Click Reset",
      "Keyboard Shortcuts Support",
      "Smooth Playback",
      "Persistent Settings",
    ],
    imageUrl: "https://drive.google.com/file/d/1TyH7mqSFq80N4WKOE7CtN25AnP5tAgNP/view?usp=sharing",
    youtubeUrl: "https://www.youtube.com/watch?v=P0tXHG_hL2U",
    zipUrl: "https://drive.google.com/file/d/15FRrZ6LCYCo5Uvu94FtLPY1QnCK8h9lf/view?usp=sharing",
    downloads: 25680,
  },
  {
    id: "tech-detective",
    name: "Tech Detective",
    description: "Detect 500+ technologies with 100% accuracy. Enhanced with AI tool detection and competitor analysis.",
    features: [
      "Detect 500+ Technologies",
      "5 Detection Methods (HTML, DOM, JS, Headers, Scripts)",
      "AI Tool Detection (OpenAI, Claude, Gemini)",
      "Competitor Analysis",
      "Side-by-Side Comparison",
      "Network Monitoring",
      "Browser Badge with Tech Count",
      "Caching for Fast Visits",
    ],
    imageUrl: "https://drive.google.com/file/d/1TyH7mqSFq80N4WKOE7CtN25AnP5tAgNP/view?usp=sharing",
    youtubeUrl: "https://www.youtube.com/watch?v=Shywq1sdEkE",
    zipUrl: "https://drive.google.com/file/d/177oxkpsmsPu3P-8gKZAnjOT37Di24Xo3/view?usp=sharing",
    downloads: 18920,
  },
  {
    id: "youtube-fb-analytics",
    name: "YouTube & FB Analytics",
    description: "Extract and analyze metrics from YouTube and Facebook posts with SEO keyword competitor data.",
    features: [
      "YouTube: Channel & Video Details",
      "Formatted Metrics (Likes, Comments)",
      "Facebook: Author & Post Info",
      "Reaction Count Analytics",
      "SEO Keyword Competitor Analysis",
      "Quick Copy Functionality",
      "CSV Export Support",
      "Real-Time Data Fetching",
    ],
    imageUrl: "https://drive.google.com/file/d/1XCiDKjEdfyKt8tIcjscTRavcpmFHxb0w/view?usp=sharing",
    youtubeUrl: "https://www.youtube.com/watch?v=DmW0EJFrrLg",
    zipUrl: "https://drive.google.com/file/d/177oxkpsmsPu3P-8gKZAnjOT37Di24Xo3/view?usp=sharing",
    downloads: 15340,
  },
];

// Download counter state - persisted in localStorage
export const downloadCounterKey = "extension_downloads";
