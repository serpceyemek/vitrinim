import React from "react";

const ListingCard = ({ title, price, image }) => {
  return (
    <div className="listing-card">
      <img src={image} alt={title} style={{ width: "100%" }} />
      <h2>{title}</h2>
      <p>{price} ₺</p>
    </div>
  );
};

export default ListingCard;
