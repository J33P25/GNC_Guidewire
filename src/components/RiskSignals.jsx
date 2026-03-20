import { AlertTriangle, CheckCircle } from "lucide-react";

const TRIGGERS = [
  { label: "Heat Stress", value: "34.2°C WBT", status: "warning" },
  { label: "Air Quality", value: "AQI 312", status: "warning" },
  { label: "Traffic", value: "4.8 km/h", status: "danger" },
  { label: "Platform", value: "99.97% uptime", status: "safe" },
];

export default function RiskSignals() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {TRIGGERS.map((t, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
          
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-sm">{t.label}</p>

            {t.status === "safe" ? (
              <CheckCircle size={16} className="text-green-400" />
            ) : (
              <AlertTriangle size={16} className={`${
                t.status === "danger" ? "text-red-400" : "text-yellow-400"
              }`} />
            )}
          </div>

          <p className="text-lg font-bold">{t.value}</p>

          <p className={`text-xs mt-1 ${
            t.status === "danger"
              ? "text-red-400"
              : t.status === "warning"
              ? "text-yellow-400"
              : "text-green-400"
          }`}>
            {t.status.toUpperCase()}
          </p>
        </div>
      ))}
    </div>
  );
}