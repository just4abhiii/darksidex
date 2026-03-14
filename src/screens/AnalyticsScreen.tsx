import { useState, useRef, useCallback } from "react";
import { ArrowLeft, ChevronRight, Settings, TrendingUp, Lightbulb, Gift, Sparkles, Image, ChevronDown, RotateCcw, Zap, Users, BarChart3, Film, Package, Puzzle, FrameIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Editable dashboard data stored in localStorage
export interface DashboardData {
  dateRange: string;
  views: string;
  viewsTrend: "up" | "down";
  interactions: string;
  interactionsTrend: "up" | "down";
  newFollowers: string;
  followersTrend: "up" | "down";
  contentShared: number;
}

const defaultDashboardData: DashboardData = {
  dateRange: "14 Jan-12 Feb",
  views: "343",
  viewsTrend: "up",
  interactions: "15",
  interactionsTrend: "up",
  newFollowers: "27",
  followersTrend: "up",
  contentShared: 4,
};

export const loadDashboardData = (): DashboardData => {
  try {
    const stored = localStorage.getItem("ig_dashboard_data");
    return stored ? { ...defaultDashboardData, ...JSON.parse(stored) } : defaultDashboardData;
  } catch { return defaultDashboardData; }
};

export const saveDashboardData = (data: DashboardData) => {
  localStorage.setItem("ig_dashboard_data", JSON.stringify(data));
};

const AnalyticsScreen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData>(loadDashboardData);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<DashboardData>(data);

  // Long press
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTriggered = useRef(false);

  const startPress = useCallback(() => {
    longPressTriggered.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressTriggered.current = true;
      setEditData({ ...data });
      setEditOpen(true);
    }, 5000);
  }, [data]);

  const endPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleSaveEdit = () => {
    setData(editData);
    saveDashboardData(editData);
    setEditOpen(false);
  };

  const TrendArrow = ({ trend }: { trend: "up" | "down" }) => (
    <TrendingUp size={14} className={cn("text-foreground", trend === "down" && "rotate-180")} />
  );

  const insightRows = [
    { label: "Views", value: data.views, trend: data.viewsTrend, route: "/insights/views" },
    { label: "Interactions", value: data.interactions, trend: data.interactionsTrend, route: "/insights/interactions" },
    { label: "New followers", value: data.newFollowers, trend: data.followersTrend, route: "/insights/followers" },
    { label: "Content you shared", value: data.contentShared, trend: null, route: null },
  ];

  const tools: { icon: React.ReactNode; label: string; subtitle: string | null; badge: string | null }[] = [
    { icon: <RotateCcw size={22} className="text-foreground" />, label: "Monthly recap", subtitle: "See what you made happen last month.", badge: "New" },
    { icon: <Zap size={22} className="text-foreground" />, label: "Best practices", subtitle: null, badge: "New" },
    { icon: <Lightbulb size={22} className="text-foreground" />, label: "Inspiration", subtitle: null, badge: null },
    { icon: <Users size={22} className="text-foreground" />, label: "Partnership ads", subtitle: null, badge: null },
    { icon: <BarChart3 size={22} className="text-foreground" />, label: "Ad tools", subtitle: null, badge: null },
    { icon: <Film size={22} className="text-foreground" />, label: "Trial reels", subtitle: null, badge: null },
    { icon: <Gift size={22} className="text-foreground" />, label: "Gifts", subtitle: null, badge: null },
    { icon: <Puzzle size={22} className="text-foreground" />, label: "Your AIs", subtitle: null, badge: null },
    { icon: <FrameIcon size={22} className="text-foreground" />, label: "Branded content", subtitle: "Partner with a brand or creator for your next post", badge: null },
  ];

  const tips = [
    { label: "Trending audio" },
    { label: "Other helpful resources" },
  ];

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/profile')} className="text-foreground">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-[17px] font-semibold text-foreground">Professional dashboard</h1>
        </div>
        <button className="text-foreground">
          <Settings size={22} />
        </button>
      </header>

      {/* Insights Section — long press to edit */}
      <div
        className="px-4 pt-2 pb-4"
        onTouchStart={startPress}
        onTouchEnd={endPress}
        onTouchCancel={endPress}
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-bold text-foreground">Insights</h2>
          <span className="text-[13px] text-muted-foreground">{data.dateRange}</span>
        </div>

        <div className="space-y-0">
          {insightRows.map((row, i) => (
            <button
              key={row.label}
              onClick={() => row.route && navigate(row.route)}
              className="flex items-center justify-between w-full py-3.5 border-b border-border last:border-b-0"
            >
              <span className="text-[15px] text-foreground">{row.label}</span>
              <div className="flex items-center gap-2">
                {row.trend && <TrendArrow trend={row.trend} />}
                <span className="text-[15px] text-foreground font-medium">{row.value}</span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-[6px] bg-secondary" />

      {/* Your tools */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold text-foreground">Your tools</h2>
          <button className="text-[14px] text-[#5B5FC7] font-medium">See all</button>
        </div>

        <div className="space-y-0">
          {tools.map((tool) => (
            <button key={tool.label} className="flex items-center gap-3.5 w-full py-3.5">
              <div className="w-[28px] flex items-center justify-center">{tool.icon}</div>
              <div className="flex-1 text-left">
                <span className="text-[15px] text-foreground">{tool.label}</span>
                {tool.subtitle && (
                  <p className="text-[13px] text-muted-foreground mt-0.5">{tool.subtitle}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {tool.badge && (
                  <span className="bg-[#5B5FC7] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">{tool.badge}</span>
                )}
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-[6px] bg-secondary" />

      {/* Tips and resources */}
      <div className="px-4 pt-4 pb-6">
        <h2 className="text-[16px] font-bold text-foreground mb-2">Tips and resources</h2>
        {tips.map((tip) => (
          <button key={tip.label} className="flex items-center gap-3.5 w-full py-3.5">
            <div className="w-[28px] flex items-center justify-center">
              <TrendingUp size={22} className="text-foreground" />
            </div>
            <span className="text-[15px] text-foreground flex-1 text-left">{tip.label}</span>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
            onClick={() => setEditOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-background rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto"
            >
              <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-5" />
              <h2 className="text-[18px] font-bold text-foreground mb-5">Edit Dashboard Data</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-[13px] text-muted-foreground mb-1 block">Date Range</label>
                  <input
                    value={editData.dateRange}
                    onChange={(e) => setEditData({ ...editData, dateRange: e.target.value })}
                    className="w-full bg-secondary rounded-lg px-3 py-2.5 text-[14px] text-foreground outline-none"
                  />
                </div>
                <div>
                  <label className="text-[13px] text-muted-foreground mb-1 block">Views</label>
                  <input
                    value={editData.views}
                    onChange={(e) => setEditData({ ...editData, views: e.target.value })}
                    className="w-full bg-secondary rounded-lg px-3 py-2.5 text-[14px] text-foreground outline-none"
                  />
                </div>
                <div>
                  <label className="text-[13px] text-muted-foreground mb-1 block">Interactions</label>
                  <input
                    value={editData.interactions}
                    onChange={(e) => setEditData({ ...editData, interactions: e.target.value })}
                    className="w-full bg-secondary rounded-lg px-3 py-2.5 text-[14px] text-foreground outline-none"
                  />
                </div>
                <div>
                  <label className="text-[13px] text-muted-foreground mb-1 block">New Followers</label>
                  <input
                    value={editData.newFollowers}
                    onChange={(e) => setEditData({ ...editData, newFollowers: e.target.value })}
                    className="w-full bg-secondary rounded-lg px-3 py-2.5 text-[14px] text-foreground outline-none"
                  />
                </div>
                <div>
                  <label className="text-[13px] text-muted-foreground mb-1 block">Content Shared</label>
                  <input
                    type="number"
                    value={editData.contentShared}
                    onChange={(e) => setEditData({ ...editData, contentShared: parseInt(e.target.value) || 0 })}
                    className="w-full bg-secondary rounded-lg px-3 py-2.5 text-[14px] text-foreground outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveEdit}
                className="w-full mt-6 py-3 bg-[#0095f6] text-white font-semibold rounded-xl text-[15px]"
              >
                Save Changes
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalyticsScreen;
