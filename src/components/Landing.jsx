import { ArrowRight, ShieldCheck, Zap, Activity } from "lucide-react";

export default function Landing({ setPage }) {
  return (
    <div className="min-h-screen bg-[#0d0f17] text-white flex flex-col justify-center">
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          Protect Your <br />
          <span className="text-orange-500">Daily Income.</span> <br />
          <span className="text-white/20">Automatically.</span>
        </h1>

        <p className="text-white/40 text-lg max-w-xl leading-relaxed mb-10">
          Real-time risk detection using weather, traffic, and platform signals — 
          with instant payouts the moment your daily milestone becomes unreachable.
        </p>

        <button
          onClick={() => setPage("dashboard")}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-xl font-semibold text-sm shadow-lg"
        >
          View Live Protection
          <ArrowRight size={16} />
        </button>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <ShieldCheck className="text-green-400 mb-3" size={22} />
            <h3 className="font-semibold mb-1">Income Protection</h3>
            <p className="text-white/40 text-sm">
              Never lose your daily bonus due to external disruptions.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <Zap className="text-yellow-400 mb-3" size={22} />
            <h3 className="font-semibold mb-1">Instant Payouts</h3>
            <p className="text-white/40 text-sm">
              Automated UPI transfers triggered in real-time.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <Activity className="text-red-400 mb-3" size={22} />
            <h3 className="font-semibold mb-1">Live Risk Engine</h3>
            <p className="text-white/40 text-sm">
              Detect heatwaves, AQI spikes, and gridlock instantly.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}