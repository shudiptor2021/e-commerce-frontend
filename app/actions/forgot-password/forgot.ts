'use server';

export const forgotPassword = async (prevState: any, formData: FormData) => {
  const email = formData.get("email")?.toString().trim();

  // console.log(email);
  // const baseUrl = "http://localhost:3000";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      credentials: "include",
    });

    const data = await res.json();
    const token = data?.rawToken;

    if (!res.ok) {
      return { error: data.message || "Failed to send password reset instructions" };
    }

    // console.log(token);
    return { success: true, token };
  } catch (err) {
    console.error("Error in forgotPassword:", err);
    return { error: "Failed to send password reset instructions" };
  }
};