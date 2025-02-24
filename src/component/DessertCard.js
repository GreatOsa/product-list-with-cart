import React from "react";
import DessertImage from "./DessertImage";

export function DessertCard({ data, setData, setCart }) {
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
