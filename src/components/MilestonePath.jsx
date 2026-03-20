import { Flag, CheckCircle } from "lucide-react";

export default function MilestonePath() {
  const steps = [
    "Start Shift",
    "5 Orders",
    "10 Orders",
    "15 Orders",
    "20 Orders",
    "Bonus Achieved",
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      <p className="text-xs text-white/40 uppercase mb-4">Milestone Path</p>

      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            
            {i === steps.length - 1 ? (
              <Flag className="text-orange-500 mb-2" size={18} />
            ) : (
              <CheckCircle className="text-green-400 mb-2" size={18} />
            )}

            <p className="text-[10px] text-white/40 text-center">{step}</p>

            {i < steps.length - 1 && (
              <div className="h-[2px] w-full bg-white/10 mt-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}