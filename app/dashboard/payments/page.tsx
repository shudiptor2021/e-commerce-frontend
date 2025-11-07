import { fetchUsers } from "@/lib/auth";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const PaymentPage = async () => {
  const users = await fetchUsers();
  // console.log(users);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default PaymentPage;
