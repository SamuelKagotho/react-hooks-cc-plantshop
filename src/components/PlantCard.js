import React, { useState } from "react";

function PlantCard({ plant, handleStockChange, handlePriceUpdate, handleDelete }) {
  const { id, name, image, price, inStock } = plant;
  const [newPrice, setNewPrice] = useState(price); // Local state for updating price

  const toggleStock = () => {
    handleStockChange(id);
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleUpdatePrice = () => {
    if (newPrice !== price) {
      handlePriceUpdate(id, newPrice);
    }
  };

  const handleDeleteClick = () => {
    handleDelete(id);
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price}</p>

      <div>
        <input
          type="number" value={newPrice} onChange={handlePriceChange} step="0.01" min="0" placeholder="New Price"
        />
        <button onClick={handleUpdatePrice}>Update Price</button>
      </div>

      <button onClick={toggleStock} className={inStock ? "primary" : ""}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>

      <button onClick={handleDeleteClick} className="delete-btn">Delete</button>
    </li>
  );
}

export default PlantCard;
