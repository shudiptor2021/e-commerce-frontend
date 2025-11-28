"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(10),
  company_name: z.string().nullable().optional(),
  address: z.string().min(5).max(20),
  address_details: z.string().nullable().optional(),
  city_town: z.string().min(5).max(20),
  phone: z.string().min(11).max(11),
  email: z.string().email(),
  ordered_product: z.array(z.string()),
  coupon: z.string().nullable().optional(),
  status: z.string(),
});

// create Order
export const createOrder = async (prevState: any, formData: FormData) => {
  // validation
  const validatedFields = formSchema.safeParse({
    name: formData.get("name") as string,
    company_name: formData.get("company_name") as string,
    address: formData.get("address") as string,
    address_details: formData.get("address_details") as string,
    city_town: formData.get("city_town") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    ordered_product: formData.getAll("ordered_product") as string[],
    coupon: formData.get("coupon") as string,
    status: formData.get("status") as string,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.log("error", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const orderData = validatedFields.data;

  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/orders`,
    {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const order = await res.json();
  if (!res.ok) {
    console.error("API Error:", order);
    return { error: order.message || "Failed to add order" };
  }
  console.log(order);
  return { success: true };
};

// update order status
export const changeOrderStatus = async (prevState: any, formData: FormData) => {
  const id = formData.get("_id") as string;
  const status = formData.get("status") as string;
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("token")?.value;

  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/orders/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ id, status }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  const order = await res.json();
  revalidatePath("/dashboard/orders");
  // console.log(order);
  return order;
};

// delete order action
export const deleteOrder = async (id: string) => {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("token")?.value;
  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/orders/${id}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
  const orderItem = await res.json();
  if (!res.ok) {
    console.error("API Error:", orderItem);
    return { error: orderItem.message || "Failed to add orderItem" };
  }

  revalidatePath("/dashboard/orders");
};
