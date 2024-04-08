import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import ItemList from './ItemList';

function App() {
  const [items, setItems] = useState([]);

  const addItem = (itemName, quantity) => {
    const newItem = {
      id: Math.random(),
      name: itemName,
      quantity: quantity,
      complete: false,
    };
    setItems([...items, newItem]);
  };

  const toggleComplete = (id) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, complete: !item.complete } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(prevItems =>
      prevItems.filter(item => item.id !== id)
    );
  };

  return (
    <div className="app-container">
      <div className="App">
        <h1>Grocery List</h1>
        <SearchBar addItem={addItem} />
        <ItemList items={items} toggleComplete={toggleComplete} deleteItem={deleteItem} />
      </div>
    </div>
  );
}

export default App;
