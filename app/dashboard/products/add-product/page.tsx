"use client";
import { addProduct } from "@/app/actions/product/product";
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
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const addProductPage = () => {
  const [state, action, ispending] = useActionState(addProduct, null);
  const [availableStatus, setAvailableStatus] = useState("in stock");
  const [productAge, setProductAge] = useState("new");

  // clear cart after order
  useEffect(() => {
    if (state?.success) {
      toast.success("Product added succesfully!")
    } else {
      toast.error("Something Wrong!")
    }
  }, [state]);

  return (
    <div className="md:p-4 ">
      <h1 className="md:text-xl font-semibold text-muted-foreground capitalize">
        add product
      </h1>
      <div className="md:py-4">
        <form action={action}>
          <FieldSet>
            <FieldGroup>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-4 capitalize">
                <Field className=" col-span-3 md:col-span-2">
                  <FieldLabel htmlFor="title" className="text-[16px]">
                    Title
                  </FieldLabel>
                  <Input
                    name="title"
                    id="title"
                    autoComplete="off"
                    placeholder="Title"
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
                    placeholder="Category"
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
                    placeholder="Description"
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
                    placeholder="Price"
                  />
                  {state?.errors?.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {state?.errors?.price?.[0]}
                    </p>
                  )}
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="discount_price" className="text-[16px]">
                    Discount Price
                  </FieldLabel>
                  <Input
                    name="discount_price"
                    id="discount_price"
                    autoComplete="off"
                    placeholder="discount price"
                  />
                  {state?.errors?.discount_price && (
                    <p className="text-red-500 text-sm mt-1">
                      {state?.errors?.discount_price?.[0]}
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
                    placeholder="Stock"
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
                      placeholder="Tags"
                    />
                    <Input
                      name="tags"
                      id="tags"
                      autoComplete="off"
                      placeholder="Tags"
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
                    placeholder="Brand"
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
                    placeholder="Weight"
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
                    placeholder="Warranty Information"
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
                    placeholder="Shipping Information"
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="availableStatus" className="text-[16px]">
                    Available Status
                  </FieldLabel>
                  <Select
                    onValueChange={setAvailableStatus}
                    value={availableStatus}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select stock" />
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
                    value={availableStatus}
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="productAge" className="text-[16px]">
                    Product Age
                  </FieldLabel>
                  <Select onValueChange={setProductAge} value={productAge}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="old">Old</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {/* Hidden input for form submission */}
                  <input type="hidden" name="productAge" value={productAge} />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="returnPolicy" className="text-[16px]">
                    Return Policy
                  </FieldLabel>
                  <Input
                    name="returnPolicy"
                    id="returnPolicy"
                    autoComplete="off"
                    placeholder="Return Policy"
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
                    placeholder="MinimumOrder Quantity"
                  />
                </Field>
                <Field className="col-span-3 md:col-span-1">
                  <FieldLabel htmlFor="thumbnail" className="text-[16px]">
                    Thumbnail
                  </FieldLabel>
                  <Input name="thumbnail" id="thumbnail" type="file" />
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
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default addProductPage;
