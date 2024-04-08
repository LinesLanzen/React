import React from 'react';
import Item from './Item';

const ItemList = ({ items, toggleComplete, deleteItem }) => {
  return (
    <ul className="item-list">
      {items.map(item => (
        <Item
          key={item.id}
          item={item}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      ))}
    </ul>
  );
};

export default ItemList;