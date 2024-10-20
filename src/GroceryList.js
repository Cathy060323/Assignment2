import React, { useState } from 'react';
import './GroceryList.css';

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', imageUrl: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingItem, setEditingItem] = useState({ name: '', imageUrl: '' });

  // Add new item to the list
  const addItem = () => {
    if (newItem.name.trim() === '' || newItem.imageUrl.trim() === '') return;
    setItems([...items, newItem]);
    setNewItem({ name: '', imageUrl: '' });
  };

  // Delete item from the list
  const deleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Start editing mode for an item
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingItem(items[index]);
  };

  // Save the edited item
  const saveItem = () => {
    if (editingItem.name.trim() === '' || editingItem.imageUrl.trim() === '') return;
    const updatedItems = items.map((item, index) =>
      index === editingIndex ? editingItem : item
    );
    setItems(updatedItems);
    setEditingIndex(null);
    setEditingItem({ name: '', imageUrl: '' });
  };

  return (
    <div className="container">
      
      <div className="input-container">
        <input
          type="text"
          placeholder="Product name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.imageUrl}
          onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul className="grocery-list">
        {items.map((item, index) => (
          <li key={index} className="grocery-item">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editingItem.imageUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                />
                <button onClick={saveItem}>Save</button>
              </>
            ) : (
              <>
                <img src={item.imageUrl} alt={item.name} className="product-image" />
                <span>{item.name}</span>
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
