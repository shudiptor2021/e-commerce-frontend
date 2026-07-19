// "use client";

import { fetchAllOrders } from "@/app/actions/order/handleOrder";
import { fetchProducts, fetchUsers } from "@/lib/auth";
import Charts from "./Charts";


const Homepage = async () => {
   const products = (await fetchProducts()) || [];
   const orders = (await fetchAllOrders()) || [];
    const users = (await fetchUsers()) || [];

//  console.log("PRODUCTS:", products);
// console.log("ORDERS:", orders);
// console.log("USERS:", users);

    // calculate total revenue
  const totalRevenue = Number(
  orders
    .filter((o: any) => o.status === "deliveried")
    .reduce((acc: number, order: any) => {
      const orderTotal = order.ordered_product.reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );
      return acc + orderTotal;
    }, 0)
    .toFixed(2)
);

  const revenueData = orders
  .filter((o: any) => o.status === "deliveried")
  .slice(0, 6)
  .map((order: any, i: number) => {
    const orderTotal = order.ordered_product.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    return {
      name: `#${i + 1}`,
      value: orderTotal,
    };
  });

  const pieData = [
    { name: "Products", value: products.length },
    { name: "Users", value: users.length },
    { name: "Orders", value: orders.length },
  ];

  
  return (
    // <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
    //   <div className="min-h-[416px] bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2 ">
    //     <AppBarChart />
    //   </div>
    //   <div className="min-h-[416px] bg-primary-foreground p-4 rounded-lg">
    //     <CardList title="Latest Transaction" />
    //   </div>
    //   <div className="min-h-[416px] bg-primary-foreground p-4 rounded-lg ">
    //     <AppPieChart />
    //   </div>
    //   <div className="min-h-[416px] bg-primary-foreground p-4 rounded-lg">
    //     <TodoList />
    //   </div>
    //   <div className="min-h-[416px] bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2 ">
    //     <AppAreaChart />
    //   </div>
    //   <div className="min-h-[416px] bg-primary-foreground p-4 rounded-lg">
    //     <CardList title="Popular Content" />
    //   </div>
    // </div>
    <div className="p-6 bg-black text-white min-h-screen space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Total Products" value={products.length} />
        <Card title="Total Users" value={users.length} />
        <Card title="Total Orders" value={orders.length} />
        <Card title="Revenue" value={`$${totalRevenue}`} />
      </div>

      {/* Charts */}
      <Charts revenueData={revenueData} pieData={pieData} />
      

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Section title="Recent Products" items={products} render={(p:any) => (
          <>
            <span>{p.title}</span>
            <span>${p.price}</span>
          </>
        )} />

        {/* <Section title="Recent Orders" items={orders} render={(o: any) => (
          <>
            <span>#{o._id?.slice(-5)}</span>
            <span>${o.price}</span>
          </>
        )} /> */}
        <Section
  title="Recent Orders"
  items={orders}
  render={(o: any) => {
    const total = o.ordered_product.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    return (
      <>
        <span>#{o._id?.slice(-5)}</span>
        <span>${total.toFixed(2)}</span>
      </>
    );
  }}
/>

        <Section title="Users" items={users} render={(u: any) => (
          <>
            <span>{u.name}</span>
            {u.email ? <span>{u.email}</span> : <span>{u.phone}</span>}
            
          </>
        )} />
      </div>
    </div>
  );
};

export default Homepage;

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow flex flex-col">
      <span className="text-sm text-gray-400">{title}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  );
}

function Section({ title, items, render }: { title: string; items: any[]; render: (item: any) => React.ReactNode }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl">
      <h2 className="mb-4 font-semibold">{title}</h2>
      {items.slice(0, 5).map((item) => (
        <div key={item._id} className="flex justify-between mb-2">
          {render(item)}
        </div>
      ))}
    </div>
  );
}

