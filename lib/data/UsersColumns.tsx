"use client";

import { changeRole } from "@/app/actions/user/changeRole";
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
import { MoreHorizontal } from "lucide-react";
import { useActionState, useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
};

export const columns: ColumnDef<Users>[] = [
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="">{row.getValue("email") || "---"}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div className="">{row.getValue("phone") || "---"}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
  },

  // action dropdown
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [state, action, ispending] = useActionState(changeRole, null);
      const [role, setRole] = useState(user.role);
      const id = row.getValue("_id") as string;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
            // onClick={() =>
            //   (window.location.href = `/dashboard/users/${row.getValue(
            //     "_id"
            //   )}`)
            // }
            >
              <form action={action}>
                <input type="text" name="_id" defaultValue={id} hidden />
                <Select onValueChange={setRole} value={role}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chage Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <input type="hidden" name="role" value={role} />
                <Button type="submit">Save</Button>
              </form>
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
