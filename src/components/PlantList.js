import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, handleStockChange, handlePriceUpdate, handleDelete }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          handleStockChange={handleStockChange}
          handlePriceUpdate={handlePriceUpdate}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default PlantList;
