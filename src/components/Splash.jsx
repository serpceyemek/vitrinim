// src/components/Splash.jsx
import { useEffect } from "react";
import "./splash.css";

export default function Splash({ onDone = () => {} }) {
  useEffect(() => {
    const t = setTimeout(() => {
      sessionStorage.setItem("splashShown", "1");
      onDone();
    }, 700); // 0.7sn
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="splash">
      <div className="splash-card">
        <img src="/logo-192.png" alt="Vitrinim" width={48} height={48} />
        <div className="splash-title">Vitrinim</div>
      </div>
    </div>
  );
}
