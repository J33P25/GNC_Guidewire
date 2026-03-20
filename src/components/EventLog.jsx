export default function EventLog() {
  const data = [
    { msg: "Heatwave triggered payout", amount: "₹150", time: "2:14 PM" },
    { msg: "Traffic delay compensation", amount: "₹40", time: "11:30 AM" },
    { msg: "AQI hazard compensation", amount: "₹90", time: "Mon" },
  ];

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex justify-between items-center px-4 py-3 border-b border-white/5 bg-white/5"
        >
          <div>
            <p className="text-sm text-white/70">{d.msg}</p>
            <p className="text-xs text-white/30">{d.time}</p>
          </div>
          <span className="text-green-400 font-semibold text-sm">
            {d.amount}
          </span>
        </div>
      ))}
    </div>
  );
}