import { useState } from "react";
import { ArrowLeft, Info, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const FollowersDetailScreen = () => {
  const navigate = useNavigate();
  const [detailTab, setDetailTab] = useState("Overall");

  const totalFollowers = 39050;
  const changePct = "-0.6%";
  const compareDate = "vs Jan 13";

  const growth = {
    overall: -236,
    follows: 248,
    unfollows: 484,
  };

  const chartData = [
    { day: "15 Jan", value: 5 },
    { day: "", value: -8 },
    { day: "", value: -5 },
    { day: "", value: 30 },
    { day: "", value: 25 },
    { day: "", value: -10 },
    { day: "", value: -5 },
    { day: "28 Jan", value: 5 },
    { day: "", value: 8 },
    { day: "", value: -3 },
    { day: "", value: -5 },
    { day: "", value: -2 },
    { day: "", value: -4 },
    { day: "", value: -3 },
    { day: "11 Feb", value: -1 },
  ];

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/analytics')} className="text-foreground"><ArrowLeft size={24} /></button>
          <h1 className="text-[17px] font-semibold text-foreground">Followers</h1>
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

      {/* Follower count */}
      <div className="flex flex-col items-center py-6">
        <span className="text-[32px] font-bold text-foreground">{totalFollowers.toLocaleString()}</span>
        <span className="text-[15px] font-semibold text-foreground">Followers</span>
        <span className="text-[13px] text-muted-foreground">{changePct} {compareDate}</span>
      </div>

      <div className="h-[6px] bg-secondary" />

      {/* Growth */}
      <div className="px-4 py-5">
        <h3 className="text-[18px] font-bold text-foreground mb-4">Growth</h3>
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-foreground">Overall</span>
            <span className="text-[15px] text-foreground">{growth.overall}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-foreground">Follows</span>
            <span className="text-[15px] text-foreground">{growth.follows}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[15px] text-foreground">Unfollows</span>
            <span className="text-[15px] text-foreground">{growth.unfollows}</span>
          </div>
        </div>
      </div>

      <div className="border-b border-border mx-4" />

      {/* Follower details */}
      <div className="px-4 py-5">
        <h3 className="text-[16px] font-bold text-foreground mb-3">Follower details</h3>
        <div className="flex gap-2 mb-4">
          {["Overall", "Follows", "Unfollows"].map((tab) => (
            <button key={tab} onClick={() => setDetailTab(tab)}
              className={cn("rounded-full px-4 py-1.5 text-[13px] font-medium border",
                detailTab === tab ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border"
              )}>
              {tab}
            </button>
          ))}
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="followerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D946EF" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#D946EF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis fontSize={11} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
              <Area type="monotone" dataKey="value" stroke="#D946EF" fill="url(#followerGrad)" strokeWidth={2.5} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="border-b border-border mx-4" />

      {/* Top content by follows */}
      <div className="px-4 py-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-bold text-foreground">Top content by follows</h3>
          <button className="text-[14px] text-[#0095f6] font-medium">See All</button>
        </div>
      </div>
    </div>
  );
};

export default FollowersDetailScreen;
