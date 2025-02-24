import React from "react";
import Cart from "./Cart";
import illustration from "./assets/images/illustration-empty-cart.svg";

export default function CartContainer({
  cart,
  setCart,
  setData,
  data,
  calculateCartTotal,
  onConfirmOrder,
}) {
  return (
    <div className="cartContainer">
      <h2>Your Cart ({cart.length})</h2>
      {cart.length === +0 ? (
        <div className="emptyCart">
          <img src={illustration} alt="illustration empty cart" />
          <p>Your added items will appear here</p>
        </div>
      ) : (
        <Cart
          cart={cart}
          calculateCartTotal={calculateCartTotal}
          setCart={setCart}
          setData={setData}
          data={data}
          onConfirmOrder={onConfirmOrder}
        />
      )}
    </div>
  );
}
