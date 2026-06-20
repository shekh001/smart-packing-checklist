import React from "react";
import { PackingProvider } from "./context/PackingContext.jsx";
import TripSelector from "./components/TripSelector.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { Plane } from "lucide-react";

function AppShell() {
  return (
    <div className="min-h-screen bg-ink pb-16">
      <header className="px-5 sm:px-8 pt-8 pb-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Plane size={20} className="text-clay" />
          <span className="font-display text-sand/60 text-xs uppercase tracking-[0.2em]">
            Trailpack
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-sand">
          Pack smart. Land light.
        </h1>
      </header>

      <main className="px-5 sm:px-8 max-w-3xl mx-auto space-y-6">
        <TripSelector />
        <Dashboard />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <PackingProvider>
      <AppShell />
    </PackingProvider>
  );
}
