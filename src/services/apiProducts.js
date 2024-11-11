export async function getFeaturedProducts() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/products?featured=true`
  );

  const { data } = await res.json();

  if (!res.ok) throw new Error(data.error.message);

  return data;
}

export async function getProduct(id) {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
  );

  const { data } = await res.json();

  if (!res.ok) throw new Error("Product not found");

  return data;
}
