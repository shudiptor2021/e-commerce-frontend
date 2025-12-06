"use server";
import { cookies } from "next/headers";
import { z } from "zod";

const formSchema = z.object({
  id: z.string(),
  reviewerName: z.string().min(3).max(12),
  reviewerEmail: z.string().optional().nullable(),
  rating: z.number(),
  comment: z.string().min(10).max(50),
});

export const createReview = async (prevState: any, formData: FormData) => {
  // authentication
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  // validation
  const validationFields = formSchema.safeParse({
    id: formData.get("id") as string,
    reviewerName: formData.get("reviewerName") as string,
    reviewerEmail: formData.get("reviewerEmail") as string,
    rating: Number(formData.get("rating")),
    comment: formData.get("comment") as string,
  });

  // Return early if the form data is invalid
  if (!validationFields.success) {
    console.log("error", validationFields.error.flatten().fieldErrors);
    return {
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  const { id, ...userReview } = validationFields.data;

  // console.log(userReview);

  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/products/${id}/reviews`,
    {
      method: "POST",
      body: JSON.stringify(userReview),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const review = await res.json();
  if (!res.ok) {
    console.error("API Error:", review);
    return { error: review.message || "Failed to add review" };
  }

  return { success: true };

  // console.log(userReview);
};
