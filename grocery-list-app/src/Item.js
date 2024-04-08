import React from 'react';

const Item = ({ item, toggleComplete, deleteItem }) => {
  const { id, name, quantity, complete } = item;

  return (
    <li className={`item ${complete ? 'complete' : ''}`}>
      <p>{quantity} {name}</p>
      <div>
        <button
          className={`complete-btn ${complete ? 'completed' : ''}`}
          onClick={() => toggleComplete(id)}
        >
          {complete ? 'Undo' : 'Complete'}
        </button>
        <button className="remove-btn" onClick={() => deleteItem(id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Item;