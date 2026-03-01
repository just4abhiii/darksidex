import { useState } from "react";
import { ArrowLeft, Info, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const InteractionsDetailScreen = () => {
  const navigate = useNavigate();
  const [contentTab, setContentTab] = useState("All");
  const [interactionTab, setInteractionTab] = useState("Reels");

  const interactions = 7026;
  const followerPct = 23.0;
  const nonFollowerPct = 77.0;

  const contentTypes = [
    { name: "Reels", followerPct: 20, nonFollowerPct: 78.2, total: 98.2 },
    { name: "Stories", followerPct: 1.7, nonFollowerPct: 0, total: 1.7 },
    { name: "Posts", followerPct: 0.1, nonFollowerPct: 0, total: 0.1 },
  ];

  const interactionBreakdown = {
    Reels: [
      { label: "Likes", value: "4,866" },
      { label: "Comments", value: "100" },
      { label: "Saves", value: "305" },
      { label: "Shares", value: "719" },
      { label: "Reposts", value: "313" },
    ],
    Posts: [
      { label: "Likes", value: "42" },
      { label: "Comments", value: "3" },
      { label: "Saves", value: "1" },
      { label: "Shares", value: "0" },
    ],
  };

  const topReels = [
    { image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=260&fit=crop", likes: "3.2K", date: "22 Jan" },
    { image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=260&fit=crop", likes: "114", date: "20 Jan" },
    { image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=260&fit=crop", likes: "106", date: "17 Jan" },
    { image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=260&fit=crop", likes: "97", date: "18 Jan" },
  ];

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/analytics')} className="text-foreground"><ArrowLeft size={24} /></button>
          <h1 className="text-[17px] font-semibold text-foreground">Interactions</h1>
        </div>
        <button className="text-foreground"><Info size={20} className="border border-foreground rounded-full p-0.5" /></button>
      </header>

      {/* Date range */}
      <div className="flex items-center justify-between px-4 py-2">
        <button className="flex items-center gap-1.5 bg-secondary rounded-full px-3.5 py-1.5 text-[13px] text-foreground font-medium">
          Last 30 days <ChevronDown size={14} />
        </button>
        <span className="text-[13px] text-foreground">14 Jan - 12 Feb</span>
      </div>

      <div className="border-b border-border mx-4" />

      {/* Donut Chart */}
      <div className="flex justify-center py-8">
        <div className="relative w-[220px] h-[220px]">
          <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
            <circle cx="100" cy="100" r="82" fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="#E040FB" strokeWidth="12"
              strokeDasharray={`${(followerPct / 100) * 2 * Math.PI * 82} ${2 * Math.PI * 82}`}
              strokeLinecap="round" />
            <circle cx="100" cy="100" r="82" fill="none" stroke="#5B21B6" strokeWidth="12"
              strokeDasharray={`${(nonFollowerPct / 100) * 2 * Math.PI * 82} ${2 * Math.PI * 82}`}
              strokeDashoffset={`${-(followerPct / 100) * 2 * Math.PI * 82}`}
              strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[13px] text-muted-foreground">Interactions</span>
            <span className="text-[32px] font-bold text-foreground">{interactions.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#E040FB]" />
            <span className="text-[14px] text-foreground">Followers</span>
          </div>
          <span className="text-[14px] text-foreground">{followerPct.toFixed(1)}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#5B21B6]" />
            <span className="text-[14px] text-foreground">Non-followers</span>
          </div>
          <span className="text-[14px] text-foreground">{nonFollowerPct.toFixed(1)}%</span>
        </div>
      </div>

      <div className="border-b border-border mx-4" />

      {/* By content type */}
      <div className="px-4 py-5">
        <h3 className="text-[16px] font-bold text-foreground mb-3">By content type</h3>
        <div className="flex gap-2 mb-4">
          {["All", "Followers", "Non-followers"].map((f) => (
            <button key={f} onClick={() => setContentTab(f)}
              className={cn("rounded-full px-4 py-1.5 text-[13px] font-medium border",
                contentTab === f ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border"
              )}>
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {contentTypes.map((ct) => (
            <div key={ct.name}>
              <span className="text-[14px] text-foreground block mb-1.5">{ct.name}</span>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-[8px] rounded-sm bg-secondary overflow-hidden flex">
                  <div className="h-full bg-[#E040FB]" style={{ width: `${ct.followerPct}%` }} />
                  <div className="h-full bg-[#5B21B6]" style={{ width: `${ct.nonFollowerPct}%` }} />
                </div>
                <span className="text-[14px] text-foreground w-[48px] text-right">{ct.total}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#E040FB]" />
            <span className="text-[12px] text-muted-foreground">Followers</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-[#5B21B6]" />
            <span className="text-[12px] text-muted-foreground">Non-followers</span>
          </div>
        </div>
      </div>

      <div className="border-b border-border mx-4" />

      {/* By interaction */}
      <div className="px-4 py-5">
        <h3 className="text-[16px] font-bold text-foreground mb-3">By interaction</h3>
        <div className="flex gap-2 mb-4">
          {["Reels", "Posts"].map((tab) => (
            <button key={tab} onClick={() => setInteractionTab(tab)}
              className={cn("rounded-full px-4 py-1.5 text-[13px] font-medium border",
                interactionTab === tab ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border"
              )}>
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-3.5">
          {(interactionBreakdown[interactionTab as keyof typeof interactionBreakdown] || []).map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-[15px] text-foreground">{item.label}</span>
              <span className="text-[15px] text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-border mx-4" />

      {/* Top reels */}
      <div className="px-4 py-5">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[16px] font-bold text-foreground">Top reels</h3>
          <button className="text-[14px] text-[#0095f6] font-medium">See All</button>
        </div>
        <p className="text-[13px] text-muted-foreground mb-3">Based on likes</p>

        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar pb-2">
          {topReels.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-[130px]">
              <div className="relative rounded-lg overflow-hidden aspect-[3/4]">
                <img src={item.image} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" className="drop-shadow">
                    <path d="M2.5 2C1.67 2 1 2.67 1 3.5v17c0 .83.67 1.5 1.5 1.5h19c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5h-19zM3 8h18v12.5c0 .28-.22.5-.5.5h-17a.5.5 0 01-.5-.5V8z"/>
                    <polygon points="10,11 10,18 16.5,14.5" />
                  </svg>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/60 rounded-lg px-2.5 py-1">
                  <span className="text-white text-[13px] font-bold">{item.likes}</span>
                </div>
              </div>
              <p className="text-[12px] text-muted-foreground mt-1.5 text-center">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractionsDetailScreen;
