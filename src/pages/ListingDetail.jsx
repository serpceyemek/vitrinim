import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ListingDetail = () => {
  return (
    <>
      <Header />
      <main style={{ padding: "1rem" }}>
        <h2>İlan Detayı</h2>
        <img
          src="/placeholder.png"
          alt="İlan detay"
          style={{ width: "100%", maxWidth: "400px" }}
        />
        <p>
          Burada ilanla ilgili detaylı açıklamalar, özellikler ve fiyat bilgisi
          yer alacak.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default ListingDetail;
