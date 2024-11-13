import { useLoaderData } from "react-router-dom";
import Filters from "../components/Filters";
import PaginationContainer from "../components/PaginationContainer";
import ProductsContainer from "../components/ProductsContainer";
import { getProducts } from "../services/apiProducts";

export async function loader({ request }) {
  const params = new URL(request.url).searchParams;
  const strParams = params.toString();
  const objParams = Object.fromEntries([...params.entries()]);

  const { data: products, meta } = await getProducts(strParams);

  return { products, meta, objParams };
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
