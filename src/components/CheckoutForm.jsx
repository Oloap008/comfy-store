import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { store } from "../store";
import { formatPrice } from "../utils/helpers";
import { createOrder } from "../services/apiOrders";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export async function action({ request }) {
  const formData = await request.formData();
  const { name, address } = Object.fromEntries(formData);
  const user = store.getState().user.user;
  const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;

  const data = {
    data: {
      address,
      name,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    },
  };

  const response = await createOrder({ data, token: user.token });

  if (response.type === "success") {
    store.dispatch(clearCart());
    toast.success("Order placed successfully");
    return redirect("/orders");
  } else {
    toast.error(response.message);
    return null;
  }
}

function CheckoutForm() {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
}

export default CheckoutForm;
