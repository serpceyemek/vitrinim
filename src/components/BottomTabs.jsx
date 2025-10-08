import { NavLink } from "react-router-dom";

export default function BottomTabs() {
  const cls = ({ isActive }) => "tab" + (isActive ? " active" : "");
  return (
    <nav className="bottom-tabs" aria-label="Alt gezinme">
      <NavLink to="/" end         className={cls}>
        <span className="ico">🏠</span><span className="label">Ana sayfa</span>
      </NavLink>

      <NavLink to="/kategori"    className={cls}>
        <span className="ico">▦</span><span className="label">Kategoriler</span>
      </NavLink>

      <NavLink to="/yeni"        className="tab primary">
        <span className="ico">＋</span><span className="label">İlan ver</span>
      </NavLink>

      <NavLink to="/login"       className={cls}>
        <span className="ico">👤</span><span className="label">Hesap</span>
      </NavLink>
    </nav>
  );
}
