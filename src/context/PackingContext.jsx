import React, { createContext, useContext, useEffect, useState } from "react";
import { createSampleTrips, emptyTrip } from "../data/sampleData.js";

const PackingContext = createContext(null);

const STORAGE_KEY = "trailpack-trips";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    /* ignore corrupted storage */
  }
  return createSampleTrips();
}

export function PackingProvider({ children }) {
  const [trips, setTrips] = useState(loadInitial);
  const [activeTripId, setActiveTripId] = useState(() => loadInitial()[0]?.id ?? null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  }, [trips]);

  const activeTrip = trips.find((t) => t.id === activeTripId) || trips[0] || null;

  // ---------- Trip CRUD ----------
  const addTrip = (name, destination, startDate, endDate) => {
    const trip = emptyTrip(name, destination, startDate, endDate);
    setTrips((prev) => [...prev, trip]);
    setActiveTripId(trip.id);
    return trip;
  };

  const deleteTrip = (tripId) => {
    setTrips((prev) => {
      const next = prev.filter((t) => t.id !== tripId);
      if (tripId === activeTripId) {
        setActiveTripId(next[0]?.id ?? null);
      }
      return next;
    });
  };

  // ---------- Category CRUD ----------
  const addCategory = (tripId, name) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id !== tripId
          ? t
          : {
              ...t,
              categories: [
                ...t.categories,
                { id: Date.now(), name, items: [] },
              ],
            }
      )
    );
  };

  const deleteCategory = (tripId, categoryId) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id !== tripId
          ? t
          : { ...t, categories: t.categories.filter((c) => c.id !== categoryId) }
      )
    );
  };

  // ---------- Item CRUD ----------
  const addItem = (tripId, categoryId, item) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id !== tripId
          ? t
          : {
              ...t,
              categories: t.categories.map((c) =>
                c.id !== categoryId
                  ? c
                  : {
                      ...c,
                      items: [
                        ...c.items,
                        {
                          id: Date.now(),
                          name: item.name,
                          qty: item.qty || 1,
                          packed: false,
                          favorite: false,
                        },
                      ],
                    }
              ),
            }
      )
    );
  };

  const updateItem = (tripId, categoryId, itemId, patch) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id !== tripId
          ? t
          : {
              ...t,
              categories: t.categories.map((c) =>
                c.id !== categoryId
                  ? c
                  : {
                      ...c,
                      items: c.items.map((it) =>
                        it.id !== itemId ? it : { ...it, ...patch }
                      ),
                    }
              ),
            }
      )
    );
  };

  const deleteItem = (tripId, categoryId, itemId) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id !== tripId
          ? t
          : {
              ...t,
              categories: t.categories.map((c) =>
                c.id !== categoryId
                  ? c
                  : { ...c, items: c.items.filter((it) => it.id !== itemId) }
              ),
            }
      )
    );
  };

  const togglePacked = (tripId, categoryId, itemId) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id !== tripId
          ? t
          : {
              ...t,
              categories: t.categories.map((c) =>
                c.id !== categoryId
                  ? c
                  : {
                      ...c,
                      items: c.items.map((it) =>
                        it.id !== itemId ? it : { ...it, packed: !it.packed }
                      ),
                    }
              ),
            }
      )
    );
  };

  const toggleFavorite = (tripId, categoryId, itemId) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id !== tripId
          ? t
          : {
              ...t,
              categories: t.categories.map((c) =>
                c.id !== categoryId
                  ? c
                  : {
                      ...c,
                      items: c.items.map((it) =>
                        it.id !== itemId
                          ? it
                          : { ...it, favorite: !it.favorite }
                      ),
                    }
              ),
            }
      )
    );
  };

  const value = {
    trips,
    activeTrip,
    setActiveTripId,
    addTrip,
    deleteTrip,
    addCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem,
    togglePacked,
    toggleFavorite,
  };

  return <PackingContext.Provider value={value}>{children}</PackingContext.Provider>;
}

export function usePacking() {
  const ctx = useContext(PackingContext);
  if (!ctx) throw new Error("usePacking must be used within PackingProvider");
  return ctx;
}
