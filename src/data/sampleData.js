// Seed data — used only the first time the app runs (no saved trips yet)
let idCounter = 1;
const nextId = () => idCounter++;

export const createSampleTrips = () => [
  {
    id: nextId(),
    name: "Goa Beach Trip",
    destination: "Goa, India",
    startDate: "2026-07-10",
    endDate: "2026-07-14",
    categories: [
      {
        id: nextId(),
        name: "Clothing",
        items: [
          { id: nextId(), name: "Swimsuits", qty: 2, packed: true, favorite: true },
          { id: nextId(), name: "Flip-flops", qty: 1, packed: false, favorite: false },
          { id: nextId(), name: "Light cotton shirts", qty: 4, packed: false, favorite: false },
        ],
      },
      {
        id: nextId(),
        name: "Toiletries",
        items: [
          { id: nextId(), name: "Sunscreen SPF 50", qty: 1, packed: true, favorite: true },
          { id: nextId(), name: "Aloe vera gel", qty: 1, packed: false, favorite: false },
        ],
      },
      {
        id: nextId(),
        name: "Documents",
        items: [
          { id: nextId(), name: "ID proof", qty: 1, packed: false, favorite: true },
          { id: nextId(), name: "Hotel booking printout", qty: 1, packed: false, favorite: false },
        ],
      },
      {
        id: nextId(),
        name: "Electronics",
        items: [
          { id: nextId(), name: "Phone charger", qty: 1, packed: false, favorite: true },
          { id: nextId(), name: "Power bank", qty: 1, packed: false, favorite: false },
        ],
      },
    ],
  },
  {
    id: nextId(),
    name: "Manali Trek",
    destination: "Manali, Himachal Pradesh",
    startDate: "2026-09-02",
    endDate: "2026-09-07",
    categories: [
      {
        id: nextId(),
        name: "Clothing",
        items: [
          { id: nextId(), name: "Thermal layers", qty: 2, packed: false, favorite: true },
          { id: nextId(), name: "Woolen socks", qty: 4, packed: false, favorite: false },
        ],
      },
      {
        id: nextId(),
        name: "Gear",
        items: [
          { id: nextId(), name: "Trekking poles", qty: 1, packed: false, favorite: false },
          { id: nextId(), name: "Headlamp", qty: 1, packed: false, favorite: true },
        ],
      },
    ],
  },
];

export const emptyTrip = (name, destination, startDate, endDate) => ({
  id: Date.now(),
  name,
  destination,
  startDate,
  endDate,
  categories: [],
});
