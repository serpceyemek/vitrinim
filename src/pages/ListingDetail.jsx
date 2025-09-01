import React from "react";
import { useParams } from "react-router-dom";

export default function ListingDetail() {
  const { id } = useParams();

  return (
    <main style={{ padding: "1rem" }}>
      <h2>İlan Detayı #{id}</h2>
      <img
        src="https://placehold.co/400x250?text=%C4%B0lan%20G%C3%B6rseli"
        alt="İlan detayı"
        style={{ width: "100%", maxWidth: "400px" }}
      />
      <p>
        Burada ilanla ilgili detaylı açıklamalar, özellikler ve fiyat bilgisi
        yer alacak.
      </p>
    </main>
  );
}
