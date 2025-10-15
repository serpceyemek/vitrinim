// Alt bar – turuncu, ikon üstte yazı altta
import React from "react";
import { NavLink } from "react-router-dom";
import { Store, Search, Plus, Star, User } from "lucide-react";
import "./tabs.css";

export default function BottomTabs() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="tab" end>
        <Store className="tab-icon" />
        <span className="tab-text">Mağaza</span>
      </NavLink>

      <NavLink to="/arama" className="tab">
        <Search className="tab-icon" />
        <span className="tab-text">Arama</span>
      </NavLink>

      <NavLink to="/ilan-ver" className="tab publish">
        <div className="publish-btn">
          <Plus className="publish-icon" />
        </div>
        <span className="tab-text">İlan Ver</span>
      </NavLink>

      <NavLink to="/bana-ozel" className="tab">
        <Star className="tab-icon" />
        <span className="tab-text">Bana Özel</span>
      </NavLink>

      <NavLink to="/giris" className="tab">
        <User className="tab-icon" />
        <span className="tab-text">Profilim</span>
      </NavLink>
    </nav>
  );
}
