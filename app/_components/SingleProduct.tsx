// 'use client'
import { fetchUserProfile } from "@/lib/auth";
import Reviews from "./Reviews";
import SingleProductDetails from "./SingleProductDetails";
import SingleProductImage from "./SingleProductImage";

const SingleProduct = async ({ data }: any) => {
  const userData = await fetchUserProfile();

  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-10 ">
      {/* image section */}
      <div className="flex flex-col gap-3">
        <SingleProductImage product={data} />
        <Reviews product={data} userData={userData} />
      </div>
      {/* deatils section */}
      <SingleProductDetails product={data} />
    </div>
  );
};

export default SingleProduct;
