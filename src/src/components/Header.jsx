import React from 'react';

const Header = () => (
  <header style={{ padding: '1rem', background: '#ff8c00', color: '#fff' }}>
    <h1>Vitrinim</h1>
    <nav>
      <a href="/">Anasayfa</a> | <a href="/ilanlar">İlanlar</a> | <a href="/iletisim">İletişim</a>
    </nav>
  </header>
);

export default Header;
