import { useEffect, useState } from "react";
import { searchClients } from "../utils/clients";
import { createCourier } from "../api/auth";

export default function Entry() {
  const [senderQuery, setSenderQuery] = useState("");
  const [senderResults, setSenderResults] = useState([]);
  const [sender, setSender] = useState(null);
  const [senderSelected, setSenderSelected] = useState(false);
  const [items, setItems] = useState([
    { type: "", quantity: "" }
  ]);
  const [receiver, setReceiver] = useState(null);
  const [receiverQuery, setReceiverQuery] = useState("");
  const [receiverResults, setReceiverResults] = useState([]);
  const [receiverSelected, setReceiverSelected] = useState(false);
  const [bhada, setBhada] = useState("");
  const [hamali, setHamali] = useState("");
  const BILTI = 10;
  const [senderForm, setSenderForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [receiverForm, setReceiverForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (senderSelected) return;
    if (senderQuery.length < 2) return;

    const timer = setTimeout(() => {
      searchClients(senderQuery).then(setSenderResults);
    }, 1200);

    return () => clearTimeout(timer);
  }, [senderQuery, senderSelected]);

  useEffect(() => {
    if (receiverSelected) return;
    if (receiverQuery.length < 2) return;

    const timer = setTimeout(() => {
      searchClients(receiverQuery).then(setReceiverResults);
    }, 1200);

    return () => clearTimeout(timer);
  }, [receiverQuery, receiverSelected]);

  const handleCreateCourier = async () => {
    const hasSender = sender || (senderForm.name && senderForm.phone);

    const hasReceiver = receiver || (receiverForm.name && receiverForm.phone);

    if (!hasSender || !hasReceiver) {
      alert("Sender and Receiver details are required");
      return;
    }
    const payload = {
      sender: {
        name: senderForm.name,
        phone: senderForm.phone,
        address: {
          line1: senderForm.address
        }
      },
      receiver: {
        name: receiverForm.name,
        phone: receiverForm.phone,
        address: {
          line1: receiverForm.address
        }
      },
      payment_mode: "direct",
      courier_items: items.map(i => ({
        description: i.type,
        quantity: i.quantity,
        bhada: Number(bhada || 0),
        hamali: Number(hamali || 0),
        bilti_charge: Number(BILTI || 0)
      }))
    };

    try {
      await createCourier(payload);
      alert("Courier created successfully");
    } catch (error) {
      alert("Failed to create courier");
    }
  };

  const COURIER_TYPES = [
    "Documents",
    "Electronics",
    "Clothes",
    "Food Items",
    "Fragile",
    "Other",
  ];

  const total = Number(bhada || 0) + Number(hamali || 0) + BILTI;

  return (
    <>
      <h2 className="text-3xl font-bold text-[#1f3b52] mb-6 uppercase">
        Create Courier
      </h2>

      {/* Sender & Receiver */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <InfoCard
          title="Sender Info"
          fields={[
            {
              label: "Sender Name",
              required: true,
              value: senderForm.name,
              onChange: (e) => {
                setSenderForm({ ...senderForm, name: e.target.value });
                setSenderQuery(e.target.value);
                setSender(null);
                setSenderSelected(false);
              },
            },
            {
              label: "Sender Phone",
              required: true,
              value: senderForm.phone,
              onChange: (e) =>
                setSenderForm({ ...senderForm, phone: e.target.value }),
            },
            {
              label: "Sender Email",
              value: senderForm.email,
              onChange: (e) =>
                setSenderForm({ ...senderForm, email: e.target.value }),
            },
            {
              label: "Sender Address",
              textarea: true,
              value: senderForm.address,
              onChange: (e) =>
                setSenderForm({ ...senderForm, address: e.target.value }),
            },
          ]}
        />

        <InfoCard
          title="Receiver Info"
          fields={[
            {
              label: "Receiver Name",
              required: true,
              value: receiverForm.name,
              onChange: (e) => {
                setReceiverForm({ ...receiverForm, name: e.target.value });
                setReceiverQuery(e.target.value);
                setReceiver(null);
                setReceiverSelected(false);
              },
            },
            {
              label: "Receiver Phone",
              required: true,
              value: receiverForm.phone,
              onChange: (e) =>
                setReceiverForm({ ...receiverForm, phone: e.target.value }),
            },
            {
              label: "Receiver Email",
              value: receiverForm.email,
              onChange: (e) =>
                setReceiverForm({ ...receiverForm, email: e.target.value }),
            },
            {
              label: "Receiver Address",
              textarea: true,
              value: receiverForm.address,
              onChange: (e) =>
                setReceiverForm({ ...receiverForm, address: e.target.value }),
            },
          ]}
        />
      </div>

      {receiverResults.length > 0 && (
        <div className="bg-white border rounded p-2 mb-6">
          {receiverResults.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setReceiver(c);
                setReceiverForm({
                  name: c.name,
                  phone: c.phone,
                  email: c.email,
                  address: c.address,
                });
                setReceiverResults([]);
                setReceiverSelected(true);
              }}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {c.name} — {c.phone}
            </div>
          ))}
        </div>
      )}

      {senderResults.length > 0 && (
        <div className="bg-white border rounded p-2 mb-6">
          {senderResults.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setSender(c);
                setSenderForm({
                  name: c.name,
                  phone: c.phone,
                  email: c.email,
                  address: c.address,
                });
                setSenderResults([]);
                setSenderSelected(true);
              }}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {c.name} — {c.phone}
            </div>
          ))}
        </div>
      )}

      {/* Courier Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* LEFT: Items */}
        <div className="lg:col-span-2 bg-white p-6 rounded border">
          <h3 className="text-lg font-semibold mb-5 uppercase">
            Courier Items
          </h3>

         {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
            >
              <FormField
                label="Courier Type"
                required
                select
                options={COURIER_TYPES}
                value={item.type}
                onChange={(e) => {
                  const updated = [...items];
                  updated[index].type = e.target.value;
                  setItems(updated);
                }}
              />

              <FormField
                label="Quantity"
                required
                value={item.quantity}
                onChange={(e) => {
                  const updated = [...items];
                  updated[index].quantity = e.target.value;
                  setItems(updated);
                }}
              />
            </div>
          ))}

          <button onClick={() => setItems([...items, { type: "", quantity: "" }])} className="inline-flex items-center gap-2 text-sm font-medium text-[#1f3b52]">
            + Add New Item
          </button>
        </div>

        {/* RIGHT: Charges */}
        <div className="bg-white p-6 rounded border">
          <h3 className="text-lg font-semibold mb-5 uppercase">
            Charges
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <FormField label="Bhada" value={bhada} onChange={(e) => setBhada(e.target.value)} />
            <FormField label="Hamali" value={hamali} onChange={(e) => setHamali(e.target.value)} />
            <FormField
              label="Bilti"
              value="10"
              disabled
            />
            <FormField
              label="Total"
              value={total}
              disabled
            />

          </div>
        </div>
      </div>

      {/* Submit */}
      <button
       onClick={handleCreateCourier}
       className="w-full bg-[#1f3b52] text-white py-3 rounded font-semibold text-lg">
        Create New Courier
      </button>
    </>
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
          disabled={disabled}
          readOnly={disabled}
          {...commonProps}
        />
      )}
    </div>
  );
}
