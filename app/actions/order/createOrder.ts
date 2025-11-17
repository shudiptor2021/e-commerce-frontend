"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(15),
  companyName: z.string() || z.null,
  address: z.string().min(5),
  apertment: z.string() || z.null,
  city: z.string().min(5),
  phone: z.string().min(11).max(11),
  email: z.string().email(),
  products: z.array(z.string()),
  coupon: z.string() || z.null,
});

export const createOrder = async (prevState: any, formData: FormData) => {
  // validation
  const validatedFields = formSchema.safeParse({
    name: formData.get("name") as string,
    companyName: formData.get("companyName") as string,
    address: formData.get("address") as string,
    apertment: formData.get("apertment") as string,
    city: formData.get("city") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    products: formData.getAll("products") as string[],
    coupon: formData.get("coupon") as string,
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.log("error", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  return console.log(validatedFields), { success: true };
};

// update order status
export const changeOrderStatus = async (prevState: any, formData: FormData) => {
  const id = formData.get("_id") as string;
  const status = formData.get("status") as string;
  // const admin = await fetchUserProfile();
  // const adminId = admin._id;
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("token")?.value;
  // const adminId = cookieStore.get("userId")?.value;

  // console.log(role, id);
  // console.log(adminToken);

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
