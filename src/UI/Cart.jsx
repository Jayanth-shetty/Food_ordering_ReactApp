import Modal from "./Modal";
import { useContext } from "react";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "../Utils/formatter";
import Button from "./Button";
import UserProgressContext from "../Store/UserProgressContext";
import CartItem from "../Components/CartItem";
export default function Cart() {
  const cartCtx = useContext(CartContext);

  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handeGoToCheckOut(){
    userProgressCtx.showChekout();
  }

  function handelCloseCart() {
    userProgressCtx.hideCart();
  }
  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"} onClose={userProgressCtx.progress==='cart' ? handelCloseCart  :null}>
      <h2>your cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handelCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && <Button onClick={handeGoToCheckOut}>Go to checkout</Button>}
      </p>
    </Modal>
  );
}
