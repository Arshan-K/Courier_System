import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfileDropdown from "./ProfileDropdown";

export default function Sidebar({ open, onClose }) {
  const { t } = useTranslation();

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
          transform transition-transform duration-300 flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h1 className="text-xl font-bold mb-8">Courier Admin</h1>

        <nav className="space-y-4 flex-1">
          <NavLink to="/dashboard" className="block hover:text-gray-300" onClick={onClose}>
            {t("dashboard")}
          </NavLink>

          <NavLink to="/entry" className="block hover:text-gray-300" onClick={onClose}>
            {t("entry")}
          </NavLink>

          <NavLink to="/history" className="block hover:text-gray-300" onClick={onClose}>
            {t("history")}
          </NavLink>
        </nav>

        {/* Profile Dropdown at bottom (desktop only) */}
        <div className="hidden md:block border-t pt-4">
          <ProfileDropdown />
        </div>
      </aside>
    </>
  );
}
