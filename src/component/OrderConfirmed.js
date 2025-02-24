import React from "react";
import successMark from "./assets/images/icon-order-confirmed.svg";

export default function OrderConfirmed({
  cart,
  setCart,
  calculateCartTotal,
  onStartNewOrder,
}) {
  const orderTotal = calculateCartTotal(cart);

  return (
    <div className="transparent">
      <div className="OrderConfirmed">
        <img src={successMark} alt="Success icon" />
        <span>
          <h2>Order Confirmed</h2>
          <p>We hope you enjoy your food!</p>
        </span>
        <OrderCart cart={cart} orderTotal={orderTotal} />
        <button
          onClick={() => onStartNewOrder()}
          className="NewOrderButton"
          aria-label="Start a new order"
        >
          Start New Order
        </button>
      </div>
    </div>
  );
}

function OrderCart({ cart, orderTotal, setCart, setConfirmOrder }) {
  return (
    <div className="OrderCart">
      <ul>
        {cart.map((cart) => (
          <OrderCartList cart={cart} key={cart.id} />
        ))}
      </ul>
      <div className="orderTotal">
        <p>Order Total</p>
        <p className="price">${orderTotal.toFixed(2)}</p>
      </div>
    </div>
  );
}

function OrderCartList({ cart }) {
  // const path = cart.image.thumbnail;
  const newPath = `${cart.image.thumbnail}`;
  // .replace(/^.\//, "");

  return (
    <li className="OrderCartList">
      <div className="flex">
        <img src={require(`${newPath}`)} alt={cart.name} />
        <div className="info">
          <h3>{cart.name}</h3>
          <div>
            <span className="quantity">{cart.quantity}X</span>
            <span className="priceForOne">@ ${cart.price}</span>
          </div>
        </div>
      </div>

      <p className="totalPrice">${cart.quantity * cart.price}</p>
    </li>
  );
}
