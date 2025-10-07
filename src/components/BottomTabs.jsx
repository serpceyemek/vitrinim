// src/components/BottomTabs.jsx
import { NavLink } from "react-router-dom";
import "./tabs.css";

export default function BottomTabs() {
  return (
    <nav className="tabs" role="navigation" aria-label="Alt gezinme">
      <NavLink to="/" className="tab">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z" fill="currentColor"/>
        </svg>
        <span>Ana sayfa</span>
      </NavLink>

      <NavLink to="/kategori" className="tab">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M10 3H3v7h7V3zm11 0h-7v7h7V3zM10 14H3v7h7v-7zm11 0h-7v7h7v-7z" fill="currentColor"/>
        </svg>
        <span>Kategoriler</span>
      </NavLink>

      <NavLink to="/yeni" className="tab add">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z" fill="currentColor"/>
        </svg>
        <span>İlan ver</span>
      </NavLink>

      <NavLink to="/login" className="tab">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-9 9v-1a7 7 0 0114 0v1H3z" fill="currentColor"/>
        </svg>
        <span>Hesap</span>
      </NavLink>
    </nav>
  );
}
