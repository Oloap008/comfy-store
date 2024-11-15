export async function createOrder({ data, token }) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const order = await res.json();

    if (!res.ok)
      throw new Error(
        "There was an error placing your order. Please try again later."
      );

    return { type: "success", order };
  } catch (error) {
    return { type: "error", message: error.message };
  }
}
