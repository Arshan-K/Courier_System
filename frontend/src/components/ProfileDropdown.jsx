import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function ProfileDropdown() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded bg-[#1f3b52] text-white hover:bg-[#2a4d66] transition"
      >
        <span className="text-lg">👤</span>
        <span className="hidden sm:inline">{t("profile")}</span>
        <span className="text-sm">▼</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 md:bottom-full mb-2 w-56 bg-white rounded shadow-lg z-50 border border-gray-200">
          {/* Language Section */}
          <div className="p-4 border-b">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              {t("language")}
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  i18n.language === "en"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {t("english")}
              </button>
              <button
                onClick={() => handleLanguageChange("hi")}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  i18n.language === "hi"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {t("hindi")}
              </button>
              <button
                onClick={() => handleLanguageChange("mr")}
                className={`w-full text-left px-3 py-2 rounded transition ${
                  i18n.language === "mr"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {t("marathi")}
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-semibold"
            >
              {t("logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
