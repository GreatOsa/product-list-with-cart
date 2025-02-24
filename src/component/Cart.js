import React from "react";
import { CartList } from "./CartList";
import carbonNeutral from "./assets/images/icon-carbon-neutral.svg";

export default function Cart({
  cart,
  setCart,
  calculateCartTotal,
  setData,
  data,
  onConfirmOrder,
}) {
  const orderTotal = calculateCartTotal(cart);
  return (
    <div className="cart">
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
        <p className="TotalPrice">${orderTotal.toFixed(2)}</p>
      </div>
      <div className="carbonNeutral">
        <img src={carbonNeutral} alt="carbon neutral" />
        <p>
          This is a <b>carbon neutral</b> delivery
        </p>
      </div>
      <button
        onClick={() => onConfirmOrder()}
        className="confirmOrder"
        aria-label="Confirm your dessert order"
      >
        Confirm Order
      </button>
    </div>
  );
}
