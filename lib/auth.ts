import { cookies } from "next/headers";

// get user profile
export async function fetchUserProfile() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  const token = cookieStore.get("token")?.value;

  // No user logged in → redirect
  if (!userId || !token) {
    return null;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/profile/${userId}`,
    // {
    //   credentials: "include",
    // }
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // cache: "no-store",
    }
  );

  if (!res.ok)  {
  const errorText = await res.text();
  console.log("API Error:", errorText);
  return null;
};

  // Safely detect HTML response to prevent crash
  const text = await res.text();

  if (text.startsWith("<")) return null;

  const data = JSON.parse(text);
  // console.log(data);
  return data.user;
}

// get all users by admin
export async function fetchUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  // console.log(data);
  return data.users;
}

// get all products
export async function fetchProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products`
  );

  const data = await res.json();
  // console.log(data);
  return data.data;
}

// get single product by id
export async function getSingleProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`
  );

  const data = await res.json();
  // console.log(data);
  return data;
}
