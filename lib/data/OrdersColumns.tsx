"use client";

import {
  changeOrderStatus,
  deleteOrder,
} from "@/app/actions/order/createOrder";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
// import { url } from "inspector";
import { MoreHorizontal } from "lucide-react";
import { useActionState, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Orders = {
  _id: string;
  name: string;
  address: string;
  city_town: string;
  phone: string;
  email: string;
  ordered_product: string;
  status: string;
  created_at: string;
};

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "_id",
    header: "",
    cell: ({ row }) => <div className="hidden">{row.getValue("_id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "city_town",
    header: "City/Town",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("city_town")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "ordered_product",
    header: "Ordered Product",
    cell: ({ row }) => (
      <div className="capitalize">
        {(row.getValue("ordered_product") as string)
          .split(" ")
          .slice(0, 3)
          .join(" ")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`capitalize ${
          row.getValue("status") === "pending"
            ? "text-yellow-500"
            : "text-blue-500"
        } ${
          row.getValue("status") === "deliveried"
            ? "text-green-500"
            : "text-blue-500"
        }`}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },

  // action dropdown
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const [state, action, ispending] = useActionState(
        changeOrderStatus,
        null
      );
      const [status, setStatus] = useState(order.status);
      const id = row.getValue("_id") as string;
      // handle delete product
      const handleDelete = async () => {
        const id = row.getValue("_id") as string;
        const deleteItem = await deleteOrder(id);
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
              //   onClick={() =>
              //     (window.location.href = `/dashboard/products/${row.getValue(
              //       "_id"
              //     )}/view`)
              //   }
              className="text-green-500"
            >
              View Product
            </DropdownMenuItem>
            <DropdownMenuItem>
              <form action={action}>
                <input type="text" name="_id" defaultValue={id} hidden />
                <Select onValueChange={setStatus} value={status}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change Order status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirm">Confirmed</SelectItem>
                      <SelectItem value="deliveried">Delivered</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <input type="hidden" name="status" value={status} />
                <Button type="submit" className="mt-2">
                  Change
                </Button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-500 font-semibold"
            >
              Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
