import ProfileDropdown from "./ProfileDropdown";

export default function MobileHeader({ onMenuClick }) {
  return (
    <header className="md:hidden bg-[#1f3b52] text-white px-4 py-3 flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="text-2xl font-bold"
      >
        ☰
      </button>
      <h1 className="font-semibold flex-1 text-center">Courier Admin</h1>
      <ProfileDropdown />
    </header>
  );
}
