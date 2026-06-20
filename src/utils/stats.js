export function tripStats(trip) {
  if (!trip) return { total: 0, packed: 0, pct: 0 };
  const allItems = trip.categories.flatMap((c) => c.items);
  const total = allItems.length;
  const packed = allItems.filter((it) => it.packed).length;
  const pct = total === 0 ? 0 : Math.round((packed / total) * 100);
  return { total, packed, pct };
}

export function categoryStats(category) {
  const total = category.items.length;
  const packed = category.items.filter((it) => it.packed).length;
  const pct = total === 0 ? 0 : Math.round((packed / total) * 100);
  return { total, packed, pct };
}

export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24));
  return diff;
}
