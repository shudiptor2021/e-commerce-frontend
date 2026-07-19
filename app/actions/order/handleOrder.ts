import { cookies } from "next/headers";

// get all order by admin
export async function fetchAllOrders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  //  console.log("token:", token);

  const data = await res.json();
    // console.log(data);
  return data.orders;
}

// get single order by admin
export async function fetchSingleOrder(id: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  // console.log(data);
  return data.order;
}
