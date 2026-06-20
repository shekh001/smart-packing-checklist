import React, { useState } from "react";
import { Star, Trash2, Minus, Plus, Check } from "lucide-react";

export default function ChecklistItem({ item, onToggle, onFavorite, onDelete, onQtyChange }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
        item.packed
          ? "bg-teal/10 border-teal/30"
          : "bg-white border-mist"
      }`}
    >
      <button
        onClick={onToggle}
        aria-label={item.packed ? "Mark as unpacked" : "Mark as packed"}
        className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
          item.packed
            ? "bg-teal border-teal"
            : "border-ink/30 hover:border-clay"
        }`}
      >
        {item.packed && <Check size={13} className="text-white" strokeWidth={3} />}
      </button>

      <span
        className={`flex-1 text-sm font-medium ${
          item.packed ? "text-ink/40 line-through" : "text-ink"
        }`}
      >
        {item.name}
      </span>

      <div className="flex items-center gap-1 bg-sand rounded-full px-1">
        <button
          onClick={() => onQtyChange(Math.max(1, item.qty - 1))}
          aria-label="Decrease quantity"
          className="w-5 h-5 flex items-center justify-center text-ink/50 hover:text-ink"
        >
          <Minus size={12} />
        </button>
        <span className="text-xs w-4 text-center text-ink/70">{item.qty}</span>
        <button
          onClick={() => onQtyChange(item.qty + 1)}
          aria-label="Increase quantity"
          className="w-5 h-5 flex items-center justify-center text-ink/50 hover:text-ink"
        >
          <Plus size={12} />
        </button>
      </div>

      <button
        onClick={onFavorite}
        aria-label={item.favorite ? "Remove favorite" : "Mark favorite"}
        className={item.favorite ? "text-clay" : "text-ink/25 hover:text-clay"}
      >
        <Star size={16} fill={item.favorite ? "currentColor" : "none"} />
      </button>

      <button
        onClick={() => {
          if (confirmDelete) {
            onDelete();
          } else {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 2000);
          }
        }}
        aria-label="Delete item"
        className={`text-ink/25 hover:text-red-500 ${confirmDelete ? "text-red-500" : ""}`}
        title={confirmDelete ? "Click again to confirm" : "Delete item"}
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}
