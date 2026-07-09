import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "../Error";
import { useActionState } from "react";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(
    `${import.meta.env.VITE_API_URL}/api/order`,
    requestConfig,
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    const orderItems = cartCtx.items.map((item) => ({
      menuItemId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    }));

    await sendRequest(
      JSON.stringify({
        order: {
          items: orderItems,
          customer: customerData,
          totalAmount: cartTotal,
        },
      }),
    );
  }

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null,
  );

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: Rs.{cartTotal}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="text" id="email" />
        <Input label="Address" type="text" id="address" />
        <div className="control-row">
          <Input label="Pincode" type="number" id="pincode" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order." message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
