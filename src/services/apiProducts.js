export async function getFeaturedProducts() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/products?featured=true`
  );

  if (!res.ok) throw new Error(data.error.message);

  const { data } = await res.json();

  return data;
}

export async function getProducts() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);

  if (!res.ok) throw new Error("There was an error loading products");

  const data = await res.json();

  return data;
}

export async function getProduct(id) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
  );

  if (!res.ok) throw new Error("Product not found");

  const { data } = await res.json();

  return data;
}
