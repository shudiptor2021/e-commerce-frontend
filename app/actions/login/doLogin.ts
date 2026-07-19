"use server";
import { cookies } from "next/headers";

export const doLogin = async (prevState: any, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  //   console.log(email, password);
  // const baseUrl = "http://localhost:3000";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const user = await res.json();

    if (!res.ok) {
      return { error: user.message || "Login failed" };
    }

    const cookieStore = await cookies();
    // Decide expiration: 30min or 7 days
    const maxAge = 60 * 60 * 24 * 7;
    cookieStore.delete("token");
    cookieStore.delete("userId");
    cookieStore.set({
      name: "token",
      value: user.accessToken,
      httpOnly: true,
      path: "/",
      maxAge: maxAge,
      sameSite: "lax", // 'none' if cross-site
      secure: process.env.NODE_ENV === "production",
    });

    cookieStore.set({
      name: "userId",
      value: user.data.id,
      httpOnly: true,
      path: "/",
      maxAge: maxAge,
      sameSite: "lax", // 'none' if cross-site
      secure: process.env.NODE_ENV === "production",
    });

    // console.log("User:", user.data, user.accessToken);
    return { success: true, user };
  } catch (err) {
    console.error("Error in doLogin:", err);
    return { error: "Login failed" };
  }
};



export const doLogout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("userId");
  return { message: "Logged out successfully" };
};
