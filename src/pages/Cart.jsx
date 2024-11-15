import { useSelector } from "react-redux";
import { CartItemsList, CartTotals, SectionTitle } from "../components";
import { Link } from "react-router-dom";

function Cart() {
  const user = useSelector((state) => state.user.user);
  const numItemsInCart = useSelector((state) => state.cart.numItemsInCart);

  if (!numItemsInCart) return <SectionTitle text="Your cart is empty" />;

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link
              to="/checkout"
              className="btn btn-primary btn-block mt-8 uppercase"
            >
              Proceed to checkout
            </Link>
          ) : (
            <Link
              to="/checkout"
              className="btn btn-primary btn-block mt-8 uppercase"
            >
              Login to checkout
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
