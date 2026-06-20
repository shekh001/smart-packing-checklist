import React, { useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import ChecklistItem from "./ChecklistItem.jsx";
import ProgressBar from "./ProgressBar.jsx";
import AddItemForm from "./AddItemForm.jsx";
import { categoryStats } from "../utils/stats.js";
import { usePacking } from "../context/PackingContext.jsx";

const CATEGORY_ICONS = {
  Clothing: "👕",
  Toiletries: "🧴",
  Documents: "🛂",
  Electronics: "🔌",
  Gear: "🎒",
};

export default function CategoryAccordion({ trip, category, searchTerm, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const { togglePacked, toggleFavorite, deleteItem, updateItem, addItem, deleteCategory } =
    usePacking();

  const { total, packed, pct } = categoryStats(category);

  const visibleItems = category.items.filter((it) =>
    it.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm && visibleItems.length === 0) return null;

  return (
    <div className="rounded-2xl bg-sand text-ink overflow-hidden border border-mist/70">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3.5"
      >
        <span className="text-lg" aria-hidden="true">
          {CATEGORY_ICONS[category.name] || "🧳"}
        </span>
        <div className="flex-1 text-left">
          <div className="font-display font-semibold text-[15px]">{category.name}</div>
          <div className="text-xs text-ink/50">
            {packed}/{total} packed
          </div>
        </div>
        <div className="w-20 hidden sm:block">
          <ProgressBar pct={pct} size="sm" />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteCategory(trip.id, category.id);
          }}
          aria-label="Delete category"
          className="text-ink/30 hover:text-red-500 p-1"
        >
          <Trash2 size={14} />
        </button>
        <ChevronDown
          size={18}
          className={`text-ink/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-2">
          <div className="sm:hidden mb-2">
            <ProgressBar pct={pct} size="sm" />
          </div>
          {visibleItems.length === 0 ? (
            <p className="text-xs text-ink/40 italic py-2">No items yet. Add your first one below.</p>
          ) : (
            visibleItems.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                onToggle={() => togglePacked(trip.id, category.id, item.id)}
                onFavorite={() => toggleFavorite(trip.id, category.id, item.id)}
                onDelete={() => deleteItem(trip.id, category.id, item.id)}
                onQtyChange={(qty) => updateItem(trip.id, category.id, item.id, { qty })}
              />
            ))
          )}
          {!searchTerm && (
            <AddItemForm onAdd={(item) => addItem(trip.id, category.id, item)} />
          )}
        </div>
      )}
    </div>
  );
}
