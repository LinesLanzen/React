import React, { useState } from 'react';

const SearchBar = ({ addItem }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleInputChange = (event) => {
    setItemName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddItem = () => {
    if (itemName.trim() !== '') {
      addItem(itemName.trim(), quantity);
      setItemName('');
      setQuantity(1);
    }
  };

  return (
    <div className="search-bar search-bar-colored">
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
        className="quantity-input"
      />
      <input
        type="text"
        placeholder="Enter item..."
        value={itemName}
        onChange={handleInputChange}
        className="item-input"
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
};

export default SearchBar;