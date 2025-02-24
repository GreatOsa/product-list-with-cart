import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

import db from "./data.json";
import { DessertCard } from "./component/DessertCard";
import CartContainer from "./component/CartContainer";
import OrderConfirmed from "./component/OrderConfirmed";

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

  const [confirmOrder, setConfirmOrder] = useState(false);
  function onConfirmOrder() {
    setConfirmOrder(true);
  }

  function calculateCartTotal(cart) {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  function onStartNewOrder() {
    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        quantity: 0,
      }))
    );

    setCart([]);
    setConfirmOrder(false);
  }

  return (
    <div className="App">
      <div className="container">
        <div>
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
        </div>

        <CartContainer
          calculateCartTotal={calculateCartTotal}
          cart={cart}
          setCart={setCart}
          setData={setData}
          data={data}
          onConfirmOrder={onConfirmOrder}
        />
      </div>
      {confirmOrder && (
        <OrderConfirmed
          calculateCartTotal={calculateCartTotal}
          cart={cart}
          setCart={setCart}
          setConfirmOrder={setConfirmOrder}
          onStartNewOrder={onStartNewOrder}
        />
      )}
    </div>
  );
}
