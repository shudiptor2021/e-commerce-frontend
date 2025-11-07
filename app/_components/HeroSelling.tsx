// 'use client'
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchBestSale } from "../dataFetch/Api";
import HeroHeadLine from "./HeroHeadLine";
import ProductCard from "./ProductCard";

const HeroSelling = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["saleProducts"],
    queryFn: fetchBestSale,
    staleTime: 1000 * 60 * (60 * 24), // 24 hours
    refetchOnWindowFocus: false,
  });
  return (
    <section className="pb-12 md:py-24">
      <div className=" relative w-full md:h-[495px] flex flex-col justify-between gap-8 md:gap-16">
        <HeroHeadLine thumb={"This Month"} title={"Best Selling Products"} />
        {/* product card */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-28 ">
          {data?.map((item: any) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
        <button className="w-16 h-6 md:w-[160px] md:h-14 absolute top-9 md:top-12 right-0 text-white text-[10px] md:text-[16px] font-semibold bg-[#DB4444] rounded flex items-center justify-center ">
          <Link href="/shop">View All</Link>
        </button>
      </div>
    </section>
  );
};

export default HeroSelling;
