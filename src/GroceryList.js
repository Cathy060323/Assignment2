import React, { useState } from 'react';
import './GroceryList.css';

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ name: '', imageUrl: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  const addItem = () => {
    if (!item.name.trim() || !item.imageUrl.trim()) return;
    setItems((prev) => [...prev, item]);
    setItem({ name: '', imageUrl: '' });
  };

  const deleteItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

  const saveItem = () => {
    if (!item.name.trim() || !item.imageUrl.trim()) return;
    setItems((prev) => prev.map((itm, i) => (i === editIndex ? item : itm)));
    setEditIndex(null);
    setItem({ name: '', imageUrl: '' });
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={item.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={item.imageUrl}
          onChange={handleChange}
        />
        <button onClick={editIndex === null ? addItem : saveItem}>
          {editIndex === null ? 'Add' : 'Save'}
        </button>
      </div>

      <ul className="grocery-list">
        {items.map((itm, index) => (
          <li key={index} className="grocery-item">
            {editIndex === index ? (
              <>
                <input type="text" name="name" value={item.name} onChange={handleChange} />
                <input type="text" name="imageUrl" value={item.imageUrl} onChange={handleChange} />
              </>
            ) : (
              <>
                <img src={itm.imageUrl} alt={itm.name} className="product-image" />
                <span>{itm.name}</span>
              </>
            )}
            <button onClick={() => (editIndex === index ? saveItem() : setEditIndex(index))}>
              {editIndex === index ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => deleteItem(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
