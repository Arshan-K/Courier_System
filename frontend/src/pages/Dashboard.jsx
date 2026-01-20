import { useEffect, useState } from "react";
import { fetchDashboard } from "../api/auth";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading dashboard...</p>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-[#1f3b52] mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Total Deliveries"
          value={stats?.total_deliveries}
        />
        <StatCard
          title="Pending"
          value={stats?.pending}
        />
        <StatCard
          title="Delivered"
          value={stats?.delivered}
        />
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-4">Income Overview</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          Graph coming soon
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-[#1f3b52]">
        {value}
      </p>
    </div>
  );
}
