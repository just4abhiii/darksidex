import { useState, useEffect } from "react";
import { KeyRound, ArrowRight, Shield, Smartphone, AlertTriangle, Play, Star, Users, Zap } from "lucide-react";
import { validateAndLogin, getDeviceFingerprint, getYoutubeUrl } from "@/lib/auth";

interface LoginScreenProps {
    onLoginSuccess: () => void;
}

const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
    const [key, setKey] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [deviceId, setDeviceId] = useState("");
    const [ytUrl, setYtUrl] = useState("https://www.youtube.com/embed/pYfpNRmoRC0?rel=0&modestbranding=1&showinfo=0");

    useEffect(() => {
        setDeviceId(getDeviceFingerprint());
        getYoutubeUrl().then(setYtUrl);
    }, []);

    const handleKeyChange = (raw: string) => {
        const clean = raw.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
        const parts = clean.match(/.{1,4}/g) || [];
        setKey(parts.join("-"));
        setError("");
    };

    const handleLogin = async () => {
        if (!key.trim()) {
            setError("Please enter your access key");
            return;
        }
        setLoading(true);
        setError("");
        await new Promise((r) => setTimeout(r, 800));
        const result = await validateAndLogin(key.trim());
        setLoading(false);
        if (result.success) {
            onLoginSuccess();
        } else {
            setError("error" in result ? result.error : "Login failed");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div className="fixed inset-0 z-[99999] bg-black text-white overflow-y-auto">
            {/* Background gradient */}
            <div className="fixed inset-0 opacity-40 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 20% 0%, rgba(120, 0, 255, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(255, 0, 100, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(0, 100, 255, 0.1) 0%, transparent 60%)",
                    }}
                />
            </div>

            {/* Scrollable content */}
            <div className="relative z-10 min-h-full flex flex-col items-center px-4 py-8 pb-12">
                {/* Header / Brand */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                            <Shield size={32} className="text-white drop-shadow-lg" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-black flex items-center justify-center">
                            <KeyRound size={11} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">DarkSideX</h1>
                    <p className="text-[13px] text-gray-400 mt-1">Premium Instagram Insights Tool</p>
                </div>

                {/* YouTube Video Section */}
                <div className="w-full max-w-md mb-6">
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10">
                        {/* Video Label */}
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[10px] font-semibold text-white uppercase tracking-wider">Demo</span>
                        </div>

                        {/* Video Embed */}
                        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                            <iframe
                                src={ytUrl}
                                title="DarkSideX Demo"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                                style={{ border: "none" }}
                            />
                        </div>
                    </div>

                    {/* Video caption */}
                    <p className="text-center text-[11px] text-gray-500 mt-2 flex items-center justify-center gap-1.5">
                        <Play size={10} className="text-purple-400" />
                        Watch demo to see what you're getting
                    </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-md">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-300">
                        <Star size={10} /> Deep Analytics
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-[11px] text-pink-300">
                        <Zap size={10} /> Real-time Insights
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300">
                        <Users size={10} /> Follower Growth
                    </div>
                </div>

                {/* Login Card */}
                <div className="w-full max-w-md">
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                        <h2 className="text-[15px] font-semibold mb-1 text-center">Enter Access Key</h2>
                        <p className="text-[11px] text-gray-500 text-center mb-4">Each key works on one device only</p>

                        {/* Access Key Input */}
                        <div className="relative mb-3">
                            <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                value={key}
                                onChange={(e) => handleKeyChange(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="XXXX-XXXX-XXXX-XXXX"
                                maxLength={19}
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-[14px] font-mono tracking-widest placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                                autoComplete="off"
                                spellCheck={false}
                                autoFocus
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-start gap-2 text-red-400 text-[12px] bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-3">
                                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={loading || !key.trim()}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-semibold text-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-purple-500/20"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Unlock App
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>

                        {/* Device Info */}
                        <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-gray-600">
                            <Smartphone size={10} />
                            <span>Device: {deviceId}</span>
                        </div>
                    </div>
                </div>

                {/* Telegram CTA */}
                <div className="mt-5 w-full max-w-md">
                    <div className="relative group">
                        {/* Glow */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#229ED9] via-[#2AABEE] to-[#229ED9] rounded-2xl opacity-30 group-hover:opacity-60 blur-md transition-all duration-500 animate-pulse" />

                        <a
                            href="https://t.me/whopcampaign"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border border-[#2AABEE]/30 hover:border-[#2AABEE]/60 transition-all duration-300 group-hover:scale-[1.01] active:scale-[0.98]"
                        >
                            {/* Telegram Icon */}
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2AABEE] to-[#229ED9] flex items-center justify-center shrink-0 shadow-lg shadow-[#2AABEE]/30">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                </svg>
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold text-white leading-tight">
                                    Get Your Access Key 🔑
                                </p>
                                <p className="text-[11px] text-gray-400 mt-0.5">
                                    Join our Telegram to purchase instantly
                                </p>
                            </div>

                            {/* Arrow + Live dot */}
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                </span>
                                <ArrowRight size={16} className="text-[#2AABEE]" />
                            </div>
                        </a>
                    </div>

                    <p className="text-center text-[10px] text-gray-600 mt-3">
                        ⚡ Instant delivery • 24/7 Support • Secure payment
                    </p>
                </div>

                {/* Trust badges */}
                <div className="mt-6 flex items-center gap-4 text-[10px] text-gray-600">
                    <span className="flex items-center gap-1">🔒 Encrypted</span>
                    <span className="flex items-center gap-1">⚡ Instant Access</span>
                    <span className="flex items-center gap-1">🛡️ 1 Device Lock</span>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
