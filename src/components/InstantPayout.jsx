import { useState } from "react";
import { ArrowRight, CheckCircle, Loader2, IndianRupee } from "lucide-react";

export default function InstantPayout() {
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const amount = 220;

  function handlePayout() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 1500);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 px-6">

      <div className="bg-white/5 border border-red-400/20 rounded-xl p-6">

        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          <p className="text-xs uppercase tracking-wider text-red-400 font-semibold">
            Milestone Unreachable Detected
          </p>
        </div>

        {/* Amount */}
        <div className="flex items-center gap-2 text-3xl font-bold mb-2">
          <IndianRupee size={26} className="text-white/70" />
          {amount}
          <span className="text-sm text-white/30 font-normal ml-2">
            calculated payout
          </span>
        </div>

        <p className="text-xs text-white/40 mb-6">
          Trigger: Gridlock (&gt;60 min) · 7 orders uncompletable
        </p>

        {/* Button / Success */}
        {!paid ? (
          <button
            onClick={handlePayout}
            disabled={loading}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition ${
              loading
                ? "bg-orange-500/40 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Processing...
              </>
            ) : (
              <>
                Simulate Payout
                <ArrowRight size={16} />
              </>
            )}
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-green-400/10 border border-green-400/30 text-green-400 px-4 py-2 rounded-lg font-semibold text-sm">
            <CheckCircle size={16} />
            ₹{amount} credited to your UPI
          </div>
        )}
      </div>
    </div>
  );
}