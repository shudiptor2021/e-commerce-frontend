import { fetchSingleOrder } from "@/app/actions/order/handleOrder";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

const orederDetails = async (props: Props) => {
  const { id } = await props.params;
  const order = await fetchSingleOrder(id);
  //   console.log(order);
  return (
    <div>
      <div className="flex justify-between items-center mx-5 mt-3">
        <h1 className="text-[20px] font-semibold">Order Details</h1>
        <Link href="/dashboard/orders">
          <button className="text-[20px] font-semibold">Back</button>
        </Link>
      </div>
      <div className="flex flex-col gap-2 m-5">
        <p className="text-[18px] font-semibold flex items-end gap-3">
          Product Id:{" "}
          <span className="text-[16px] font-stretch-50% capitalize text-muted-foreground">
            {order?._id}
          </span>
        </p>
        <span className="w-full h-[2px] bg-muted-foreground rounded"></span>
        <p className="text-[18px] font-semibold flex items-end gap-3">
          Name:{" "}
          <span className="text-[16px] font-stretch-50% capitalize text-muted-foreground">
            {order?.name}
          </span>
        </p>
        <span className="w-full h-[2px] bg-muted-foreground rounded"></span>
        <p className="text-[18px] font-semibold flex items-end gap-3">
          Address:{" "}
          <span className="text-[16px] font-stretch-50% capitalize text-muted-foreground">
            {order?.address}
          </span>
        </p>
        <span className="w-full h-[2px] bg-muted-foreground rounded"></span>
        <p className="text-[18px] font-semibold flex items-end gap-3">
          City/Town:{" "}
          <span className="text-[16px] font-stretch-50% capitalize text-muted-foreground">
            {order?.city_town}
          </span>
        </p>
        <span className="w-full h-[2px] bg-muted-foreground rounded"></span>
        <p className="text-[18px] font-semibold flex items-end gap-3">
          Phone:{" "}
          <span className="text-[16px] font-stretch-50% capitalize text-muted-foreground">
            {order?.phone}
          </span>
        </p>
        <span className="w-full h-[2px] bg-muted-foreground rounded"></span>
        <p className="text-[18px] font-semibold flex items-end gap-3">
          Email:{" "}
          <span className="text-[16px] font-stretch-50% capitalize text-muted-foreground">
            {order?.email}
          </span>
        </p>
        <span className="w-full h-[2px] bg-muted-foreground rounded"></span>
        <p className="text-[18px] font-semibold flex items-end gap-3">
          Product Details:{" "}
          <span className="text-[16px] font-stretch-50% capitalize text-muted-foreground">
            {order?.ordered_product
              .map((product: string) => product)
              .join(" | ")}
          </span>
        </p>
        <span className="w-full h-[2px] bg-muted-foreground rounded"></span>
        <p className="text-[18px] font-semibold flex items-end gap-3">
          Status:{" "}
          <span className="text-[16px] font-stretch-50% capitalize text-muted-foreground">
            {order?.status}
          </span>
        </p>
        <span className="w-full h-[2px] bg-muted-foreground rounded"></span>
        <p className="text-[18px] font-semibold flex items-end gap-3">
          Order Time/Date:{" "}
          <span className="text-[16px] font-stretch-50% capitalize text-muted-foreground">
            {order?.created_at}
          </span>
        </p>
        <span className="w-full h-[2px] bg-muted-foreground rounded"></span>
        <p className="text-[18px] font-semibold flex items-end gap-3">
          Last Updated:{" "}
          <span className="text-[16px] font-stretch-50% capitalize text-muted-foreground">
            {order?.updated_at}
          </span>
        </p>
        <span className="w-full h-[2px] bg-muted-foreground rounded"></span>
      </div>
    </div>
  );
};

export default orederDetails;
