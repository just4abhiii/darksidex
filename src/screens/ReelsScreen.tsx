import { useState, useRef } from "react";
import { Heart, MessageCircle, Send, MoreVertical, Music, Bookmark, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface Reel {
  id: string;
  user: string;
  avatar: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  image: string;
  audio: string;
}

const reels: Reel[] = [
  { id: "1", user: "money_mentor", avatar: "https://i.pravatar.cc/150?img=12", caption: "5 ways to earn ₹50K/month from home 💰🔥 #earnmoney #sidehustle #passiveincome", likes: 45200, comments: 1230, shares: 890, image: "https://images.unsplash.com/photo-1553729459-uj67ea5ceffc?w=600&h=1000&fit=crop&q=80", audio: "Money Mindset · trending" },
  { id: "2", user: "hustle.king", avatar: "https://i.pravatar.cc/150?img=14", caption: "Start freelancing today — no degree needed 🚀💻 #freelancing #workfromhome #money", likes: 32100, comments: 876, shares: 456, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=1000&fit=crop", audio: "Grind Mode · hustle.king" },
  { id: "3", user: "crypto_guru", avatar: "https://i.pravatar.cc/150?img=15", caption: "Bitcoin se daily ₹5000 kaise kamaye? 🪙📈 #crypto #bitcoin #trading #invest", likes: 28400, comments: 654, shares: 321, image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=1000&fit=crop", audio: "Crypto Beats · trending" },
  { id: "4", user: "skill.factory", avatar: "https://i.pravatar.cc/150?img=16", caption: "3 HIGH income skills for 2026 💡🎯 #skills #career #growth #motivation", likes: 51800, comments: 1456, shares: 1023, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=1000&fit=crop", audio: "Level Up · skill.factory" },
  { id: "5", user: "dropship_pro", avatar: "https://i.pravatar.cc/150?img=17", caption: "Dropshipping se ₹1 lakh/month 🛒🤑 Step by step guide #dropshipping #ecommerce #business", likes: 19800, comments: 543, shares: 267, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=1000&fit=crop", audio: "Boss Mode · trending" },
  { id: "6", user: "ai_earner", avatar: "https://i.pravatar.cc/150?img=18", caption: "ChatGPT se paise kamao — 7 secret methods 🤖💸 #ai #chatgpt #onlineearning", likes: 67300, comments: 2100, shares: 1500, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=1000&fit=crop", audio: "AI Revolution · ai_earner" },
];

const formatCount = (n: number) => {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
};

const ReelCard = ({ reel }: { reel: Reel }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showDoubleTapHeart, setShowDoubleTapHeart] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);
  const lastTap = useRef(0);

  const handleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      // Double tap
      if (!liked) {
        setLiked(true);
        setLikeAnimating(true);
        setTimeout(() => setLikeAnimating(false), 350);
        trackEvent("reel_like", { reel_id: reel.id });
      }
      setShowDoubleTapHeart(true);
      setTimeout(() => setShowDoubleTapHeart(false), 900);
    }
    lastTap.current = now;
  };

  const toggleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    if (newLiked) {
      setLikeAnimating(true);
      setTimeout(() => setLikeAnimating(false), 350);
    }
    trackEvent("reel_like", { reel_id: reel.id });
  };

  return (
    <div
      className="relative aspect-[9/16] max-h-[calc(100vh-100px)] w-full bg-black overflow-hidden snap-start"
      onClick={handleTap}
    >
      <img src={reel.image} alt="Reel" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

      {/* Double tap heart overlay */}
      <AnimatePresence>
        {showDoubleTapHeart && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <Heart size={100} className="fill-white text-white drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Actions */}
      <div className="absolute bottom-20 right-3 flex flex-col items-center gap-4 z-10">
        <motion.button
          whileTap={{ scale: 0.7 }}
          onClick={(e) => { e.stopPropagation(); toggleLike(); }}
          className={cn("flex flex-col items-center gap-1", likeAnimating && "ig-like-bounce")}
        >
          <Heart size={26} className={cn(liked ? "fill-[hsl(var(--ig-like))] text-[hsl(var(--ig-like))]" : "text-white")} />
          <span className="text-[11px] text-white font-medium">{formatCount(reel.likes + (liked ? 1 : 0))}</span>
        </motion.button>

        <motion.button whileTap={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1">
          <MessageCircle size={26} className="text-white" />
          <span className="text-[11px] text-white font-medium">{formatCount(reel.comments)}</span>
        </motion.button>

        <motion.button whileTap={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-1">
          <Send size={24} className="text-white" />
          <span className="text-[11px] text-white font-medium">{formatCount(reel.shares)}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.7 }}
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
        >
          <Bookmark size={24} className={cn("transition-all duration-200", saved ? "fill-white" : "", "text-white")} />
        </motion.button>

        <motion.button whileTap={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()}>
          <MoreVertical size={22} className="text-white" />
        </motion.button>

        {/* Spinning audio disc */}
        <div className="mt-1 h-[26px] w-[26px] rounded-md border border-white/40 overflow-hidden">
          <img src={reel.avatar} alt="" className="h-full w-full object-cover animate-[spin_4s_linear_infinite]" />
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-3 right-14 z-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-1.5">
          <img src={reel.avatar} alt={reel.user} className="h-8 w-8 rounded-full object-cover border-[1.5px] border-white" />
          <span className="text-[13px] font-bold text-white">{reel.user}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setFollowing(!following)}
            className={cn(
              "ml-1 rounded-lg border px-3 py-[3px] text-[12px] font-bold transition-all duration-200",
              following
                ? "bg-white/20 border-white/30 text-white"
                : "bg-transparent border-white text-white"
            )}
          >
            {following ? "Following" : "Follow"}
          </motion.button>
        </div>

        <div className="text-[13px] text-white leading-[17px]">
          {showFullCaption ? (
            <p>{reel.caption}</p>
          ) : (
            <p>
              {reel.caption.slice(0, 45)}...{" "}
              <button onClick={() => setShowFullCaption(true)} className="text-white/60">more</button>
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-[3px] backdrop-blur-sm">
            <Music size={10} className="text-white" />
            <span className="text-[11px] text-white max-w-[180px] truncate">{reel.audio}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReelsScreen = () => (
  <motion.div
    className="pb-14"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.15 }}
  >
    <header className="sticky top-0 z-40 flex items-center justify-between bg-black/80 px-4 py-2.5 backdrop-blur-md">
      <h1 className="text-[20px] font-bold text-white">Reels</h1>
      <button className="text-white active:scale-90 transition-transform">
        <Camera size={24} />
      </button>
    </header>

    <div className="flex flex-col snap-y snap-mandatory overflow-y-auto bg-black" style={{ scrollBehavior: "smooth" }}>
      {reels.map((reel) => (
        <ReelCard key={reel.id} reel={reel} />
      ))}
    </div>
  </motion.div>
);

export default ReelsScreen;