import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/auth";

export default function CourierDetails() {
  const { courierNumber } = useParams();
  const [courier, setCourier] = useState(null);

  useEffect(() => {
    api.get(`/couriers/${courierNumber}`).then(res => {
      setCourier(res.data);
    });
  }, [courierNumber]);
  
  if (!courier) return <div>Loading...</div>;

  const senderFields = [
        { label: "Name", value: courier.sender.name, disabled: true },
        { label: "Phone", value: courier.sender.phone, disabled: true },
        {
            label: "Address",
            value: courier.sender.addresses?.[0]?.address || "-",
            textarea: true,
            disabled: true,
        },
    ];

    const receiverFields = [
        { label: "Name", value: courier.receiver.name, disabled: true },
        { label: "Phone", value: courier.receiver.phone, disabled: true },
        {
            label: "Address",
            value: courier.receiver.addresses?.[0]?.address || "-",
            textarea: true,
            disabled: true,
        },
    ];



  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">
        Courier {courier.courier_number}
      </h2>

      {/* Sender / Receiver */}
      <div className="grid md:grid-cols-2 gap-4">
        <InfoCard title="Sender" fields={senderFields} />
        <InfoCard title="Receiver" fields={receiverFields} />
      </div>

      {/* Items */}
        <table className="w-full border bg-white rounded overflow-hidden">
        <thead>
            <tr className="bg-gray-100 text-sm text-left">
            <th className="p-3">Description</th>
            <th className="p-3">Weight (kg)</th>
            <th className="p-3">Bhada</th>
            <th className="p-3">Hamali</th>
            <th className="p-3">Bilti</th>
            </tr>
        </thead>
        <tbody>
            {courier.courier_items.map(item => (
            <tr key={item.id} className="border-t text-sm">
                <td className="p-3">{item.description}</td>
                <td className="p-3">{item.weight_kg}</td>
                <td className="p-3">₹{item.bhada}</td>
                <td className="p-3">₹{item.hamali}</td>
                <td className="p-3">₹{item.bilti_charge}</td>
            </tr>
            ))}
        </tbody>
        </table>

        {/* Summary Card */}
        <div className="mt-6 bg-white border rounded p-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Meta label="Total Amount" value={`₹${courier.total_amount}`} bold />
            <Meta label="Status" value={courier.status} />
            <Meta label="Payment Mode" value={courier.payment_mode} />
            <Meta label="Payment Status" value={courier.payment_status} />
        </div>

    </div>
  );
}


function InfoCard({ title, fields }) {
  return (
    <div className="bg-white p-6 rounded border">
      <h3 className="text-lg font-semibold mb-5 uppercase">
        {title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field, idx) => (
          <FormField key={idx} {...field} />
        ))}
      </div>
    </div>
  );
}

function FormField({
  label,
  required,
  textarea,
  select,
  options = [],
  value,
  maxLength,
  disabled,
  onChange,
}) {
  const commonProps =
    value !== undefined
      ? { value, onChange }
      : { defaultValue: "" };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {textarea ? (
        <textarea
          className="input min-h-[90px]"
          placeholder={label}
          disabled={disabled}
          readOnly={disabled}
          {...commonProps}
        />
      ) : select ? (
        <select
          className="input"
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          className="input"
          placeholder={label}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={disabled}
          {...commonProps}
        />
      )}
    </div>
  );
}

function Meta({ label, value, bold }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className={bold ? "font-bold text-lg" : "font-medium capitalize"}>
        {value}
      </p>
    </div>
  );
}
