// Maps keywords to background images (royalty-free Unsplash URLs)
const keywordBackgrounds = [
  {
    keywords: ["dragon", "castle", "fantasy", "knight", "wizard"],
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
  },
  {
    keywords: ["forest", "elf", "woods", "tree", "nature"],
    url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80"
  },
  {
    keywords: ["desert", "sand", "pyramid", "oasis"],
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1500&q=80"
  },
  {
    keywords: ["ocean", "sea", "pirate", "ship", "island"],
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80"
  },
  {
    keywords: ["space", "star", "planet", "alien", "galaxy"],
    url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1500&q=80"
  },
  {
    keywords: ["snow", "ice", "winter", "mountain"],
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1500&q=80"
  },
  {
    keywords: ["city", "robot", "future", "cyber", "neon"],
    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80"
  },
  // Default fallback
  {
    keywords: [],
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
  }
];

export function getBackgroundUrl(input) {
  if (!input) return keywordBackgrounds[keywordBackgrounds.length - 1].url;
  const inputLower = input.toLowerCase();
  for (const bg of keywordBackgrounds) {
    if (bg.keywords.some(k => inputLower.includes(k))) {
      return bg.url;
    }
  }
  return keywordBackgrounds[keywordBackgrounds.length - 1].url;
}
