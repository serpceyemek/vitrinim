import React from 'react';

const ListingCard = ({ title, image, price }) => (
  <div style={{
    border: '1px solid #ccc', borderRadius: '0.5rem', margin: '0.5rem', padding: '0.5rem', width: '200px'
  }}>
    <img src={image} alt={title} style={{ width: '100%', borderRadius: '0.5rem' }} />
    <h3>{title}</h3>
    <p>{price} ₺</p>
  </div>
);

export default ListingCard;
