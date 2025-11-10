"use client";

import { deleteProduct } from "@/app/actions/product/product";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
// import { url } from "inspector";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  _id: string;
  title: string;
  category: string;
  price: string;
  availableStatus: string;
  thumbnail: {
    url: string;
    public_id: string;
  };
};

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => <div className="hidden">{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "availableStatus",
    header: "AvailableStatus",
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => {
      const thumbnail = row.getValue("thumbnail") as {
        url: string;
        public_id: string;
      };
      if (!thumbnail || !thumbnail.url) {
        return (
          <div className="flex items-center text-gray-400 italic">No image</div>
        );
      }
      return (
        <div className="">
          <Image
            src={thumbnail?.url}
            alt={thumbnail?.public_id || "product image"}
            width={50}
            height={50}
          />
        </div>
      );
    },
  },

  // action dropdown
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      // handle delete product
      const handleDelete = async () => {
        const id = row.getValue("_id") as string;
        const deleteItem = await deleteProduct(id);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = `/dashboard/products/${row.getValue(
                  "_id"
                )}/view`)
              }
              className="text-green-500"
            >
              View Product
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = `/dashboard/products/${row.getValue(
                  "_id"
                )}/update`)
              }
            >
              Update Product
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-500 font-semibold"
            >
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
