"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const changeRole = async (prevState: any, formData: FormData) => {
  const id = formData.get("_id") as string;
  const role = formData.get("role") as string;
  // const admin = await fetchUserProfile();
  // const adminId = admin._id;
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("token")?.value;
  const adminId = cookieStore.get("userId")?.value;

  console.log(role, id);
  // console.log(adminToken);

  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/users/${adminId}`,
    {
      method: "PUT",
      body: JSON.stringify({ id, role }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
  const user = await res.json();
  revalidatePath("/dashboard/products");
  // console.log(user);
  return user;
};
