"use client";
import { useQuery } from "@tanstack/react-query";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fetchCategoryItem } from "../dataFetch/Api";
import HeroHeadLine from "./HeroHeadLine";
import ProductCard from "./ProductCard";

interface Props {
  category: string;
}
interface Products {
  id: string | number;

  // add other product fields as needed
}

const RelatedItems = ({ category }: Props) => {
  // console.log(category)

  // data fecthing
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["product", category],
    queryFn: () => fetchCategoryItem(category),
  });

  const reletedProducts = data?.products || null;

  // console.log(reletedProducts)
  // carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <section className="w-full h-[450px] md:h-[750px] flex flex-col items-center justify-center gap-10 md:gap-20 ">
      <div className=" relative w-full md:h-[495px] flex flex-col justify-between">
        <HeroHeadLine thumb={`Related`} title={"Items"} />
        {/* carousel section */}
        <div className="pt-4">
          {Array.isArray(reletedProducts) && reletedProducts.length > 0 && (
            <Carousel
              responsive={responsive}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              itemClass=" mx-1 "
              arrows={false}
              customButtonGroup={<ButtonGroup />}
              renderButtonGroupOutside={true}
            >
              {reletedProducts?.map((item: Products) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedItems;

//custom button

const ButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group hidden md:block absolute md:top-16 md:right-6 md:space-x-3 ">
      <button
        className={`text-black p-3 rounded-full bg-gray-100  hover:bg-gray-200 cursor-pointer ${
          currentSlide === 0 ? "disable" : ""
        }`}
        onClick={() => previous()}
      >
        <GoArrowLeft />
      </button>
      <button
        onClick={() => next()}
        className="text-black p-3 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer"
      >
        <GoArrowRight />
      </button>
    </div>
  );
};
