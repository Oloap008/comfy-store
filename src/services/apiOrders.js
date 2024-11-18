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
      if (order.error.status === 401 || order.error.status === 403)
        return { type: "authError", message: order.error.message };
      throw new Error(order.error.message);
    }

    return { type: "success", order };
  } catch (error) {
    return { type: "error400", message: error.message };
  }
}

export async function getOrders({ page = 1, token }) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/orders?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const orders = await res.json();

    if (!res.ok) {
      if (orders.error.status === 401 || orders.error.status === 403)
        return { type: "authError", message: orders.error.message };

      throw new Error(orders.error.message);
    }

    return { type: "success", orders };
  } catch (error) {
    return { type: "error400", message: error.message };
  }
}
