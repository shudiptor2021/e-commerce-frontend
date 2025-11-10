"use client";

import { updateProduct } from "@/app/actions/product/product";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useState } from "react";

// interface ProductProp {
//   title: string;
//   category: string;
//   description: string;
//   price: number;
//   stock?: number | null;
//   tags?: (string | null)[] | null;
//   brand?: string | null;
//   weight?: string | null;
//   warrantyInformation?: string | null;
//   shippingInformation?: string | null;
//   availableStatus?: "in stock" | "low stock" | "out of stock";
//   productAge?: "new" | "old";
//   returnPolicy?: string | null;
//   minimumOrderQuantity?: number | null;
//   thumbnail?: File | null; // depends on your fileSchema
//   images?: File[] | null; // depends on your imagesSchema
// }

interface ProductProp {
  product: any; // Replace 'any' with the actual product type if available, e.g., Product
}

const ProductUpdateForm = ({ product }: ProductProp) => {
  const [state, action, ispending] = useActionState(updateProduct, null);
  const [AvailableStatus, setAvailableStatus] = useState("in stock");
  const [ProductAge, setProductAge] = useState("new");
  return (
    <div className="md:p-4 ">
      <h1 className="md:text-xl font-semibold text-muted-foreground capitalize">
        update product?
      </h1>
      <div className="md:py-4">
        <form action={action}>
          <FieldSet>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-4 capitalize">
                <Field className=" col-span-3 md:col-span-2">
                  <Input
                    name="_id"
                    id="_id"
                    autoComplete="off"
                    defaultValue={product?._id}
                    hidden
                  />
                </Field>
                <Field className=" col-span-3 md:col-span-2">
                  <FieldLabel htmlFor="title" className="text-[16px]">
                    Title
                  </FieldLabel>
                  <Input
                    name="title"
                    id="title"
                    autoComplete="off"
                    defaultValue={product?.title}
                  />
                  {state?.errors?.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {state?.errors?.title?.[0]}
                    </p>
                  )}
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="category" className="text-[16px]">
                    category
                  </FieldLabel>
                  <Input
                    name="category"
                    id="category"
                    autoComplete="off"
                    defaultValue={product?.category}
                  />
                  {state?.errors?.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {state?.errors?.category?.[0]}
                    </p>
                  )}
                </Field>
                <Field className="col-span-3">
                  <FieldLabel htmlFor="description" className="text-[16px]">
                    description
                  </FieldLabel>
                  <Textarea
                    name="description"
                    id="description"
                    defaultValue={product?.description}
                    rows={4}
                  />
                  {state?.errors?.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {state?.errors?.description?.[0]}
                    </p>
                  )}
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="price" className="text-[16px]">
                    price
                  </FieldLabel>
                  <Input
                    name="price"
                    id="price"
                    autoComplete="off"
                    defaultValue={product?.price}
                  />
                  {state?.errors?.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {state?.errors?.price?.[0]}
                    </p>
                  )}
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="stock" className="text-[16px]">
                    stock
                  </FieldLabel>
                  <Input
                    name="stock"
                    id="stock"
                    autoComplete="off"
                    defaultValue={product?.stock || ""}
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="tags" className="text-[16px]">
                    Tags
                  </FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      name="tags"
                      id="tags"
                      autoComplete="off"
                      defaultValue={product?.tags?.[0] ?? ""}
                    />
                    <Input
                      name="tags"
                      id="tags"
                      autoComplete="off"
                      defaultValue={product?.tags?.[0] ?? ""}
                    />
                  </div>
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="brand" className="text-[16px]">
                    Brand
                  </FieldLabel>
                  <Input
                    name="brand"
                    id="brand"
                    autoComplete="off"
                    defaultValue={product?.brand || ""}
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="weight" className="text-[16px]">
                    Weight
                  </FieldLabel>
                  <Input
                    name="weight"
                    id="weight"
                    autoComplete="off"
                    defaultValue={product?.weight || ""}
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel
                    htmlFor="warrantyInformation"
                    className="text-[16px]"
                  >
                    Warranty Information
                  </FieldLabel>
                  <Input
                    name="warrantyInformation"
                    id="warrantyInformation"
                    autoComplete="off"
                    defaultValue={product?.warrantyInformation || ""}
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel
                    htmlFor="shippingInformation"
                    className="text-[16px]"
                  >
                    Shipping Information
                  </FieldLabel>
                  <Input
                    name="shippingInformation"
                    id="shippingInformation"
                    autoComplete="off"
                    defaultValue={product?.shippingInformation || ""}
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="availableStatus" className="text-[16px]">
                    Available Status
                  </FieldLabel>
                  <Select
                    onValueChange={setAvailableStatus}
                    value={AvailableStatus}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue defaultValue={product?.availableStatus} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="in stock">In stock</SelectItem>
                        <SelectItem value="low stock">Low stock</SelectItem>
                        <SelectItem value="out of stock">
                          Out of stock
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    name="availableStatus"
                    value={AvailableStatus}
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="productAge" className="text-[16px]">
                    Product Age
                  </FieldLabel>
                  <Select onValueChange={setProductAge} value={ProductAge}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue defaultValue={product?.productAge} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="old">Old</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* Hidden input for form submission */}
                  <input type="hidden" name="productAge" value={ProductAge} />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="returnPolicy" className="text-[16px]">
                    Return Policy
                  </FieldLabel>
                  <Input
                    name="returnPolicy"
                    id="returnPolicy"
                    autoComplete="off"
                    defaultValue={product?.returnPolicy || ""}
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel
                    htmlFor="minimumOrderQuantity"
                    className="text-[16px]"
                  >
                    MinimumOrder Quantity
                  </FieldLabel>
                  <Input
                    name="minimumOrderQuantity"
                    id="minimumOrderQuantity"
                    autoComplete="off"
                    defaultValue={product?.minimumOrderQuantity || ""}
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="thumbnail" className="text-[16px]">
                    Thumbnail
                  </FieldLabel>
                  <Input
                    name="thumbnail"
                    id="thumbnail"
                    type="file"
                    // defaultValue={product?.thumbnail}
                  />
                  {state?.errors?.thumbnail && (
                    <p className="text-red-500 text-sm mt-1">
                      {state?.errors?.thumbnail?.[0]}
                    </p>
                  )}
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="images" className="text-[16px]">
                    Images
                  </FieldLabel>
                  <Input name="images" id="images" type="file" multiple />
                  {state?.errors?.images && (
                    <p className="text-red-500 text-sm mt-1">
                      {state?.errors?.images?.[0]}
                    </p>
                  )}
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <div className="pt-3 md:pt-5">
            <Button type="submit" disabled={ispending} variant="outline">
              Update Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateForm;
