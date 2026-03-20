import { useState } from "react";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import CommandCenter from "./components/CommandCenter";
import InstantPayout from "./components/InstantPayout";

export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <div className="bg-[#0d0f17] min-h-screen text-white font-sans">
      
      <Navbar page={page} setPage={setPage} />

      {page === "landing" && <Landing setPage={setPage} />}

      {page === "dashboard" && (
        <>
          <CommandCenter />
          <InstantPayout />
        </>
      )}
      
    </div>
  );
}