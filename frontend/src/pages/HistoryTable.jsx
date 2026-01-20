export default function HistoryTable({ couriers }) {
  if (!couriers || couriers.length === 0) {
    return (
      <div className="bg-white border rounded p-6 text-center text-gray-500">
        No courier history found
      </div>
    );
  }

  return (
    <table className="w-full border bg-white">
      <thead>
        <tr className="bg-gray-100 text-left text-sm">
          <th className="p-3">Courier No</th>
          <th className="p-3">Sender</th>
          <th className="p-3">Receiver</th>
          <th className="p-3">Items</th>
          <th className="p-3">Amount</th>
          <th className="p-3">Status</th>
          <th className="p-3">Date</th>
        </tr>
      </thead>

      <tbody>
        {couriers.map((c) => (
          <tr key={c.id} className="border-t text-sm">
            <td className="p-3 font-medium">{c.courier_number}</td>
            <td className="p-3">{c.sender?.name}</td>
            <td className="p-3">{c.receiver?.name}</td>
            <td className="p-3">{c.courier_items.length}</td>
            <td className="p-3">₹{c.total_amount}</td>
            <td className="p-3 capitalize">{c.status}</td>
            <td className="p-3">
              {new Date(c.created_at).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
