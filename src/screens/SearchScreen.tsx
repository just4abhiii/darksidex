import { useState } from "react";
import { Search, Grid3X3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { exploreImages } from "@/data/mockData";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = ["IGTV", "Shop", "Travel", "Food", "Art", "Tech", "Fitness", "Fashion", "Style"];

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("IGTV");

  const filteredImages = query
    ? exploreImages.filter((_, i) => i % 2 === 0)
    : exploreImages;

  return (
    <motion.div className="pb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
      {/* Search Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md">
        <div className="px-4 py-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value) trackEvent("search", { query: e.target.value });
              }}
              placeholder="Search"
              className="h-[36px] rounded-[10px] bg-secondary pl-9 text-[14px] border-none focus-visible:ring-0"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px] font-semibold text-[hsl(var(--ig-blue))]"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-lg px-4 py-[7px] text-[13px] font-semibold border transition-colors",
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background text-foreground border-border"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Explore Grid */}
      <div className="grid grid-cols-3 gap-[1px]">
        {filteredImages.map((img, i) => {
          const isTall = i % 9 === 2;
          return (
            <div key={i} className={isTall ? "row-span-2" : ""}>
              <div className="relative w-full h-full">
                <img
                  src={img}
                  alt="Explore"
                  className={`w-full object-cover ${isTall ? "h-full" : "aspect-square"}`}
                  loading="lazy"
                />
                {i % 7 === 3 && (
                  <div className="absolute top-2 right-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="drop-shadow-md">
                      <rect x="2" y="2" width="20" height="20" rx="2" />
                      <line x1="2" y1="8" x2="22" y2="8" />
                      <polygon points="10,12 10,18 16,15" fill="white" />
                    </svg>
                  </div>
                )}
                {i % 11 === 5 && (
                  <div className="absolute top-2 right-2">
                    <Grid3X3 size={16} className="text-white drop-shadow-md" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SearchScreen;