import React, { useState } from "react";
import { Plus, MapPin, Trash2 } from "lucide-react";
import { tripStats, daysUntil } from "../utils/stats.js";
import { usePacking } from "../context/PackingContext.jsx";

function NewTripForm({ onCreate, onCancel }) {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim(), destination.trim(), startDate, endDate);
  };

  return (
    <form
      onSubmit={submit}
      className="flex-shrink-0 w-64 rounded-2xl bg-sand text-ink p-4 space-y-2 border border-mist"
    >
      <p className="font-display font-semibold text-sm mb-1">New trip</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Trip name"
        className="w-full bg-white border border-mist rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-clay/40"
        autoFocus
      />
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        className="w-full bg-white border border-mist rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-clay/40"
      />
      <div className="flex gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-1/2 bg-white border border-mist rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-clay/40"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-1/2 bg-white border border-mist rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-clay/40"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="flex-1 bg-clay text-white rounded-lg py-1.5 text-sm font-medium hover:bg-clay/90"
        >
          Create
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 text-sm text-ink/50 hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function TripSelector() {
  const { trips, activeTrip, setActiveTripId, addTrip, deleteTrip } = usePacking();
  const [creating, setCreating] = useState(false);

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
      {trips.map((trip) => {
        const { pct } = tripStats(trip);
        const isActive = activeTrip?.id === trip.id;
        const days = daysUntil(trip.startDate);
        return (
          <button
            key={trip.id}
            onClick={() => setActiveTripId(trip.id)}
            className={`perforated relative flex-shrink-0 w-64 text-left rounded-2xl px-4 py-3.5 transition-all ${
              isActive
                ? "bg-sand text-ink shadow-lg scale-[1.02]"
                : "bg-ink/40 text-sand/80 hover:bg-ink/55"
            } border ${isActive ? "border-clay/40" : "border-white/10"}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest font-semibold opacity-60">
                Boarding Pass
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  if (trips.length > 1) deleteTrip(trip.id);
                }}
                role="button"
                aria-label="Delete trip"
                className="opacity-40 hover:opacity-100 hover:text-red-500"
              >
                <Trash2 size={13} />
              </span>
            </div>
            <p className="font-display font-semibold text-base mt-1 truncate">{trip.name}</p>
            <p className="text-xs flex items-center gap-1 opacity-70 truncate">
              <MapPin size={11} /> {trip.destination || "Destination TBD"}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[11px] opacity-60">
                {days === null
                  ? "No date set"
                  : days > 0
                  ? `In ${days} day${days === 1 ? "" : "s"}`
                  : days === 0
                  ? "Today"
                  : "In progress"}
              </span>
              <span
                className={`text-xs font-bold ${isActive ? "text-teal" : "text-sand"}`}
              >
                {pct}%
              </span>
            </div>
          </button>
        );
      })}

      {creating ? (
        <NewTripForm
          onCreate={(name, destination, startDate, endDate) => {
            addTrip(name, destination, startDate, endDate);
            setCreating(false);
          }}
          onCancel={() => setCreating(false)}
        />
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="flex-shrink-0 w-20 rounded-2xl border-2 border-dashed border-white/20 text-sand/60 hover:text-sand hover:border-white/40 flex flex-col items-center justify-center gap-1"
        >
          <Plus size={18} />
          <span className="text-[10px]">New trip</span>
        </button>
      )}
    </div>
  );
}
