import React, { useState } from "react";
import { Plus, Luggage } from "lucide-react";
import CategoryAccordion from "./CategoryAccordion.jsx";
import SearchBar from "./SearchBar.jsx";
import ProgressBar from "./ProgressBar.jsx";
import FavoritesPanel from "./FavoritesPanel.jsx";
import { tripStats } from "../utils/stats.js";
import { usePacking } from "../context/PackingContext.jsx";

export default function Dashboard() {
  const { activeTrip, addCategory } = usePacking();
  const [search, setSearch] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [showCatForm, setShowCatForm] = useState(false);

  if (!activeTrip) {
    return (
      <div className="text-center py-20 text-sand/60">
        <Luggage size={32} className="mx-auto mb-3 opacity-50" />
        <p>No trips yet. Create one above to start packing.</p>
      </div>
    );
  }

  const { total, packed, pct } = tripStats(activeTrip);

  const submitCategory = (e) => {
    e.preventDefault();
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    addCategory(activeTrip.id, trimmed);
    setNewCategory("");
    setShowCatForm(false);
  };

  return (
    <div className="space-y-5">
      {/* Trip header / progress */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-2xl font-semibold text-sand">{activeTrip.name}</h2>
            <p className="text-sand/50 text-sm">{activeTrip.destination}</p>
          </div>
          <div className="text-right">
            <span className="font-display text-3xl font-bold text-clay">{pct}%</span>
            <p className="text-xs text-sand/50">{packed} of {total} packed</p>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar pct={pct} />
        </div>
      </div>

      <FavoritesPanel trip={activeTrip} />

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        {showCatForm ? (
          <form onSubmit={submitCategory} className="flex gap-2">
            <input
              autoFocus
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category name"
              className="bg-white border border-mist rounded-full px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-clay/40"
            />
            <button
              type="submit"
              className="bg-clay text-white rounded-full px-4 py-2 text-sm font-medium hover:bg-clay/90"
            >
              Add
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowCatForm(true)}
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-sand rounded-full px-4 py-2 text-sm font-medium flex-shrink-0"
          >
            <Plus size={15} /> Category
          </button>
        )}
      </div>

      <div className="space-y-3">
        {activeTrip.categories.length === 0 ? (
          <p className="text-sand/40 text-sm italic py-6 text-center">
            No categories yet — add one like "Clothing" or "Documents" to get started.
          </p>
        ) : (
          activeTrip.categories.map((category, idx) => (
            <CategoryAccordion
              key={category.id}
              trip={activeTrip}
              category={category}
              searchTerm={search}
              defaultOpen={idx === 0}
            />
          ))
        )}
      </div>
    </div>
  );
}
