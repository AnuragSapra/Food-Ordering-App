import { useContext } from "react";
import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";

export default function MenuItem({ item }) {
  const cartCtx = useContext(CartContext);
  function handleAddItemToCart() {
    cartCtx.addItem(item);
  }

  return (
    <li className="meal-item">
      <article>
        <img
          src={`${import.meta.env.VITE_API_URL}/${item.image}`}
          alt={item.name}
        />
        <div>
          <h3>{item.name}</h3>
          <p className="meal-item-price">${item.price}</p>
          <p className="meal-item-description">{item.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItemToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
