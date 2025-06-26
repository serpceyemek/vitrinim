import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';

const sampleListings = [
  { title: 'Eviniz Burada!', image: '/placeholder.png', price: 120000 },
  { title: 'Otomobil Fırsatı', image: '/placeholder.png', price: 85000 },
];

const Home = () => (
  <>
    <Header />
    <main style={{ padding: '1rem' }}>
      <h2>Öne Çıkan İlanlar</h2>
      <div style={{ display: 'flex' }}>
        {sampleListings.map((item, i) => (
          <ListingCard key={i} {...item} />
        ))}
      </div>
    </main>
    <Footer />
  </>
);

export default Home;
