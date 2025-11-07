"use server";
import { cookies } from "next/headers";

export const doLogin = async (prevState: any, formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  //   console.log(username, password);
  // const baseUrl = "http://localhost:3000";
  try {
    const res = await fetch(
      `https://api-dokan-backend.onrender.com/api/v1/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      }
    );

    const user = await res.json();

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
    return user;
  } catch (err) {
    console.error("Error in doLogin:", err);
    return { error: "Login failed" };
  }
};

// "use server";
// import { cookies } from "next/headers";

// export const doLogout = async () => {
//   const cookieStore = await cookies();
//   cookieStore.delete("token");
//   cookieStore.delete("userId");
//   return { message: "Logged out successfully" };
// };
