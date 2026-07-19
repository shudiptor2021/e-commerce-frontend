import { fetchUsers } from "@/lib/auth";
import { columns } from "@/lib/data/UsersColumns";
import { DataTable } from "../_components/data-table";

const userPage = async () => {
  const users = (await fetchUsers()) || [];
  // console.log(users);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default userPage;
