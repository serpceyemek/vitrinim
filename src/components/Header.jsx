import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header style={{ padding: '1rem', background: '#007bff', color: 'white' }}>
    <h1>Vitrinim</h1>
    <nav>
      <Link to="/" style={{ margin: '0 1rem', color: 'white' }}>Anasayfa</Link>
      <Link to="/ilan/1" style={{ margin: '0 1rem', color: 'white' }}>İlan Detayı</Link>
    </nav>
  </header>
);

export default Header;
