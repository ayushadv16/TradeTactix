import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { LineChart, BarChart2, TrendingUp, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [portfolioValue, setPortfolioValue] = useState(24000);
  const [activeTrades, setActiveTrades] = useState(10);
  const [totalProfit, setTotalProfit] = useState(850);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        navigate("/login");
        return;
      }
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (profileData) setProfile(profileData);
    };
    getProfile();
  }, [navigate]);

  // Random fluctuation effect for total profit
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalProfit((prev) => prev + (Math.random() < 0.5 ? -1 : 1) * Math.floor(Math.random() * 5));
    }, 1500); // Update every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Load TradingView Charts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new (window as any).TradingView.widget({
        container_id: "tradingview_chart_aapl",
        width: "100%",
        height: "400px",
        symbol: "NASDAQ:AAPL",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#0F172A",
        enable_publishing: false,
        allow_symbol_change: true,
        details: true,
        studies: ["MACD@tv-basicstudies", "RSI@tv-basicstudies", "EMA@tv-basicstudies"],
      });

      new (window as any).TradingView.widget({
        container_id: "tradingview_chart_goog",
        width: "100%",
        height: "400px",
        symbol: "NASDAQ:GOOG",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#0F172A",
        enable_publishing: false,
        allow_symbol_change: true,
        details: true,
        studies: ["MACD@tv-basicstudies", "RSI@tv-basicstudies", "EMA@tv-basicstudies"],
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-500">Welcome, {profile?.full_name || "Trader"}</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate("/settings")} className="p-2 text-gray-400 hover:text-emerald-500">
            <Settings className="h-6 w-6" />
          </button>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/login");
              toast.success("Logged out successfully");
            }}
            className="p-2 text-gray-400 hover:text-emerald-500"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Portfolio Value */}
        <motion.div className="bg-navy-900 p-6 rounded-xl border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Portfolio Value</p>
              <h3 className="text-2xl font-bold text-emerald-500">
                $<CountUp start={portfolioValue - 500} end={portfolioValue} duration={2.5} separator="," />
              </h3>
            </div>
            <LineChart className="h-8 w-8 text-emerald-500" />
          </div>
        </motion.div>

        {/* Active Trades */}
        <motion.div className="bg-navy-900 p-6 rounded-xl border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Active Trades</p>
              <h3 className="text-2xl font-bold text-emerald-500">
                <CountUp start={activeTrades - 5} end={activeTrades} duration={2} />
              </h3>
            </div>
            <BarChart2 className="h-8 w-8 text-emerald-500" />
          </div>
        </motion.div>

        {/* Total Profit with real-time fluctuation */}
        <motion.div className="bg-navy-900 p-6 rounded-xl border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Profit</p>
              <h3 className="text-2xl font-bold text-emerald-500">
                +$<CountUp start={totalProfit - 5} end={totalProfit} duration={1.2} separator="," />
              </h3>
            </div>
            <TrendingUp className="h-8 w-8 text-emerald-500" />
          </div>
        </motion.div>
      </div>

      {/* TradingView Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-navy-900 p-6 rounded-xl border border-emerald-500/20">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">AAPL Stock Chart</h2>
          <div id="tradingview_chart_aapl" className="h-96"></div>
        </div>

        <div className="bg-navy-900 p-6 rounded-xl border border-emerald-500/20">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">GOOG Stock Chart</h2>
          <div id="tradingview_chart_goog" className="h-96"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
