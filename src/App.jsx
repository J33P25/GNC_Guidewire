import { useState, useEffect, useRef } from "react";
import {
  Shield, Home, Zap, Cloud, Activity, Bell, User, Settings,
  Thermometer, Wind, Truck, DollarSign, Check, X, Clock,
  Map, Info, LogOut, Eye, Star, TrendingUp, AlertTriangle,
  Bike, Smartphone, FileText, Plus, ChevronRight, Wifi, WifiOff,
  Package, Navigation, RefreshCw, Award, Target, Flame
} from "lucide-react";

const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    shield: Shield, home: Home, zap: Zap, cloud: Cloud, activity: Activity,
    bell: Bell, user: User, settings: Settings, thermometer: Thermometer,
    wind: Wind, truck: Truck, dollar: DollarSign, check: Check, x: X,
    clock: Clock, map: Map, info: Info, logout: LogOut, eye: Eye,
    star: Star, trending: TrendingUp, alert: AlertTriangle, bike: Bike,
    smartphone: Smartphone, fileText: FileText, plus: Plus,
    chevron: ChevronRight, wifi: Wifi, wifiOff: WifiOff, package: Package,
    navigation: Navigation, refresh: RefreshCw, award: Award, target: Target,
    flame: Flame,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? <LucideIcon size={size} color={color} strokeWidth={1.8} /> : null;
};

const fontStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0c10; --surface: #111318; --surface2: #181c24;
    --border: rgba(255,255,255,0.07); --accent: #f97316; --accent2: #fbbf24;
    --accent3: #34d399; --red: #f87171; --blue: #60a5fa;
    --text: #f0f2f5; --muted: #6b7280; --card-glow: rgba(249,115,22,0.08);
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse-ring { 0% { transform:scale(1); opacity:0.6; } 100% { transform:scale(1.6); opacity:0; } }
  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
  @keyframes slideIn { from { transform:translateX(120%); opacity:0; } to { transform:translateX(0); opacity:1; } }
  @keyframes slideOut { from { transform:translateX(0); opacity:1; } to { transform:translateX(120%); opacity:0; } }
  @keyframes fillBar { from { width:0%; } to { width:var(--target-width); } }
  @keyframes nodePop { 0% { transform:scale(0.5); opacity:0; } 60% { transform:scale(1.2); } 100% { transform:scale(1); opacity:1; } }
  @keyframes lineGrow { from { width:0%; } to { width:100%; } }
  @keyframes glowPulse { 0%,100% { box-shadow:0 0 12px rgba(249,115,22,0.4); } 50% { box-shadow:0 0 28px rgba(249,115,22,0.8); } }
  @keyframes countUp { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
  @keyframes shimmer {
    0% { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  .nav-btn:hover { background: rgba(249,115,22,0.08) !important; color: var(--accent) !important; }
  .stat-card:hover { border-color: rgba(255,255,255,0.12) !important; transform: translateY(-2px); transition: all 0.2s ease; }
  .trigger-row:hover { background: var(--surface2) !important; }
  .quick-btn:hover { border-color: rgba(249,115,22,0.4) !important; background: rgba(249,115,22,0.05) !important; }

  /* Toast */
  .toast { position:fixed; top:24px; right:24px; z-index:9999; min-width:280px; max-width:360px; background:var(--surface); border:1px solid rgba(249,115,22,0.35); border-radius:14px; padding:14px 18px; box-shadow:0 8px 32px rgba(0,0,0,0.5); animation: slideIn 0.4s ease both; display:flex; align-items:flex-start; gap:12px; }
  .toast.exit { animation: slideOut 0.3s ease both; }

  /* Timeline */
  .tl-line { height:3px; background:linear-gradient(90deg,#f97316,#fbbf24); border-radius:999px; animation:lineGrow 0.8s ease both; }
  .tl-node { animation:nodePop 0.5s ease both; }
  .tl-node.active { animation:nodePop 0.5s ease both, glowPulse 2s ease infinite 0.5s; }
`;

// ─── TOAST SYSTEM ──────────────────────────────────────────────────────────
function Toast({ toasts, removeToast }) {
  return (
    <div style={{ position: "fixed", top: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
      {toasts.map(t => (
        <div key={t.id} className="toast" style={{ borderColor: t.color ? `${t.color}55` : "rgba(249,115,22,0.35)" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: t.color ? `${t.color}18` : "rgba(249,115,22,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={t.icon || "bell"} size={15} color={t.color || "var(--accent)"} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{t.title}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{t.message}</div>
          </div>
          <button onClick={() => removeToast(t.id)} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: 2, lineHeight: 1 }}>×</button>
        </div>
      ))}
    </div>
  );
}

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const addToast = (t) => {
    const id = Date.now();
    setToasts(p => [...p, { ...t, id }]);
    setTimeout(() => setToasts(p => p.filter(x => x.id !== id)), 5000);
  };
  const removeToast = (id) => setToasts(p => p.filter(x => x.id !== id));
  return { toasts, addToast, removeToast };
}

// ─── BADGE ────────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const map = {
    active:   { bg: "rgba(52,211,153,0.15)",  color: "#34d399", label: "Active" },
    pending:  { bg: "rgba(251,191,36,0.15)",   color: "#fbbf24", label: "Pending" },
    paid:     { bg: "rgba(96,165,250,0.15)",   color: "#60a5fa", label: "Paid" },
    rejected: { bg: "rgba(248,113,113,0.15)",  color: "#f87171", label: "Rejected" },
    live:     { bg: "rgba(249,115,22,0.15)",   color: "#f97316", label: "● Live" },
  };
  const s = map[status] || map.active;
  return (
    <span style={{ background: s.bg, color: s.color, padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, fontFamily: "'Syne', sans-serif", letterSpacing: 0.5 }}>
      {s.label}
    </span>
  );
};

// ─── LOGIN ────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp]     = useState("");
  const [step, setStep]   = useState(1);
  const [loading, setLoading] = useState(false);
  const [err, setErr]     = useState("");

  const handleSendOTP = () => {
    if (phone.length < 10) { setErr("Enter a valid 10-digit number"); return; }
    setLoading(true); setErr("");
    setTimeout(() => { setLoading(false); setStep(2); }, 1200);
  };
  const handleVerify = () => {
    if (otp.length < 4) { setErr("Enter the OTP"); return; }
    setLoading(true); setErr("");
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(249,115,22,0.18) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", backgroundImage: "radial-gradient(ellipse 60% 60% at 50% 120%, rgba(251,191,36,0.08) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 420, padding: "0 20px", animation: "fadeUp 0.6s ease both" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg, #f97316, #fbbf24)", marginBottom: 16, boxShadow: "0 0 40px rgba(249,115,22,0.4)" }}>
            <Icon name="shield" size={32} color="#fff" />
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>GigGuard <span style={{ color: "var(--accent)" }}>AI</span></div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>Income Protection for Gig Workers</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "32px 28px", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{step === 1 ? "Welcome back" : "Verify your number"}</div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 28 }}>{step === 1 ? "Sign in with your registered mobile number" : `OTP sent to +91 ${phone}`}</div>
          {err && <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", color: "#f87171", padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 16 }}>{err}</div>}
          {step === 1 ? (
            <>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 8, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>Mobile Number</label>
              <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", color: "var(--muted)", fontSize: 14, whiteSpace: "nowrap" }}>+91</div>
                <input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,"").slice(0,10))} placeholder="98765 43210" maxLength={10} style={{ flex: 1, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", color: "var(--text)", fontSize: 15, outline: "none", fontFamily: "'DM Sans', sans-serif", letterSpacing: 1 }} />
              </div>
              <button onClick={handleSendOTP} disabled={loading} style={{ width: "100%", padding: "14px", borderRadius: 12, background: "linear-gradient(135deg, #f97316, #fbbf24)", border: "none", color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(249,115,22,0.35)", opacity: loading ? 0.7 : 1 }}>{loading ? "Sending..." : "Send OTP →"}</button>
            </>
          ) : (
            <>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 8, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>One-Time Password</label>
              <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,"").slice(0,6))} placeholder="• • • • • •" maxLength={6} style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", color: "var(--text)", fontSize: 22, letterSpacing: 8, outline: "none", marginBottom: 20, fontFamily: "'Syne', sans-serif", textAlign: "center" }} />
              <button onClick={handleVerify} disabled={loading} style={{ width: "100%", padding: "14px", borderRadius: 12, background: "linear-gradient(135deg, #f97316, #fbbf24)", border: "none", color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(249,115,22,0.35)", opacity: loading ? 0.7 : 1 }}>{loading ? "Verifying..." : "Verify & Login →"}</button>
              <div style={{ textAlign: "center", marginTop: 14, color: "var(--muted)", fontSize: 13 }}>
                <span onClick={() => setStep(1)} style={{ color: "var(--accent)", cursor: "pointer" }}>← Change number</span>
              </div>
            </>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: 20, color: "var(--muted)", fontSize: 12 }}>New to GigGuard? <span style={{ color: "var(--accent)", cursor: "pointer" }}>Register as Gig Worker →</span></div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────
function Sidebar({ active, setActive, onLogout }) {
  const nav = [
    { id: "dashboard", label: "Dashboard",    icon: "home" },
    { id: "triggers",  label: "Live Triggers", icon: "zap" },
    { id: "claims",    label: "My Claims",     icon: "fileText" },
    { id: "coverage",  label: "Coverage",      icon: "shield" },
    { id: "earnings",  label: "Earnings",      icon: "trending" },
    { id: "profile",   label: "Profile",       icon: "user" },
  ];
  return (
    <div style={{ width: 220, minHeight: "100vh", background: "var(--surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 100 }}>
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #f97316, #fbbf24)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(249,115,22,0.35)" }}>
            <Icon name="shield" size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: -0.3 }}>GigGuard</div>
            <div style={{ fontSize: 10, color: "var(--accent)", fontWeight: 600, letterSpacing: 0.5 }}>AI INSURANCE</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {nav.map(item => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => setActive(item.id)} className="nav-btn"
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 10, background: isActive ? "rgba(249,115,22,0.12)" : "transparent", border: isActive ? "1px solid rgba(249,115,22,0.25)" : "1px solid transparent", color: isActive ? "var(--accent)" : "var(--muted)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: isActive ? 500 : 400, cursor: "pointer", marginBottom: 4, textAlign: "left", transition: "all 0.15s ease" }}>
              <Icon name={item.icon} size={16} color={isActive ? "var(--accent)" : "var(--muted)"} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: "16px 12px", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #f97316, #fbbf24)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color: "#fff" }}>R</span>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Ravi Kumar</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Swiggy Partner</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "transparent", border: "1px solid transparent", color: "var(--muted)", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
          <Icon name="logout" size={14} color="var(--muted)" /> Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── STAT CARD ─────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, color = "var(--accent)", delay = 0 }) {
  return (
    <div className="stat-card" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 22px", animation: `fadeUp 0.5s ease ${delay}ms both`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at 80% 20%, ${color}22 0%, transparent 70%)` }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500, letterSpacing: 0.4, textTransform: "uppercase" }}>{label}</div>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={16} color={color} />
        </div>
      </div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: -0.5, color: "var(--text)" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ─── TRIGGER CARD ─────────────────────────────────────────────────────────
function TriggerCard({ icon, title, status, value, payout, color, active: isActive }) {
  return (
    <div style={{ background: "var(--surface)", border: `1px solid ${isActive ? color + "44" : "var(--border)"}`, borderRadius: 16, padding: "18px 20px", position: "relative", overflow: "hidden", boxShadow: isActive ? `0 0 24px ${color}18` : "none", transition: "all 0.3s ease" }}>
      {isActive && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Icon name={icon} size={18} color={color} />
            {isActive && <div style={{ position: "absolute", inset: -2, borderRadius: 14, border: `1px solid ${color}`, animation: "pulse-ring 1.5s ease-out infinite" }} />}
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14 }}>{title}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{value}</div>
          </div>
        </div>
        <Badge status={isActive ? "live" : "active"} />
      </div>
      {isActive && (
        <div style={{ marginTop: 14, padding: "10px 14px", background: `${color}0f`, borderRadius: 10, border: `1px solid ${color}22`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 12, color: color }}>Payout Triggered!</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: color, fontSize: 15 }}>+{payout}</div>
        </div>
      )}
    </div>
  );
}

