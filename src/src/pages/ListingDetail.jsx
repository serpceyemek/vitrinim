import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ListingDetail = () => (
  <>
    <Header />
    <main style={{ padding: '1rem' }}>
      <h2>İlan Detayı</h2>
      <img src="/placeholder.png" alt="ilan detayı" style={{ width: '100%' }} />
      <p>Burada ilanla ilgili detaylı açıklamalar, özellikler ve fiyat bilgisi yer alır.</p>
    </main>
    <Footer />
  </>
);

export
