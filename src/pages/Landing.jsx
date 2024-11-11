import { FeaturedProducts } from "../components";
import Hero from "../components/Hero";
import { getFeaturedProducts } from "../services/apiProducts";

function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}

export default Landing;

export async function loader() {
  const products = await getFeaturedProducts();

  return { products };
}
