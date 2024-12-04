import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newPlant, inStock: true }),
    })
      .then((response) => response.json())
      .then((addedPlant) => setPlants([...plants, addedPlant]))
      .catch((error) => console.error("Error adding plant:", error));
  };

  const handleToggleStock = (id) => {
    const plantToUpdate = plants.find((plant) => plant.id === id);
    if (plantToUpdate) {
      const updatedPlant = { ...plantToUpdate, inStock: !plantToUpdate.inStock };
      fetch(`http://localhost:6001/plants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inStock: updatedPlant.inStock }),
      })
        .then((response) => response.json())
        .then((updatedData) => {
          setPlants(
            plants.map((plant) =>
              plant.id === id ? updatedData : plant
            )
          );
        })
        .catch((error) => console.error("Error updating stock:", error));
    }
  };

  const handlePriceUpdate = (id, newPrice) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        setPlants(
          plants.map((plant) =>
            plant.id === id ? updatedPlant : plant
          )
        );
      })
      .catch((error) => console.error("Error updating price:", error));
  };

  const handleDeletePlant = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setPlants(plants.filter((plant) => plant.id !== id));
      })
      .catch((error) => console.error("Error deleting plant:", error));
  };

  const handleSearchChange = (event) => setSearch(event.target.value);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm newPlant={handleAddPlant} />
      <Search onSearchChange={handleSearchChange} />
      <PlantList
        plants={filteredPlants}
        handleStockChange={handleToggleStock}
        handlePriceUpdate={handlePriceUpdate}
        handleDelete={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
