// src/components/BottomTabs.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Store, Search, Plus, Star, User } from "lucide-react";
import "./tabs.css";

export default function BottomTabs() {
  return (
    <nav className="bottom-nav">
      {/* Mağaza */}
      <NavLink
        to="/magaza"
        className={({ isActive }) =>
          `tab ${isActive ? "active" : ""}`
        }
      >
        <Store className="tab-icon" />
        <span className="tab-text">Mağaza</span>
      </NavLink>

      {/* Arama */}
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `tab ${isActive ? "active" : ""}`
        }
      >
        <Search className="tab-icon" />
        <span className="tab-text">Arama</span>
      </NavLink>

      {/* İlan Ver */}
      <NavLink to="/ilan-ver" className="tab publish">
        <div className="publish-btn">
          <Plus className="publish-icon" />
        </div>
        <span className="tab-text">İlan Ver</span>
      </NavLink>

      {/* Bana Özel */}
      <NavLink
        to="/bana-ozel"
        className={({ isActive }) =>
          `tab ${isActive ? "active" : ""}`
        }
      >
        <Star className="tab-icon" />
        <span className="tab-text">Bana Özel</span>
      </NavLink>

      {/* Profil */}
      <NavLink
        to="/giris"
        className={({ isActive }) =>
          `tab ${isActive ? "active" : ""}`
        }
      >
        <User className="tab-icon" />
        <span className="tab-text">Profilim</span>
      </NavLink>
    </nav>
  );
}
