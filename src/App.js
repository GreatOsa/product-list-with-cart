import React, { useState } from "react";
import addToCart from "./assets/images/icon-add-to-cart.svg";
import deleteIcon from "./assets/images/icon-remove-item.svg";
import carbonNeutral from "./assets/images/icon-carbon-neutral.svg";
import "./App.css";

import data from "./data.json";
export default function App() {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([
    {
      image: {
        thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
        mobile: "./assets/images/image-waffle-mobile.jpg",
        tablet: "./assets/images/image-waffle-tablet.jpg",
        desktop: "./assets/images/image-waffle-desktop.jpg",
      },
      name: "Waffle with Berries",
      category: "Waffle",
      price: 6.5,
    },
  ]);
  console.log(cart.length);

  function handleAddCart(cart) {
    const newCart = [quantity, cart];
    // console.log(newCart);
    setCart((carts) => [...carts, cart]);
  }
  return (
    <div className="App">
      <div className="container">
        <h1>Desserts</h1>
        <ul className="dessertList">
          {data.map((data) => (
            <DessertCard
              data={data}
              key={data.name}
              onAddCart={handleAddCart}
            />
          ))}
        </ul>
        <Cart cart={cart} />
      </div>
    </div>
  );
}

function DessertCard({ data, onAddCart }) {
  return (
    <li className="dessertCard">
      <DessertImage data={data} onAddCart={onAddCart} />
      <div className="dessertInfo">
        <h2>{data.category}</h2>
        <h3>{data.name}</h3>
        <p>${data.price}</p>
      </div>
    </li>
  );
}
function DessertImage({ data, onAddCart }) {
  return (
    <div className="dessertImageContainer">
      <img
        className="dessertImage"
        src={require(`${data.image.mobile}`)}
        alt={data.name}
      />
      <div className="addToCart" onClick={() => onAddCart(data)}>
        <img src={addToCart} alt="Add to card" />
        <p> Add to Cart</p>
      </div>
    </div>
  );
}

function Cart({ cart }) {
  return (
    <div className="cart">
      <h2>Your Cart ({cart.length})</h2>
      <ul className="cartLising">
        {cart.map((cart) => (
          <CartList cart={cart} key={cart.name} />
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
      <button className="confirmOrder">Confirm Order</button>
    </div>
  );
}

function CartList({ cart }) {
  return (
    <li className="cartList">
      <div className="cartInfo">
        <p className="cartItemName">{cart.name} </p>
        <span className="NumberInfo">
          <p className="quantity">1x</p>
          <p className="pricePerOne">@ ${cart.price}</p>
          <p className="price">$28.00</p>
        </span>
      </div>
      <img src={deleteIcon} alt="deleting icon" />
    </li>
  );
}
