import React from 'react';

const ListingCard = ({ title, image, price }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', margin: '0.5rem', width: '200px' }}>
    <img src={image} alt={title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
    <h3>{title}</h3>
    <p>{price.toLocaleString()} ₺</p>
  </div>
);

export default ListingCard;
