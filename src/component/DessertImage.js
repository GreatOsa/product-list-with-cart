import React from "react";
import addToCart from "./assets/images/icon-add-to-cart.svg";

import decrementIcon from "./assets/images/icon-decrement-quantity.svg";
import incrementIcon from "./assets/images/icon-increment-quantity.svg";

export default function DessertImage({
  data,
  onAddCart,
  onDecreaseCartItem,
  cart,
}) {
  const isCartEmpty = data.quantity === 0;

  // console.log(data);

  return (
    <div className="dessertImageContainer">
      <img
        className={`dessertMobileImage ${!isCartEmpty ? "active" : ""}`}
        src={require(`${data.image.mobile}`)}
        alt={data.name}
      />
      <img
        className={`dessertTabletImage ${!isCartEmpty ? "active" : ""}`}
        src={require(`${data.image.tablet}`)}
        alt={data.name}
      />
      <img
        className={`dessertDesktopImage ${!isCartEmpty ? "active" : ""}`}
        src={require(`${data.image.desktop}`)}
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
