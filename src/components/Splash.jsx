import { useEffect } from "react";
import "./splash.css";

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone && onDone(), 800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="splash">
      <div className="pop">
        {/* Basit beyaz dükkân ikonu (inline SVG) */}
        <svg viewBox="0 0 24 24" width="112" height="112" stroke="white" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10h18" />
          <path d="M5 10V6l2-2h10l2 2v4" />
          <path d="M7 10v8h10v-8" />
          <rect x="9" y="13" width="5" height="3" rx="0.6" />
        </svg>
      </div>
    </div>
  );
}
