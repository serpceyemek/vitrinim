import { useState, useEffect } from 'react';
import { fetchListings } from '../services/api';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListingCard from '../components/ListingCard';

const [listings, setListings] = useState([]);

useEffect(() => {
  fetchListings().then(data => setListings(data));
}, []);


const Home = () => (
  <>
    <Header />
    <main style={{ padding: '1rem' }}>
      <h2>Öne Çıkan İlanlar</h2>
      <div style={{ display: 'flex' }}>
        {listings.map(...)((item, i) => (
          <ListingCard key={i} {...item} />
        ))}
      </div>
    </main>
    <Footer />
  </>
);

export default Home;
