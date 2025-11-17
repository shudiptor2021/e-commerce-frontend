import { fetchAllOrders } from "@/app/actions/order/handleOrder";

import { columns } from "@/lib/data/OrdersColumns";
import { DataTable } from "../_components/data-table";

const orderPage = async () => {
  const orders = await fetchAllOrders();
  //   console.log(orders);
  return (
    <div>
      <h1 className="text-xl">All orders</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
};

export default orderPage;