// ─── ANIMATED MILESTONE TIMELINE ──────────────────────────────────────────
function MilestoneTimeline({ current = 18, total = 25, bonus = 600, addToast }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Milestones at 5, 10, 15, 20, 25
const milestones = [
  { orders: 5,  label: "Base Target",        reward: "₹50",  icon: "target" },
  { orders: 10, label: "Stability Tier",     reward: "₹120", icon: "trending" },
  { orders: 15, label: "Earnings Tier",      reward: "₹250", icon: "award" },
  { orders: 20, label: "High Performance",   reward: "₹420", icon: "flame" },
  { orders: 25, label: "Max Bonus Threshold",reward: "₹600", icon: "shield" },
];

  const progress = Math.min(current / total, 1);

  return (
    <div ref={ref} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px 24px", marginBottom: 24, animation: "fadeUp 0.5s ease 0.2s both" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}>Daily Milestone Timeline</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>7 more orders to unlock <strong style={{ color: "var(--accent2)" }}>₹600 Bonus</strong></div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "var(--accent)" }}>{current}<span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 400 }}>/{total}</span></div>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>orders today</div>
        </div>
      </div>

      {/* Track */}
      <div style={{ position: "relative", paddingBottom: 48, paddingTop: 12 }}>
        {/* Background rail */}
        <div style={{ position: "absolute", left: "4%", right: "4%", top: 22, height: 4, background: "var(--surface2)", borderRadius: 999 }} />
        {/* Filled rail */}
        <div
          style={{
            position: "absolute", left: "4%", top: 22, height: 4,
            width: animated ? `${Math.min(progress * 92, 92)}%` : "0%",
            background: "linear-gradient(90deg, #f97316, #fbbf24)",
            borderRadius: 999,
            transition: "width 1.4s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />

        {/* Milestone nodes */}
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          {milestones.map((m, i) => {
            const isDone = current >= m.orders;
            const isCurrent = current >= (milestones[i - 1]?.orders ?? 0) && current < m.orders;
            const delay = 400 + i * 180;
            return (
              <div key={m.orders} className={`tl-node${isDone || isCurrent ? " active" : ""}`}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", animation: animated ? `nodePop 0.5s ease ${delay}ms both` : "none", opacity: animated ? 1 : 0 }}>
                {/* Node */}
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: isDone ? "linear-gradient(135deg, #f97316, #fbbf24)" : isCurrent ? "var(--surface2)" : "var(--surface2)",
                  border: isDone ? "none" : isCurrent ? "2px solid #f97316" : "2px solid var(--border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: isDone ? "0 0 18px rgba(249,115,22,0.5)" : isCurrent ? "0 0 14px rgba(249,115,22,0.25)" : "none",
                  transition: "all 0.4s ease",
                  position: "relative", zIndex: 2,
                }}>
                  {isDone
                    ? <Icon name="check" size={18} color="#fff" />
                    : <Icon name={m.icon} size={16} color={isCurrent ? "var(--accent)" : "var(--muted)"} />
                  }
                  {isCurrent && (
                    <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1.5px solid rgba(249,115,22,0.5)", animation: "pulse-ring 1.8s ease-out infinite" }} />
                  )}
                </div>
                {/* Label below */}
                <div style={{ marginTop: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, color: isDone ? "var(--accent)" : isCurrent ? "var(--text)" : "var(--muted)", letterSpacing: 0.3 }}>{m.label}</div>
                  <div style={{ fontSize: 11, color: isDone ? "var(--accent3)" : isCurrent ? "var(--accent2)" : "var(--muted)", fontWeight: isDone ? 700 : 400, marginTop: 1 }}>{m.reward}</div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1 }}>{m.orders} orders</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
        <div style={{ flex: 1, padding: "10px 14px", background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="check" size={14} color="var(--accent3)" />
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Elite badge unlocked at <strong style={{ color: "var(--accent3)" }}>20 orders</strong></div>
        </div>
        <div style={{ flex: 1, padding: "10px 14px", background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="thermometer" size={14} color="#f87171" />
          <div style={{ fontSize: 12, color: "var(--muted)" }}>Heat payout <strong style={{ color: "#f87171" }}>₹180</strong> incoming to UPI</div>
        </div>
      </div>
    </div>
  );
}

// ─── LIVE WEATHER WIDGET ──────────────────────────────────────────────────
function WeatherWidget() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: 16, padding: "18px 20px", animation: "fadeUp 0.4s ease 0.35s both" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13 }}>Zone Environment</div>
        <div style={{ fontSize: 11, color: "var(--muted)" }}>Thrissur Central</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {[
          { label: "Wet Bulb", value: "37.2°C", sub: "Dangerous", color: "#f87171", icon: "thermometer" },
          { label: "AQI",      value: "312",     sub: "Moderate",  color: "#fbbf24", icon: "wind" },
          { label: "Humidity", value: "84%",     sub: "Very High", color: "#60a5fa", icon: "cloud" },
        ].map(w => (
          <div key={w.label} style={{ background: "var(--surface2)", borderRadius: 10, padding: "12px", textAlign: "center" }}>
            <Icon name={w.icon} size={16} color={w.color} />
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: w.color, margin: "6px 0 2px" }}>{w.value}</div>
            <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 0.4 }}>{w.label}</div>
            <div style={{ fontSize: 10, color: w.color, marginTop: 2 }}>{w.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────
function DashboardPage({ setActive, addToast }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const triggers = [
    { icon: "thermometer", title: "Wet Bulb Heat Stress",  value: "37.2°C · Zone: Thrissur Central", color: "#f87171", active: true,  payout: "₹180" },
    { icon: "wind",        title: "Severe AQI / Pollution", value: "AQI 312 · Moderate",              color: "#fbbf24", active: false, payout: "₹220" },
    { icon: "alert",       title: "Strike / Bandh Alert",   value: "No alerts detected",              color: "#a78bfa", active: false, payout: "₹350" },
    { icon: "smartphone",  title: "Platform Outage",        value: "Swiggy API: ✓ Online",            color: "#60a5fa", active: false, payout: "₹150" },
    { icon: "map",         title: "Gridlock / Traffic",     value: "Avg speed: 18km/h · Normal",      color: "#34d399", active: false, payout: "₹80" },
    { icon: "truck",       title: "Phantom Order Fraud",    value: "Last order: Delivered OK",         color: "#f97316", active: false, payout: "₹60" },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.4 }}>Good morning, Ravi</div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>{time.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} · {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => addToast({ title: "Heat Alert", message: "Wet-bulb 37.2°C active. Payout of ₹180 queued to your UPI.", icon: "thermometer", color: "#f87171" })}
            style={{ padding: "8px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--muted)", fontSize: 12, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}>
            Test Alert
          </button>
          <div style={{ position: "relative" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--surface2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Icon name="bell" size={16} color="var(--muted)" />
            </div>
            <div style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", border: "2px solid var(--surface)", animation: "blink 2s ease infinite" }} />
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 14, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14, animation: "fadeUp 0.4s ease both" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(248,113,113,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="thermometer" size={18} color="#f87171" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#f87171" }}>Heat Stress Trigger Active</div>
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>Wet Bulb temp 37.2°C in your zone. Payout of ₹180 queued to your UPI.</div>
        </div>
        <Badge status="live" />
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Today's Earnings" value="₹1,240" sub="₹600 bonus locked" icon="dollar" color="var(--accent3)" delay={0} />
        <StatCard label="Payouts Received" value="₹3,680" sub="This month" icon="trending" color="var(--accent)" delay={60} />
        <StatCard label="Active Coverage" value="Premium" sub="Renewed 3 days ago" icon="shield" color="var(--blue)" delay={120} />
        <StatCard label="Resiliency Score" value="94 / 100" sub="↑ 3pts this week" icon="star" color="var(--accent2)" delay={180} />
      </div>

      {/* 2-col layout: Timeline + Weather */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 24 }}>
        <MilestoneTimeline current={18} total={25} bonus={600} addToast={addToast} />
        <WeatherWidget />
      </div>

      {/* Triggers Grid */}
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Live Environment Triggers</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {triggers.map((t, i) => <TriggerCard key={i} {...t} />)}
      </div>

      {/* Quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 24 }}>
        <button onClick={() => setActive("claims")} className="quick-btn" style={{ padding: "16px 20px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, cursor: "pointer", color: "var(--text)", display: "flex", alignItems: "center", gap: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, transition: "all 0.2s" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(96,165,250,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="fileText" size={16} color="var(--blue)" /></div>
          File a Manual Claim
        </button>
        <button onClick={() => setActive("coverage")} className="quick-btn" style={{ padding: "16px 20px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, cursor: "pointer", color: "var(--text)", display: "flex", alignItems: "center", gap: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, transition: "all 0.2s" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(249,115,22,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="shield" size={16} color="var(--accent)" /></div>
          View My Coverage Plan
        </button>
      </div>
    </div>
  );
}

// ─── LIVE TRIGGERS PAGE ───────────────────────────────────────────────────
function TriggersPage() {
  const [zone, setZone] = useState("Thrissur Central");
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const triggers = [
    { id: 1, icon: "thermometer", title: "Wet Bulb Heat Stress",   description: "OpenWeather API polls every 15 min. Triggers if wet-bulb >35°C for 1 hr.", threshold: "Wet Bulb > 35°C for 1hr", current: "37.2°C — TRIGGERED",   color: "#f87171", status: "live",   payout: "₹180 / hr" },
    { id: 2, icon: "wind",        title: "Severe AQI / Pollution", description: "Integrates with AQICN API. Covers PM2.5 hazardous exposure zones.",           threshold: "AQI > 450 (Hazardous)", current: "AQI 312 — Moderate",  color: "#fbbf24", status: "active", payout: "₹220 / event" },
    { id: 3, icon: "alert",       title: "Strike / Bandh",         description: "BERT NLP scans news + Twitter/X, confirmed by TomTom traffic flatline.",       threshold: "Traffic = 0 + NLP match", current: "No alerts",         color: "#a78bfa", status: "active", payout: "₹350 / event" },
    { id: 4, icon: "smartphone",  title: "Platform / EV Outage",   description: "Pings Swiggy/Zepto servers. Triggers on 503 / timeout > 45 min.",             threshold: ">45 min 503 error",     current: "All systems ✓ Online", color: "#60a5fa", status: "active", payout: "₹150 / hr" },
    { id: 5, icon: "map",         title: "Gridlock / Road Damage",  description: "TomTom detects avg speed <5km/h for 60 min while rider is On Active Delivery.", threshold: "<5 km/h for 60 min",    current: "Avg: 18 km/h — OK",    color: "#34d399", status: "active", payout: "₹40 / 15 min" },
    { id: 6, icon: "truck",       title: "Phantom Order Fraud",    description: "GPS validates >5km travel with 'Customer Unreachable' flag from platform API.",  threshold: "5km+ travel, order fake", current: "Last order: Valid",  color: "#f97316", status: "active", payout: "₹60 + fuel" },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: -0.4 }}>Live Trigger Monitor</div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>Real-time parametric trigger status for your active zone</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={refresh} style={{ width: 36, height: 36, borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <div style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }}><Icon name="refresh" size={14} color="var(--muted)" /></div>
          </button>
          {["Thrissur Central","Ernakulam","Palakkad"].map(z => (
            <button key={z} onClick={() => setZone(z)} style={{ padding: "7px 14px", borderRadius: 8, background: zone === z ? "rgba(249,115,22,0.15)" : "var(--surface)", border: zone === z ? "1px solid rgba(249,115,22,0.4)" : "1px solid var(--border)", color: zone === z ? "var(--accent)" : "var(--muted)", fontSize: 12, cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: zone === z ? 700 : 400 }}>{z}</button>
          ))}
        </div>
      </div>

      {/* Summary pills */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {[["1 Active Trigger", "#f87171"], ["5 Monitoring", "var(--accent3)"], ["Last sync: 2 min ago", "var(--muted)"]].map(([l, c]) => (
          <div key={l} style={{ padding: "6px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 999, fontSize: 12, color: c, fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{l}</div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {triggers.map((t, i) => (
          <div key={t.id} className="trigger-row" style={{ background: "var(--surface)", border: `1px solid ${t.status === "live" ? t.color + "44" : "var(--border)"}`, borderRadius: 16, padding: "20px 22px", animation: `fadeUp 0.4s ease ${i * 60}ms both`, position: "relative", overflow: "hidden", boxShadow: t.status === "live" ? `0 0 30px ${t.color}15` : "none", transition: "background 0.2s" }}>
            {t.status === "live" && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }} />}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${t.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
                <Icon name={t.icon} size={22} color={t.color} />
                {t.status === "live" && <div style={{ position: "absolute", inset: -3, borderRadius: 16, border: `1px solid ${t.color}`, animation: "pulse-ring 1.5s ease-out infinite" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15 }}>{t.title}</div>
                  <Badge status={t.status} />
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 6 }}>{t.description}</div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Threshold: <span style={{ color: "var(--text)" }}>{t.threshold}</span></div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Now: <span style={{ color: t.status === "live" ? t.color : "var(--accent3)" }}>{t.current}</span></div>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>MAX PAYOUT</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: t.color }}>{t.payout}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CLAIMS PAGE ──────────────────────────────────────────────────────────
function ClaimsPage() {
  const [tab, setTab] = useState("all");
  const claims = [
    { id: "GG-2026-0041", date: "20 Jun 2026", type: "Heat Stress",    amount: "₹180", status: "paid",     trigger: "Wet Bulb 37.2°C · Thrissur" },
    { id: "GG-2026-0039", date: "18 Jun 2026", type: "Gridlock",       amount: "₹160", status: "paid",     trigger: "Avg speed 4.2km/h · 65 min" },
    { id: "GG-2026-0037", date: "15 Jun 2026", type: "Heat Stress",    amount: "₹180", status: "pending",  trigger: "Wet Bulb 36.1°C · Processing" },
    { id: "GG-2026-0034", date: "10 Jun 2026", type: "Phantom Order",  amount: "₹90",  status: "paid",     trigger: "GPS: 5.8km, Order Fake" },
    { id: "GG-2026-0030", date: "04 Jun 2026", type: "Platform Outage",amount: "₹150", status: "rejected", trigger: "App offline < 45 min threshold" },
    { id: "GG-2026-0025", date: "28 May 2026", type: "Gridlock",       amount: "₹80",  status: "paid",     trigger: "Avg speed 3.1km/h · 62 min" },
  ];
  const filtered = tab === "all" ? claims : claims.filter(c => c.status === tab);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800 }}>My Claims</div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>Auto-triggered and manual claim history</div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "linear-gradient(135deg, #f97316, #fbbf24)", border: "none", borderRadius: 10, color: "#fff", fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          <Icon name="plus" size={14} color="#fff" /> File Manual Claim
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        {[["Total Paid","₹3,680","accent3"],["Pending","₹180","accent2"],["Rejected","1 claim","red"]].map(([l,v,c]) => (
          <div key={l} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>{l}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: `var(--${c})` }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {["all","paid","pending","rejected"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "7px 16px", borderRadius: 8, background: tab === t ? "rgba(249,115,22,0.15)" : "var(--surface)", border: tab === t ? "1px solid rgba(249,115,22,0.4)" : "1px solid var(--border)", color: tab === t ? "var(--accent)" : "var(--muted)", fontSize: 12, cursor: "pointer", fontFamily: "'Syne', sans-serif", fontWeight: tab === t ? 700 : 400, textTransform: "capitalize" }}>{t === "all" ? "All Claims" : t}</button>
        ))}
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 2fr 1fr 1fr", padding: "12px 20px", background: "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
          {["Claim ID","Date","Trigger Detail","Amount","Status"].map(h => (
            <div key={h} style={{ fontSize: 11, color: "var(--muted)", fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</div>
          ))}
        </div>
        {filtered.map((c, i) => (
          <div key={c.id} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 2fr 1fr 1fr", padding: "14px 20px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", alignItems: "center", animation: `fadeUp 0.3s ease ${i * 40}ms both` }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>{c.id}</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>{c.date}</div>
            <div><div style={{ fontSize: 13, fontWeight: 500 }}>{c.type}</div><div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{c.trigger}</div></div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15 }}>{c.amount}</div>
            <div><Badge status={c.status} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COVERAGE PAGE ────────────────────────────────────────────────────────
function CoveragePage() {
  const plans = [
    {
      name: "Starter Safety Net",
      price: "₹15/week",
      color: "var(--muted)",
      desc: "Protects you from basic income loss during extreme conditions",
      covers: [
        "Heat Stress (Wet Bulb > 35°C)",
        "Platform / App Outages"
      ],
      excludes: [
        "AQI / Pollution",
        "Traffic Gridlock",
        "Strikes / Bandh",
        "Phantom Orders"
      ],
      highlight: "For part-time riders",
      active: false
    },
    {
      name: "Gig Premium",
      price: "₹25/week",
      color: "var(--accent)",
      desc: "Complete daily income protection for active delivery partners",
      covers: [
        "Heat Stress + AQI Pollution",
        "Platform Outages (Swiggy/Zepto)",
        "Traffic Gridlock Compensation",
        "Phantom / Fake Orders"
      ],
      excludes: [
        "Strikes / Bandh"
      ],
      highlight: "MOST POPULAR",
      active: true
    },
    {
      name: "Full Resilience Cover",
      price: "₹40/week",
      color: "var(--accent2)",
      desc: "Maximum protection against all income disruptions",
      covers: [
        "Heat Stress + AQI Pollution",
        "Strikes / Bandh Protection",
        "Platform / EV Outages",
        "Traffic Gridlock",
        "Phantom Orders"
      ],
      excludes: [],
      highlight: "Ultimate safety net",
      active: false
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800 }}>
          Income Protection Plans
        </div>
        <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>
          Secure your <strong>daily milestone bonuses</strong> against real-world disruptions.
          No claims. No paperwork. <strong>Instant UPI payouts.</strong>
        </div>
      </div>

      {/* PLANS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
        {plans.map((p, i) => (
          <div key={p.name} style={{
            background: "var(--surface)",
            border: `1.5px solid ${p.active ? p.color + "55" : "var(--border)"}`,
            borderRadius: 20,
            padding: "24px 22px",
            position: "relative",
            overflow: "hidden",
            animation: `fadeUp 0.4s ease ${i * 80}ms both`,
            boxShadow: p.active ? `0 0 32px ${p.color}18` : "none"
          }}>
            {p.active && <div style={{ position: "absolute", top: 14, right: 14 }}><Badge status="active" /></div>}
            {p.active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />}

            {/* Title */}
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17 }}>
              {p.name}
            </div>

            {/* Tagline */}
            <div style={{ fontSize: 12, color: p.color, marginTop: 4, fontWeight: 600 }}>
              {p.highlight}
            </div>

            {/* Price */}
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: p.color, margin: "12px 0 10px" }}>
              {p.price}
            </div>

            {/* Description */}
            <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 16, lineHeight: 1.5 }}>
              {p.desc}
            </div>

            {/* Covers */}
            <div style={{ marginBottom: 16 }}>
              {p.covers.map(c => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(52,211,153,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="check" size={10} color="var(--accent3)" />
                  </div>
                  <span style={{ fontSize: 13 }}>{c}</span>
                </div>
              ))}

              {p.excludes.map(c => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(107,114,128,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="x" size={10} color="var(--muted)" />
                  </div>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{c}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button style={{
              width: "100%",
              padding: "11px",
              borderRadius: 10,
              background: p.active ? `${p.color}22` : "var(--surface2)",
              border: p.active ? `1px solid ${p.color}44` : "1px solid var(--border)",
              color: p.active ? p.color : "var(--muted)",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer"
            }}>
              {p.active ? "✓ Active Plan" : "Upgrade Protection"}
            </button>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px 24px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 20 }}>
          How GigGuard Protects Your Income
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { step: "01", label: "Environment Monitored", desc: "APIs track weather, traffic & platform uptime every 15 mins", icon: "activity" },
            { step: "02", label: "Trigger Detected", desc: "Conditions like heat, AQI, or outages cross defined thresholds", icon: "alert" },
            { step: "03", label: "Income Risk Calculated", desc: "System checks if your milestone bonus is at risk", icon: "target" },
            { step: "04", label: "Instant UPI Credit", desc: "Payout sent automatically — no claim filing needed", icon: "dollar" },
          ].map(s => (
            <div key={s.step} style={{ textAlign: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(249,115,22,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <Icon name={s.icon} size={20} color="var(--accent)" />
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 11, color: "var(--accent)", marginBottom: 4 }}>
                STEP {s.step}
              </div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EARNINGS PAGE ────────────────────────────────────────────────────────
function EarningsPage() {
  const weeks = [
    { week: "Jun 16–20", orders: 87, base: 3480, bonus: 2400, payouts: 360, total: 6240 },
    { week: "Jun 9–15",  orders: 74, base: 2960, bonus: 1800, payouts: 540, total: 5300 },
    { week: "Jun 2–8",   orders: 91, base: 3640, bonus: 2400, payouts: 180, total: 6220 },
    { week: "May 26–Jun 1", orders: 68, base: 2720, bonus: 1800, payouts: 720, total: 5240 },
  ];
  const maxTotal = Math.max(...weeks.map(w => w.total));
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800 }}>Earnings & Payouts</div>
        <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>Breakdown of income, bonuses, and GigGuard resiliency payouts</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
        <StatCard label="This Month" value="₹23,000" sub="↑ 12% vs last month" icon="trending" color="var(--accent3)" />
        <StatCard label="GigGuard Payouts" value="₹1,800" sub="Extra income from coverage" icon="shield" color="var(--accent)" />
        <StatCard label="Bonus Hit Rate" value="82%" sub="21 of 25 milestone bonuses" icon="star" color="var(--accent2)" />
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px 24px", marginBottom: 24 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Weekly Breakdown</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {weeks.map((w, i) => (
            <div key={w.week} style={{ animation: `fadeUp 0.4s ease ${i * 60}ms both` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{w.week}</div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "var(--accent3)" }}>₹{w.total.toLocaleString()}</div>
              </div>
              <div style={{ position: "relative", height: 28, background: "var(--surface2)", borderRadius: 8, overflow: "hidden", display: "flex" }}>
                <div style={{ height: "100%", width: `${(w.base / maxTotal) * 100}%`, background: "rgba(96,165,250,0.6)", transition: "width 1s ease" }} />
                <div style={{ height: "100%", width: `${(w.bonus / maxTotal) * 100}%`, background: "rgba(251,191,36,0.6)", transition: "width 1s ease" }} />
                <div style={{ height: "100%", width: `${(w.payouts / maxTotal) * 100}%`, background: "rgba(249,115,22,0.8)", transition: "width 1s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 6, fontSize: 11, color: "var(--muted)" }}>
                <span><span style={{ color: "#60a5fa" }}>■</span> Base ₹{w.base.toLocaleString()}</span>
                <span><span style={{ color: "#fbbf24" }}>■</span> Bonus ₹{w.bonus.toLocaleString()}</span>
                <span><span style={{ color: "#f97316" }}>■</span> Payouts ₹{w.payouts}</span>
                <span>{w.orders} orders</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid rgba(251,191,36,0.25)", borderRadius: 16, padding: "22px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(251,191,36,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "2px solid rgba(251,191,36,0.3)" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "var(--accent2)" }}>94</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Resiliency Score: <span style={{ color: "var(--accent2)" }}>Excellent</span></div>
            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>Your score determines claim eligibility and premium pricing. Avoid false claims to maintain a high score and get lower premiums.</div>
          </div>
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4, textAlign: "right" }}>NEXT RENEWAL</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "var(--accent3)" }}>3 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────
function ProfilePage() {
  const [upi, setUpi] = useState("ravi.kumar@upi");
  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 28 }}>My Profile</div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "28px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #f97316, #fbbf24)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(249,115,22,0.35)" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, color: "#fff" }}>R</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20 }}>Ravi Kumar</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>Partner ID: SW-KL-094821</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Badge status="active" />
              <span style={{ fontSize: 12, color: "var(--muted)", padding: "2px 10px", borderRadius: 999, background: "var(--surface2)", border: "1px solid var(--border)" }}>Gig Premium</span>
            </div>
          </div>
        </div>
        {[["Full Name","Ravi Kumar"],["Mobile","+91 98765 43210"],["Platform","Swiggy"],["City","Thrissur, Kerala"],["e-Shram ID","UW-KL-2094-3821"]].map(([l,v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{l}</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{v}</div>
          </div>
        ))}
        <div style={{ padding: "14px 0" }}>
          <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500, marginBottom: 10 }}>UPI ID (Payout)</div>
          <div style={{ display: "flex", gap: 10 }}>
            <input value={upi} onChange={e => setUpi(e.target.value)} style={{ flex: 1, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
            <button style={{ padding: "10px 16px", background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 10, color: "var(--accent)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Syne', sans-serif", whiteSpace: "nowrap" }}>Update</button>
          </div>
        </div>
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Notification Preferences</div>
        {[["Payout Alerts",true],["Trigger Warnings",true],["Weekly Report",false],["Premium Reminders",true]].map(([l,on]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
            <div style={{ fontSize: 13 }}>{l}</div>
            <div style={{ width: 40, height: 22, borderRadius: 999, background: on ? "rgba(249,115,22,0.5)" : "var(--surface2)", border: on ? "1px solid rgba(249,115,22,0.6)" : "1px solid var(--border)", position: "relative", cursor: "pointer" }}>
              <div style={{ position: "absolute", top: 3, left: on ? 20 : 3, width: 14, height: 14, borderRadius: "50%", background: on ? "var(--accent)" : "var(--muted)", transition: "left 0.2s ease" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive]   = useState("dashboard");
  const { toasts, addToast, removeToast } = useToasts();

  const pages = {
    dashboard: DashboardPage,
    triggers:  TriggersPage,
    claims:    ClaimsPage,
    coverage:  CoveragePage,
    earnings:  EarningsPage,
    profile:   ProfilePage,
  };

  const PageComponent = pages[active];

  return (
    <>
      <style>{fontStyle}</style>
      <Toast toasts={toasts} removeToast={removeToast} />
      {!loggedIn ? (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      ) : (
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <Sidebar active={active} setActive={setActive} onLogout={() => setLoggedIn(false)} />
          <main style={{ marginLeft: 220, flex: 1, padding: "32px 36px", minHeight: "100vh", background: "var(--bg)" }}>
            <PageComponent setActive={setActive} addToast={addToast} />
          </main>
        </div>
      )}
    </>
  );
}