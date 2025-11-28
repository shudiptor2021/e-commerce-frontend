"use server";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(12),
  email: z.string().optional().nullable(),
  phone: z.string().min(10).max(12),
  message: z.string().min(10).max(50),
});

export const createContact = async (prevState: any, formData: FormData) => {
  // validation
  const validationFields = formSchema.safeParse({
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    message: formData.get("message") as string,
  });

  // Return early if the form data is invalid
  if (!validationFields.success) {
    console.log("error", validationFields.error.flatten().fieldErrors);
    return {
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  const userContact = validationFields.data;

  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/contact`,
    {
      method: "POST",
      body: JSON.stringify(userContact),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );

  const contact = await res.json();
  if (!res.ok) {
    console.error("API Error:", contact);
    return { error: contact.message || "Failed to add contact" };
  }

  return { success: true };
  // console.log(userContact);
};
