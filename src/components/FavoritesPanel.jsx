import React from "react";
import { Star } from "lucide-react";
import { usePacking } from "../context/PackingContext.jsx";

export default function FavoritesPanel({ trip }) {
  const { togglePacked } = usePacking();

  const favorites = trip.categories.flatMap((c) =>
    c.items.filter((it) => it.favorite).map((it) => ({ ...it, categoryId: c.id, categoryName: c.name }))
  );

  if (favorites.length === 0) return null;

  return (
    <div className="rounded-2xl bg-clay/10 border border-clay/25 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Star size={14} className="text-clay" fill="currentColor" />
        <h3 className="font-display font-semibold text-sm text-sand">Favorite essentials</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {favorites.map((it) => (
          <button
            key={it.id}
            onClick={() => togglePacked(trip.id, it.categoryId, it.id)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              it.packed
                ? "bg-teal/20 border-teal/40 text-teal line-through"
                : "bg-white/5 border-white/15 text-sand hover:border-clay/50"
            }`}
            title={it.categoryName}
          >
            {it.name}
          </button>
        ))}
      </div>
    </div>
  );
}
