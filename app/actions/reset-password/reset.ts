'use server';

export const resetPassword = async (prevState: any, formData: FormData) => {
  const token = formData.get("token");
  const password = formData.get("password");

  //   console.log(token, password);
  // const baseUrl = "http://localhost:3000";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
      credentials: "include",
    });

    const user = await res.json();

    if (!res.ok) {
      return { error: user.message || "reset failed" };
    }

    // console.log("User:", user.data, user.accessToken);
    return { success: true };
  } catch (err) {
    console.error("Error in resetPassword:", err);
    return { error: "reset failed" };
  }
};