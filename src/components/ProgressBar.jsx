import React from "react";

export default function ProgressBar({ pct, label, size = "md" }) {
  const height = size === "sm" ? "h-1.5" : "h-2.5";
  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-1 text-xs font-medium tracking-wide text-ink/60">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-mist/60 overflow-hidden`}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background:
              pct === 100
                ? "var(--teal)"
                : "linear-gradient(90deg, var(--clay), var(--teal))",
          }}
        />
      </div>
    </div>
  );
}
