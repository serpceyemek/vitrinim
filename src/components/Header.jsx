// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // ESC ile kapat
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Panel dışına tıklayınca kapat
  useEffect(() => {
    function onClick(e) {
      if (open && panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="brand">
          <img src="/logo-192.png" alt="Vitrinim" width={24} height={24} />
          <strong>Vitrinim</strong>
        </div>

        <nav className="topnav">
          <NavLink to="/" className="topnav-link">Anasayfa</NavLink>
          <NavLink to="/kategori" className="topnav-link">Kategoriler</NavLink>
          <NavLink to="/login" className="topnav-link">Giriş</NavLink>
          <NavLink to="/yeni" className="topnav-link">İlan Yayınla</NavLink>
        </nav>

        {/* Hamburger (sadece mobilde görünecek) */}
        <button
          className="hamburger"
          aria-label="Menüyü aç"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Drawer */}
      <div className={`drawer ${open ? "drawer-open" : ""}`} aria-hidden={!open}>
        <div ref={panelRef} className="drawer-panel">
          <div className="drawer-brand">
            <img src="/logo-192.png" alt="Vitrinim" width={28} height={28} />
            <strong>Vitrinim</strong>
          </div>

          <NavLink to="/" onClick={close} className="drawer-link">Anasayfa</NavLink>
          <NavLink to="/kategori" onClick={close} className="drawer-link">Kategoriler</NavLink>
          <NavLink to="/yeni" onClick={close} className="drawer-link">İlan Yayınla</NavLink>
          <NavLink to="/login" onClick={close} className="drawer-link">Giriş</NavLink>
        </div>
      </div>
    </>
  );
}
