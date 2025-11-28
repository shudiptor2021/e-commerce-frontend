// use client
import Link from "next/link";
import MobileCategoryBar from "./MobileCategoryBar";

interface Category {
  name: string;
  slug: string;
  // add other fields as needed
}

interface HeroCategoryProps {
  categories: Category[];
}

const HeroCategory = ({ categories }: HeroCategoryProps) => {
  //  console.log(category)
  return (
    <div className="w-full h-fit py-5 md:py-0 md:w-[350px] md:h-96 md:border-r border-gray-300 md:flex md:items-end ">
      {/* for mobile */}
      <div className="block md:hidden">
        <MobileCategoryBar />
      </div>
      {/* for desktop */}

      <div className="hidden md:w-[90%] md:h-[344px] md:flex md:flex-col md:flex-nowrap md:gap-3 overflow-auto scrollbar-hide">
        {categories?.map((list, index) => (
          <Link
            key={index}
            href={`category/${list.slug}`}
            className="text-[14px] md:text-[18px] text-black/80 font-mono underline md:no-underline"
          >
            {list.name}
          </Link>
        ))}
      </div>
    </div>
    // <div className="w-full h-fit py-5 md:py-0 md:w-[350px] md:h-96 md:border-r border-gray-300 md:flex md:items-end">
    //   <div className="w-full h-fit md:w-[90%] md:h-[344px] flex flex-wrap gap-3 md:flex-col md:flex-nowrap md:gap-3 overflow-auto scrollbar-hide">
    //     {categories?.map((list, index) => (
    //       <Link
    //         key={index}
    //         href={`category/${list.slug}`}
    //         className="text-[14px] md:text-[18px] text-black/80 font-mono underline md:no-underline"
    //       >
    //         {list.name}
    //       </Link>
    //     ))}
    //   </div>
    // </div>
  );
};

export default HeroCategory;
