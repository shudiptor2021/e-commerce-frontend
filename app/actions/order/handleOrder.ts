import { cookies } from "next/headers";

// get all order by admin
export async function fetchAllOrders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/orders`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  //   console.log(data);
  return data.orders;
}
