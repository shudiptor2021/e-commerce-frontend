"use server";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).max(12),
  email: z.string().email(),
  phone: z.string().min(11).max(11),
  message: z.string().min(10).max(200),
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
  console.log(validationFields);
};
