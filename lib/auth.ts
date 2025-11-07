import { cookies } from "next/headers";

// get user profile
export async function fetchUserProfile() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/users/profile/${userId}`,
    // {
    //   credentials: "include",
    // }
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  // console.log(data);
  return data.user;
}

// get all users by admin
export async function fetchUsers() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/users`,
    // {
    //   credentials: "include",
    // }
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
