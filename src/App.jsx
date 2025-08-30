import { Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <NavLink to="/" end>Ana Sayfa</NavLink>
        <NavLink to="/about">Hakkımda</NavLink>
        <NavLink to="/contact">İletişim</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Ana Sayfa</h1>} />
        <Route path="/about" element={<h1>Hakkımda</h1>} />
        <Route path="/contact" element={<h1>İletişim</h1>} />
        <Route path="*" element={<h1>404 — Sayfa bulunamadı</h1>} />
      </Routes>
    </div>
  );
}

export default App;
