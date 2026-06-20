import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function AddItemForm({ onAdd }) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);

  const submit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd({ name: trimmed, qty });
    setName("");
    setQty(1);
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 mt-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add an item…"
        className="flex-1 bg-white border border-mist rounded-full px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-clay/40"
      />
      <input
        type="number"
        min={1}
        value={qty}
        onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
        className="w-14 bg-white border border-mist rounded-full px-2 py-2 text-sm text-ink text-center focus:outline-none focus:ring-2 focus:ring-clay/40"
      />
      <button
        type="submit"
        aria-label="Add item"
        className="flex-shrink-0 w-9 h-9 rounded-full bg-clay text-white flex items-center justify-center hover:bg-clay/90 transition-colors"
      >
        <Plus size={17} />
      </button>
    </form>
  );
}
