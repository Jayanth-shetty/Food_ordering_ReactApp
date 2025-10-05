import { useContext,useActionState } from "react";
import Modal from "./Modal.jsx";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "../Utils/formatter";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import UserProgressContext from "../Store/UserProgressContext.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "../Components/Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const {
    data,
    error,
    sendRequest,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handelClose() {
    userProgressCtx.hideCheckout();
  }

  async function checkoutAction(prevState,fd) {
    const customerData = Object.fromEntries(fd.entries());
    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState,formAction,pending]=useActionState(checkoutAction,null)
  let actions = (
    <>
      <Button type="button" textOnly onClick={handelClose}>
        close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (pending) {
    actions = <span>Sending order Data....</span>;
  }

  if (data && !error) {
    return(
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handelClose}>
      <h2>Success!</h2>
      <p>your order submitted successfuly</p>
      <p>we will get back to with more deatials via email </p>
      <p className="modal-actions">
        <Button onClick={handelClose}>Okay</Button>
      </p>
    </Modal>);
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>total amount : {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="something went wrong" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
