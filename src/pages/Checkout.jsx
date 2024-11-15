import { useSelector } from "react-redux";
import SectionTitle from "../components/SectionTitle";
import CheckoutForm from "../components/CheckoutForm";
import CartTotals from "../components/CartTotals";
import { store } from "../store";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export async function loader() {
  const user = store.getState().user.user;

  if (!user) {
    toast.warn("You must be logged in to checkout");

    return redirect("/login");
  }

  return null;
}

function Checkout() {
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  if (!cartTotal) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8  md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
}
export default Checkout;
