import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileHeader from "../components/MobileHeader";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 bg-gray-100 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
