import { Link, useLoaderData } from "react-router-dom";
import { getProduct } from "../services/apiProducts";
import { formatPrice } from "../utils/helpers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

function SingleProduct() {
  const dispatch = useDispatch();
  const product = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  function handleAmount(e) {
    setAmount(Number(e.target.value));
  }

  function handleAddToCart() {
    const cartProduct = {
      itemID: product.id + productColor,
      productID: product.id,
      image,
      title,
      price,
      company,
      productColor,
      amount,
    };

    dispatch(addItem(cartProduct));
  }

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-96 h-06 object-cover rounded-lg lg:w-full"
        />

        {/* INFO */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{formatPrice(price)}</p>
          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`badge w-6 h-6 mr-2 ${
                    color === productColor && "border-2 border-secondary"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                ></button>
              ))}
            </div>
          </div>

          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="amount" className="label">
              <h4 className="text-md font-medium -tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              name="amount"
              id="amount"
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              {Array.from({ length: 3 }, (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* CART BUTTON */}
          <div className="mt-10">
            <button
              className="btn btn-secondary btn-md"
              onClick={handleAddToCart}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;

export async function loader({ params }) {
  const product = await getProduct(params.id);

  return product;
}
