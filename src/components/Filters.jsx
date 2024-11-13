import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckBox from "./FormCheckBox";

function Filters() {
  const {
    meta: { companies, categories },
    objParams: { search, company, category, shipping, order, price },
  } = useLoaderData();

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />

      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={categories}
        size="select-sm"
        defaultValue={category}
      />

      {/* COMPANIES */}
      <FormSelect
        label="select company"
        name="company"
        list={companies}
        size="select-sm"
        defaultValue={company}
      />

      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue={order}
      />

      {/* PRICE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={price}
      />

      {/* SHIPPING */}
      <FormCheckBox
        name="shipping"
        label="free shipping available"
        size="checkbox-sm"
        defaultValue={shipping}
      />

      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        Search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
    </Form>
  );
}

export default Filters;
