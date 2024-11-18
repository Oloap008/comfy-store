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

    if (!res.ok) {
      if (order.error.status === 401)
        return { type: "error401", message: order.error.message };
      throw new Error(order.error.message);
    }

    return { type: "success", order };
  } catch (error) {
    console.log(error);
    return { type: "error400", message: error.message };
  }
}
