import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { MobileHeader } from "./components/MobileHeader";
export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <div className="flex h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Sidebar - hidden on mobile by default */}
      <div className={`${sidebarOpen ? "block" : "hidden"} md:block fixed inset-y-0 left-0 z-50 md:relative`}>
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden">
          <MobileHeader openSidebar={() => setSidebarOpen(true)} />
        </div>
        {/* Dashboard */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Dashboard />
        </main>
      </div>
    </div>;
}