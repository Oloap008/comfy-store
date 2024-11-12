import { useLoaderData } from "react-router-dom";
import Filters from "../components/Filters";
import PaginationContainer from "../components/PaginationContainer";
import ProductsContainer from "../components/ProductsContainer";
import { getProducts } from "../services/apiProducts";

export async function loader({ request }) {
  const { data: products, meta } = await getProducts();

  return { products, meta };
}

function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
}

export default Products;
