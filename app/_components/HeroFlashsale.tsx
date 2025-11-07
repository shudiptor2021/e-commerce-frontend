// 'use client'
import { useQuery } from "@tanstack/react-query";
import { fetchFlashSaleProducts } from "../dataFetch/Api";
import FlashsaleCarouselWrapper from "./FlashsaleCarouselWrapper";
import ProductButton from "./ProductButton";

const HeroFlashsale = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["flashProduct"],
    queryFn: fetchFlashSaleProducts,
    staleTime: 1000 * 60 * (60 * 24), // 24 hours
    refetchOnWindowFocus: false,
  });
  // console.log(data)
  return (
    <div className="w-full md:h-[750px] flex flex-col items-center justify-center gap-8 mt-8 md:gap-20 md:mt-16 md:border-b border-gray-300">
      <FlashsaleCarouselWrapper data={data} />
      <ProductButton goTo="/shop" />
    </div>
  );
};

export default HeroFlashsale;
