import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import InstallGate from "@/components/InstallGate";
import SplashScreen from "@/components/SplashScreen";
import { useState, useCallback } from "react";
import HomeScreen from "@/screens/HomeScreen";
import SearchScreen from "@/screens/SearchScreen";
import CreateScreen from "@/screens/CreateScreen";
import ReelsScreen from "@/screens/ReelsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import AnalyticsScreen from "@/screens/AnalyticsScreen";
import ReelInsightsScreen from "@/screens/ReelInsightsScreen";
import ReelDetailScreen from "@/screens/ReelDetailScreen";
import ViewsDetailScreen from "@/screens/ViewsDetailScreen";
import InteractionsDetailScreen from "@/screens/InteractionsDetailScreen";
import FollowersDetailScreen from "@/screens/FollowersDetailScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(false);
  const handleSplashFinish = useCallback(() => setShowSplash(false), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <InstallGate>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="mx-auto max-w-lg min-h-screen bg-background">
              <AnalyticsTracker />
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/search" element={<SearchScreen />} />
                <Route path="/create" element={<CreateScreen />} />
                <Route path="/reels" element={<ReelsScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/analytics" element={<AnalyticsScreen />} />
                <Route path="/reel-insights/:id" element={<ReelInsightsScreen />} />
                <Route path="/reel/:id" element={<ReelDetailScreen />} />
                <Route path="/insights/views" element={<ViewsDetailScreen />} />
                <Route path="/insights/interactions" element={<InteractionsDetailScreen />} />
                <Route path="/insights/followers" element={<FollowersDetailScreen />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <BottomNav />
            </div>
          </BrowserRouter>
        </InstallGate>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
