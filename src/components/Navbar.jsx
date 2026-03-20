export default function Navbar({ page, setPage }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-[#0d0f17]/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        
        <h1 className="font-bold tracking-tight text-sm">GigGuard AI</h1>

        <div className="flex gap-2 text-sm">
          {[
            { name: "Home", key: "landing" },
            { name: "Dashboard", key: "dashboard" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`px-4 py-1.5 rounded-lg transition ${
                page === item.key
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}