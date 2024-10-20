import React, { useState } from 'react';
import './CategoryList.css';

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [productState, setProductState] = useState({
    Fruits: [
      { name: 'Apple', price: 1.5, quantity: 0 },
      { name: 'Banana', price: 1.0, quantity: 0 },
    ],
    Vegetables: [
      { name: 'Carrot', price: 1.5, quantity: 0 },
      { name: 'Broccoli', price: 1.0, quantity: 0 },
    ],
    Dairy: [
      { name: 'Milk', price: 1.5, quantity: 0 },
      { name: 'Cheese', price: 1.5, quantity: 0 },
    ],
  });
  const [cart, setCart] = useState([]);

  const products = Object.entries(productState).flatMap(([category, items]) =>
    items.map((item) => ({ ...item, category, image: `https://via.placeholder.com/100?text=${item.name}` }))
  );

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const updateQuantity = (category, index, delta) => {
    const updatedCategory = productState[category].map((product, i) =>
      i === index ? { ...product, quantity: product.quantity + delta } : product
    );
    setProductState((prev) => ({ ...prev, [category]: updatedCategory }));
  };

  const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.name === product.name);
        return existingProduct
          ? prevCart.map((item) =>
              item.name === product.name ? { ...item, quantity: item.quantity + product.quantity } : item
            )
          : [...prevCart, { ...product }];
      });
    }
  };

  return (
    <div className="container">
      <h1>Categories</h1>
      <div className="category-buttons">
        {['All', 'Fruits', 'Vegetables', 'Dairy'].map((category, i) => (
          <button key={i} className={selectedCategory === category ? 'active' : ''} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <p>{product.name} - ${product.price.toFixed(2)}</p>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(product.category, index, -1)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => updateQuantity(product.category, index, 1)}>+</button>
            </div>
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>LISTS</h2>
        {cart.length === 0 ? <p>Your cart is empty</p> : (
          <ul>
            {cart.map((item, i) => (
              <li key={i}>
                {item.name} - Quantity: {item.quantity} - Total: ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
