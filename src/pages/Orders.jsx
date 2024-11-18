import { toast } from "react-toastify";
import { store } from "../store";
import { redirect, useLoaderData } from "react-router-dom";
import { getOrders } from "../services/apiOrders";
import SectionTitle from "../components/SectionTitle";
import OrdersList from "../components/OrdersList";
import PaginationContainer from "../components/PaginationContainer";
import ComplexPaginationContainer from "../components/ComplexPaginationContainer";

export async function loader({ request }) {
  const user = store.getState().user.user;

  if (!user) {
    toast.warn("You must be logged in to view orders");
    return redirect("/login");
  }

  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const data = await getOrders({ page: params.page, token: user.token });

  if (data.type === "success") {
    return { orders: data.orders.data, meta: data.orders.meta };
  } else if (data.type === "authError") {
    toast.error(data.message);
    return redirect("/login");
  } else {
    toast.error(data.message);
    return null;
  }
}

function Orders() {
  const { meta } = useLoaderData();

  if (meta.pagination.total < 1)
    return <SectionTitle text="You have not made any orders yet." />;

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
}

export default Orders;
