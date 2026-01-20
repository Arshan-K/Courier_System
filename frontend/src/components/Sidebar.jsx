import { NavLink } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-64 bg-[#1f3b52] text-white min-h-screen p-4
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h1 className="text-xl font-bold mb-8">Courier Admin</h1>

        <nav className="space-y-4">
          <NavLink to="/dashboard" className="block" onClick={onClose}>
            Dashboard
          </NavLink>

          <NavLink to="/entry" className="block" onClick={onClose}>
            Entry
          </NavLink>

          <NavLink to="/history" className="block" onClick={onClose}>
            History
          </NavLink>

          <button
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
            className="mt-10 text-left w-full"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
