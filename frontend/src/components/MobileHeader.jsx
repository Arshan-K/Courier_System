export default function MobileHeader({ onMenuClick }) {
  return (
    <header className="md:hidden bg-[#1f3b52] text-white px-4 py-3 flex items-center">
      <button
        onClick={onMenuClick}
        className="text-2xl font-bold mr-4"
      >
        ☰
      </button>
      <h1 className="font-semibold">Courier Admin</h1>
    </header>
  );
}
