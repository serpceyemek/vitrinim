import React from "react";
import { getLocalListings } from "../services/localListings.js";
import ListingCard from "../components/ListingCard";
import "../pages/home.css";

const Home = () => {
  // Tüm kategorilerden karma ilanları karıştır
  const mixedListings = getLocalListings().sort(() => Math.random() - 0.5);


  return (
    <div className="home-page">
      <h2 className="page-title">Mağaza</h2>
      <p className="page-subtitle">Tüm kategorilerden öne çıkan ilanlar</p>

      <div className="listings-container">
        {mixedListings.map((item) => (
          <ListingCard key={item.id} listing={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
