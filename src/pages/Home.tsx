import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart2, Lock, Globe } from "lucide-react";

const features = [
  {
    icon: <BarChart2 className="h-6 w-6" />,
    title: "Advanced Analytics",
    description: "Real-time market analysis and predictive modeling",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Secure Trading",
    description: "Enterprise-grade security for your investments",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Markets",
    description: "Access to international markets 24/7",
  },
];

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new (window as any).TradingView.widget({
        container_id: "tradingview_chart",
        width: "100%",
        height: "500px",
        symbol: "NASDAQ:NDX", // Default to NASDAQ-100 Index
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#0F172A",
        enable_publishing: false,
        allow_symbol_change: true, // Users can change stock
        details: true,
        studies: ["MACD@tv-basicstudies", "RSI@tv-basicstudies", "EMA@tv-basicstudies"],
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Predict. Trade. Profit.
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Advanced stock prediction platform powered by cutting-edge AI technology.
              Make informed decisions with real-time market insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-emerald-500 text-navy-900 rounded-lg hover:bg-emerald-600 transition-colors font-semibold">
                Get Started
              </button>
              <button className="px-8 py-3 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-navy-900 transition-colors font-semibold">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TradingView Chart Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Live Market Overview
            </span>
          </h2>
          <div id="tradingview_chart" className="border rounded-lg shadow-lg"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Why Choose TradeTactix
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-navy-900 p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
            >
              <div className="text-emerald-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
