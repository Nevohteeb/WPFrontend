import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, updateCart, removeFromCart } = useContext(CartContext);

  const handleIncrement = (item) => {
    updateCart(item.id, item.quantity + 1);
  };

  const handleDecrement =(item) => {
    if (item.quantity > 1) {
        updateCart(item.id, item.quantity - 1);
    } else {
        removeFromCart(item.id);
    }
  };

  return (
    <div>
        <h1>Cart</h1>
        {cart.length === 0 ? (
            <p>Your Cart is Empty. Go buy something from the shop</p>
        ) : (
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>Price: ${parseFloat(item.prices.price / 100).toFixed(2)}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => handleDecrement(item)}>-</button>
                        <button onClick={() => handleIncrement(item)}>+</button>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </li>
                ))}
                <button>Proceed to Checkout</button>
            </ul>
        )}
    </div>
  );
};

export default Cart;
