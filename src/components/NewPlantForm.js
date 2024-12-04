import React, { useState } from "react";

function NewPlantForm({ newPlant }) {
  const [formNewPlant, setNewPlant] = useState({ name: "", image: "", price: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPlant({ ...formNewPlant, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    newPlant(formNewPlant); 
    setNewPlant({ name: "", image: "", price: "" }); 
  };
  
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" name="name" placeholder="Plant name" value={formNewPlant.name} onChange={handleChange} 
        />
        <input 
          type="text" name="image" placeholder="Image URL" value={formNewPlant.image} onChange={handleChange} 
        />
        <input 
          type="number" name="price" step="0.01" placeholder="Price" value={formNewPlant.price} onChange={handleChange} 
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
