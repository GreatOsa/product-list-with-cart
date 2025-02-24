import React from "react";
import deleteIcon from "./assets/images/icon-remove-item.svg";

export function CartList({ cart, setCart, setData, data }) {
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
