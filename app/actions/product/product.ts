"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

// Validate a single file (e.g. thumbnail)
const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, "File cannot be empty")
  .refine(
    (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    "Only .jpg, .png, or .webp files are allowed"
  );

// Validate multiple images
const imagesSchema = z
  .array(fileSchema)
  .nonempty("At least one image is required")
  .optional(); // make optional if not always required

const formSchema = z.object({
  // id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number(),
  stock: z.number().nullable().optional(),
  tags: z.array(z.string().nullable()).nullable().optional(),
  weight: z.string().nullable().optional(),
  warrantyInformation: z.string().nullable().optional(),
  shippingInformation: z.string().nullable().optional(),
  availableStatus: z
    .enum(["in stock", "low stock", "out of stock"])
    .default("in stock")
    .optional(),
  productAge: z.enum(["new", "old"]).default("new").optional(),
  returnPolicy: z.string().nullable().optional(),
  minimumOrderQuantity: z.number().nullable().optional(),
  thumbnail: fileSchema.optional(),
  images: imagesSchema.optional(),
});

// create product action
export const addProduct = async (prevState: any, formData: FormData) => {
  const parseNumber = (value: FormDataEntryValue | null) => {
    if (!value) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  };
  //  validation
  const parsed = formSchema.safeParse({
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    price: parseNumber(formData.get("price")),
    stock: parseNumber(formData.get("stock")),
    tags: formData.getAll("tags") as string[],
    weight: formData.get("weight") as string,
    warrantyInformation: formData.get("warrantyInformation") as string,
    shippingInformation: formData.get("shippingInformation") as string,
    availableStatus: formData.get("availableStatus") as string,
    productAge: formData.get("productAge") as string,
    returnPolicy: formData.get("returnPolicy") as string,
    minimumOrderQuantity: parseNumber(formData.get("minimumOrderQuantity")),
    thumbnail: formData.get("thumbnail") as File,
    images: formData.getAll("images") as File[],
  });

  if (!parsed.success) {
    console.error("Validation errors:", parsed.error.flatten().fieldErrors);
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const validatedFields = parsed.data;
  const payload = new FormData();

  // Append validated fields (see previous snippet for full appending)
  payload.append("title", validatedFields.title);
  payload.append("category", validatedFields.category);
  payload.append("description", validatedFields.description);
  // convert numeric values to string before appending
  payload.append("price", String(validatedFields.price));
  if (validatedFields.stock != null) {
    payload.append("stock", String(validatedFields.stock));
  }
  if (validatedFields.tags && validatedFields.tags.length) {
    validatedFields.tags.forEach((tag) => {
      if (tag != null) payload.append("tags", tag);
    });
  }
  if (validatedFields.weight) {
    payload.append("weight", validatedFields.weight);
  }
  if (validatedFields.warrantyInformation) {
    payload.append("warrantyInformation", validatedFields.warrantyInformation);
  }
  if (validatedFields.shippingInformation) {
    payload.append("shippingInformation", validatedFields.shippingInformation);
  }
  payload.append(
    "availableStatus",
    validatedFields.availableStatus ?? "in stock"
  );
  payload.append("productAge", validatedFields.productAge ?? "new");
  if (validatedFields.returnPolicy) {
    payload.append("returnPolicy", validatedFields.returnPolicy);
  }
  if (validatedFields.minimumOrderQuantity != null) {
    payload.append(
      "minimumOrderQuantity",
      String(validatedFields.minimumOrderQuantity)
    );
  }
  if (validatedFields.thumbnail) {
    payload.append("thumbnail", validatedFields.thumbnail);
  }
  if (validatedFields.images && validatedFields.images.length) {
    validatedFields.images.forEach((img) => payload.append("images", img));
  }

  try {
    const res = await fetch(
      `https://api-dokan-backend.onrender.com/api/v1/products`,
      {
        method: "POST",
        body: payload,
        // headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    const product = await res.json();
    if (!res.ok) {
      console.error("API Error:", product);
      return { error: product.message || "Failed to add product" };
    }
    // console.log(product);
  } catch (error) {
    console.error("Error in product adding:", error);
    return { error: "add product failed" };
  }
};

// update product action
export const updateProduct = async (prevState: any, formData: FormData) => {
  const parseNumber = (value: FormDataEntryValue | null) => {
    if (!value) return undefined;
    const num = Number(value);
    return isNaN(num) ? undefined : num;
  };
  //  validation
  const id = formData.get("_id") as string;

  const parsed = formSchema.safeParse({
    title: formData.get("title") as string,
    category: formData.get("category") as string,
    description: formData.get("description") as string,
    price: parseNumber(formData.get("price")),
    stock: parseNumber(formData.get("stock")),
    tags: formData.getAll("tags") as string[],
    weight: formData.get("weight") as string,
    warrantyInformation: formData.get("warrantyInformation") as string,
    shippingInformation: formData.get("shippingInformation") as string,
    availableStatus: formData.get("availableStatus") as string,
    productAge: formData.get("productAge") as string,
    returnPolicy: formData.get("returnPolicy") as string,
    minimumOrderQuantity: parseNumber(formData.get("minimumOrderQuantity")),
    thumbnail: formData.get("thumbnail") as File,
    images: formData.getAll("images") as File[],
  });

  if (!parsed.success) {
    console.error("Validation errors:", parsed.error.flatten().fieldErrors);
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const validatedFields = parsed.data;
  const payload = new FormData();

  // Append validated fields (see previous snippet for full appending)
  // if (validatedFields.id !== undefined) {
  //   payload.append("_id", validatedFields.id);
  // }
  payload.append("title", validatedFields.title);
  payload.append("category", validatedFields.category);
  payload.append("description", validatedFields.description);
  // convert numeric values to string before appending
  payload.append("price", String(validatedFields.price));
  if (validatedFields.stock != null) {
    payload.append("stock", String(validatedFields.stock));
  }
  if (validatedFields.tags && validatedFields.tags.length) {
    validatedFields.tags.forEach((tag) => {
      if (tag != null) payload.append("tags", tag);
    });
  }
  if (validatedFields.weight) {
    payload.append("weight", validatedFields.weight);
  }
  if (validatedFields.warrantyInformation) {
    payload.append("warrantyInformation", validatedFields.warrantyInformation);
  }
  if (validatedFields.shippingInformation) {
    payload.append("shippingInformation", validatedFields.shippingInformation);
  }
  payload.append(
    "availableStatus",
    validatedFields.availableStatus ?? "in stock"
  );
  payload.append("productAge", validatedFields.productAge ?? "new");
  if (validatedFields.returnPolicy) {
    payload.append("returnPolicy", validatedFields.returnPolicy);
  }
  if (validatedFields.minimumOrderQuantity != null) {
    payload.append(
      "minimumOrderQuantity",
      String(validatedFields.minimumOrderQuantity)
    );
  }
  if (validatedFields.thumbnail) {
    payload.append("thumbnail", validatedFields.thumbnail);
  }
  if (validatedFields.images && validatedFields.images.length) {
    validatedFields.images.forEach((img) => payload.append("images", img));
  }

  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/products/${id}`,
    {
      method: "PUT",
      body: payload,
      credentials: "include",
    }
  );
  const product = await res.json();
  if (!res.ok) {
    console.error("API Error:", product);
    return { error: product.message || "Failed to add product" };
  }

  // back to all product page
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
  // console.log(product);
};

// delete product action
export const deleteProduct = async (id: string) => {
  const res = await fetch(
    `https://api-dokan-backend.onrender.com/api/v1/products/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  const product = await res.json();
  if (!res.ok) {
    // console.error("API Error:", product);
    return { error: product.message || "Failed to add product" };
  }

  revalidatePath("/dashboard/products");
};
