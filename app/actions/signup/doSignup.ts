"use server";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1).max(10),
  email: z.string().email().or(z.literal("")).optional().nullable(),
  phone: z.string().min(11).max(11),
  password: z.string().min(4).max(16),
  role: z.enum(["user", "admin"]).default("user").catch("user"),
});

export const createUser = async (prevState: any, formData: FormData) => {
  // validation
  const validationFields = formSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as "user" | "admin",
  });

  // Return early if the form data is invalid
  if (!validationFields.success) {
    console.log("error", validationFields.error.flatten().fieldErrors);
    return {
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  const userData = validationFields.data;

  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/users/register`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const user = await res.json();
  if (!res.ok) {
    console.error("API Error:", user);
    return { error: user.message || "Failed to add user" };
  }

  return { success: true };
  //   console.log(validationFields);
};
