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
  const [cart, setCart] = useState([]); // New state to track the cart

  const baseImageURL = 'https://via.placeholder.com/100?text=';

  const products = Object.entries(productState).flatMap(([category, items]) =>
    items.map((product) => ({
      ...product,
      category,
      image: `${baseImageURL}${product.name}`,
    }))
  );

  // Filter products by selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  // Function to increment quantity
  const handleIncrement = (category, index) => {
    const updatedCategory = productState[category].map((product, i) =>
      i === index ? { ...product, quantity: product.quantity + 1 } : product
    );

    setProductState((prevState) => ({
      ...prevState,
      [category]: updatedCategory,
    }));
  };

  // Function to decrement quantity
  const handleDecrement = (category, index) => {
    const updatedCategory = productState[category].map((product, i) =>
      i === index && product.quantity > 0
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );

    setProductState((prevState) => ({
      ...prevState,
      [category]: updatedCategory,
    }));
  };

  // Function to add product to cart
  const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      const existingProductIndex = cart.findIndex(
        (cartItem) => cartItem.name === product.name
      );

      if (existingProductIndex >= 0) {
        // If the product is already in the cart, update its quantity
        const updatedCart = cart.map((cartItem, index) =>
          index === existingProductIndex
            ? { ...cartItem, quantity: cartItem.quantity + product.quantity }
            : cartItem
        );
        setCart(updatedCart);
      } else {
        // If the product is not in the cart, add it
        setCart([...cart, { ...product }]);
      }
    }
  };

  return (
    <div className="container">
      <h1>Categories</h1>

      {/* Category Selection */}
      <div className="category-buttons">
        {['All', 'Fruits', 'Vegetables', 'Dairy'].map((category, index) => (
          <button
            key={index}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <p>{product.name}</p>
            <p>Price: ${product.price.toFixed(2)}</p>

            {/* Quantity and Controls */}
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(product.category, index)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => handleIncrement(product.category, index)}>+</button>
            </div>

            {/* Add to Cart Button */}
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart">
        <h2>LISTS</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((cartItem, index) => (
              <li key={index}>
                {cartItem.name} - Quantity: {cartItem.quantity} - Total: $
                {(cartItem.price * cartItem.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
