export default function IncomeSnapshot() {
  const stats = [
    { label: "Orders Completed", value: "18 / 25", sub: "7 remaining", color: "text-orange-500" },
    { label: "Earnings Today", value: "₹480", sub: "base credited", color: "text-green-400" },
    { label: "Bonus at Risk", value: "₹600", sub: "milestone bonus", color: "text-red-400" },
    { label: "Resiliency Score", value: "87 / 100", sub: "trust rating", color: "text-purple-400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s, i) => (
        <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-white/40 uppercase mb-1">{s.label}</p>
          <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          <p className="text-xs text-white/30">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}