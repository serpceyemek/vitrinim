import React from 'react';

const ListingCard = ({ title, image, price }) => (
  <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '0.5rem' }}>
    <img src={image} alt={title} style={{ width: '100%' }} />
    <h3>{title}</h3>
    <p>{price} TL</p>
  </div>
);

export default ListingCard;
