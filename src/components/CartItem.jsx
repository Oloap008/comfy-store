import { useDispatch } from "react-redux";
import { formatPrice } from "../utils/helpers";
import { editItem, removeItem } from "../features/cart/cartSlice";

function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  const { itemID, title, price, image, amount, company, productColor } =
    cartItem;

  return (
    <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium">{title}</h3>

        {/* COMPANY */}
        <h4 className="capitalize text-sm text-neutral-content">{company}</h4>

        {/* COLOR */}
        <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
          color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>

      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="forn-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-base select-bordered select-xs"
            value={amount}
            onChange={(e) =>
              dispatch(editItem({ itemID, amount: Number(e.target.value) }))
            }
          >
            {Array.from({ length: amount + 5 }, (_, i) => (
              <option value={i + 1} key={i}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* REMOVE */}
        <button
          className="mt-4 link link-primary link-hover text-sm uppercase"
          onClick={() => dispatch(removeItem({ itemID }))}
        >
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
    </article>
  );
}

export default CartItem;
