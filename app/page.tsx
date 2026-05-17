"use client";

import { useState, useRef, useEffect } from "react";
import { Component } from "@/components/ui/argent-loop-infinite-slider";

const ROLES = ["Controladores", "Sentinelas", "Iniciadores", "Duelistas"] as const;
type Role = typeof ROLES[number];

export default function Home() {
  const [role, setRole] = useState<Role>("Controladores");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <main>
      {/* Brand nav — sits above the slider */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between px-8 pt-7 pointer-events-none">
        <div className="pointer-events-auto">
          <span className="block text-[30px] font-semibold tracking-[0.4em] uppercase text-white/90 leading-none">
            VALORANT
          </span>

          {/* Dropdown */}
          <div ref={dropdownRef} className="relative mt-[6px]">
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-[6px] text-[8px] tracking-[0.25em] uppercase text-white/30 font-semibold hover:text-white/60 transition-colors"
            >
              {role}
              <svg
                width="7"
                height="5"
                viewBox="0 0 7 5"
                fill="none"
                style={{
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  opacity: 0.5,
                }}
              >
                <path d="M1 1L3.5 3.5L6 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </button>

            {open && (
              <div className="absolute top-full left-0 mt-2 flex flex-col gap-0 overflow-hidden"
                style={{
                  background: "rgba(8,8,8,0.75)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setOpen(false); }}
                    className="text-left px-4 py-2 text-[8px] tracking-[0.25em] uppercase font-semibold transition-colors"
                    style={{
                      color: r === role ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
                      background: r === role ? "rgba(255,255,255,0.06)" : "transparent",
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = r === role ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)"; }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <span className="hidden md:block text-[8px] tracking-[0.18em] uppercase text-white/20 mt-2 font-semibold">
          Scroll to navigate
        </span>
      </nav>

      {/* Vertical scroll hint — bottom left */}
      <div className="bottom-hint fixed bottom-8 left-8 z-50 flex flex-col items-center gap-3 pointer-events-none">
        <div className="w-px h-10 bg-white/15" />
        <span
          className="text-[8px] tracking-[0.2em] uppercase text-white/20 font-semibold"
          style={{ writingMode: "vertical-rl" }}
        >
          Drag or scroll
        </span>
      </div>

      <Component role={role} />
    </main>
  );
}
