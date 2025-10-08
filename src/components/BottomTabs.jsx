import { NavLink, useNavigate } from "react-router-dom";
import "./tabs.css";

export default function BottomTabs() {
  const navigate = useNavigate();
  const focusSearch = () => {
  const el =
    document.getElementById("search") ||
    document.querySelector('input[placeholder^="Ara"]');
  if (el) {
    el.focus();
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};


  const goSearch = (e) => {
    e.preventDefault();
    // arama sekmesi: ana sayfaya git ve #search'e kaydır
    navigate("/#search");
    const el = document.getElementById("search");
    if (el) { el.focus(); el.scrollIntoView({ behavior: "smooth", block: "center" }); }
  };

  return (
    <nav className="bottom-tabs" aria-label="Alt gezinme">
      <NavLink to="/" className="tab">
        <span className="ico" aria-hidden>🏬</span>
        <span className="lbl">Mağaza</span>
      </NavLink>

      <a href="/#search" onClick={goSearch} className="tab">
        <span className="ico" aria-hidden>🔍</span>
        <span className="lbl">Arama</span>
      </a>

      <NavLink to="/yeni" className="tab primary" aria-label="İlan ver">
        <span className="ico plus" aria-hidden>＋</span>
        <span className="lbl">İlan ver</span>
      </NavLink>

      <NavLink to="/bana-ozel" className="tab">
        <span className="ico" aria-hidden>⭐</span>
        <span className="lbl">Bana özel</span>
      </NavLink>

      <NavLink to="/login" className="tab">
        <span className="ico" aria-hidden>👤</span>
        <span className="lbl">Profilim</span>
      </NavLink>
    </nav>
  );
}
