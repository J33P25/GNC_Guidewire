import IncomeSnapshot from "./IncomeSnapshot";
import RiskSignals from "./RiskSignals";
import EventLog from "./EventLog";
import MilestonePath from "./MilestonePath";

export default function CommandCenter() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

      {/* Header */}
      <div>
        <p className="text-xs text-white/40 uppercase">Active Worker</p>
        <h2 className="text-xl font-bold">Arjun K. — Bengaluru</h2>
      </div>

      {/* Stats */}
      <IncomeSnapshot />

      {/* Milestone */}
      <MilestonePath />

      {/* Risks */}
      <div>
        <p className="text-xs text-white/40 uppercase mb-2">Risk Signals</p>
        <RiskSignals />
      </div>

      {/* Activity */}
      <div>
        <p className="text-xs text-white/40 uppercase mb-2">Event Log</p>
        <EventLog />
      </div>

    </div>
  );
}