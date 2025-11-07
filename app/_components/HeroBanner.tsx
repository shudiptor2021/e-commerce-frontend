import { useQuery } from "@tanstack/react-query";
import { fetchAllCategory } from "../dataFetch/Api";
import HeroCarousel from "./HeroCarousel";
import HeroCategory from "./HeroCategory";

const HeroBanner = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategory,
    staleTime: 1000 * 60 * (60 * 24), // 24 hours
    refetchOnWindowFocus: false,
  });
  //   console.log(data);
  return (
    <div className="w-full md:flex  ">
      <HeroCategory categories={data} />
      <HeroCarousel />
    </div>
  );
};

export default HeroBanner;
