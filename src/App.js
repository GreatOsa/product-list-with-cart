import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import addToCart from "./assets/images/icon-add-to-cart.svg";
import deleteIcon from "./assets/images/icon-remove-item.svg";
import carbonNeutral from "./assets/images/icon-carbon-neutral.svg";
import decrementIcon from "./assets/images/icon-decrement-quantity.svg";
import incrementIcon from "./assets/images/icon-increment-quantity.svg";
import "./App.css";

import db from "./data.json";

export default function App() {
  const [data, setData] = useState(
    db.map((item) => ({
      ...item,
      id: uuidv4(),
      quantity: 0,
    }))
  );
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setData((prevProducts) =>
      prevProducts.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return cartItem ? { ...product, quantity: cartItem.quantity } : product;
      })
    );
    // cart;
    // console.log(data);
  }, [cart]);

  // function handleDeleteCart() {}

  return (
    <div className="App">
      <div className="container">
        <h1>Desserts</h1>
        <ul className="dessertList">
          {Object.values(data).map((data) => (
            <DessertCard
              data={data}
              setData={setData}
              key={data.id}
              setCart={setCart}
            />
          ))}
        </ul>
        <Cart cart={cart} setCart={setCart} setData={setData} data={data} />
      </div>
    </div>
  );
}

function DessertCard({ data, setData, setCart }) {
  function onAddCart() {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === data.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...data, quantity: 1 }];
    });

    setData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === data.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  }
  function onDecreaseCartItem() {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === data.id);
      if (item && item.quantity <= 1) {
        // Remove item from cart if quantity would drop to 0
        return prevCart.filter((item) => item.id !== data.id);
      }
      // Otherwise, decrement the quantity
      return prevCart.map((item) =>
        item.id === data.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });

    setData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === data.id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  }

  return (
    <li className="dessertCard">
      <DessertImage
        data={data}
        onAddCart={onAddCart}
        onDecreaseCartItem={onDecreaseCartItem}
      />
      <div className="dessertInfo">
        <h2>{data.category}</h2>
        <h3>{data.name}</h3>
        <p>${data.price}</p>
      </div>
    </li>
  );
}
function DessertImage({ data, onAddCart, onDecreaseCartItem, cart }) {
  const isCartEmpty = data.quantity === 0;

  // console.log(data);

  return (
    <div className="dessertImageContainer">
      <img
        className={`dessertImage ${!isCartEmpty ? "active" : ""}`}
        src={require(`${data.image.mobile}`)}
        alt={data.name}
      />
      <div className={`addToCart ${!isCartEmpty ? "active" : ""}`}>
        {isCartEmpty ? (
          <div className="first" onClick={() => onAddCart()}>
            <img src={addToCart} alt="Add to card" />
            <p> Add to Cart</p>
          </div>
        ) : (
          <div className="second">
            <span className="icon" onClick={() => onDecreaseCartItem()}>
              <img src={decrementIcon} alt="Decrement" />
            </span>
            <p>{data.quantity} </p>
            <span className="icon" onClick={() => onAddCart()}>
              <img src={incrementIcon} alt="Increment" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Cart({ cart, setCart, setData, data }) {
  return (
    <div className="cart">
      <h2>Your Cart ({cart.length})</h2>
      <ul className="cartLising">
        {cart.map((cart) => (
          <CartList
            cart={cart}
            setCart={setCart}
            setData={setData}
            data={data}
            key={cart.id}
          />
        ))}
      </ul>
      <div className="orderTotal">
        <p>Order Total</p>
        <p className="TotalPrice">$46.50</p>
      </div>
      <div className="carbonNeutral">
        <img src={carbonNeutral} alt="carbon neutral" />
        <p>
          This is a <b>carbon neutral</b> delivery
        </p>
      </div>
      <button className="confirmOrder" aria-label="Confirm your dessert order">
        Confirm Order
      </button>
    </div>
  );
}

function CartList({ cart, setCart, setData, data }) {
  function onRemoveCart(cartItem) {
    // Remove the item from the cart
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItem.id));

    // Reset the product quantity to 0
    setData((prevProducts) =>
      prevProducts.map((product) =>
        product.id === cartItem.id ? { ...product, quantity: 0 } : product
      )
    );
  }

  // console.log(cart);
  return (
    <li className="cartList">
      <div className="cartInfo">
        <p className="cartItemName">{cart.name} </p>
        <span className="NumberInfo">
          <p className="quantity">{cart.quantity}x</p>
          <p className="pricePerOne">@ ${cart.price}</p>
          <p className="price">${cart.quantity * cart.price}</p>
        </span>
      </div>
      <img
        src={deleteIcon}
        onClick={() => onRemoveCart(cart)}
        alt="deleting icon"
      />
    </li>
  );
}
