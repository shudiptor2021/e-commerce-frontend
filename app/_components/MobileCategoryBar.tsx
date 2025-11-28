"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { fetchAllCategory } from "../dataFetch/Api";

const MobileCategoryBar = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategory,
    staleTime: 1000 * 60 * (60 * 24), // 24 hours
    refetchOnWindowFocus: false,
  });
  return (
    <div className="w-full">
      <button
        onClick={() => setOpenCategory(!openCategory)}
        className="w-full flex items-center justify-center rounded bg-gray-500 text-white/70 font-bold py-1 capitalize mt-2 cursor-pointer"
      >
        categories
      </button>

      {openCategory && (
        <div
          className={`flex flex-col gap-1 mt-2 bg-gray-300 duration-200 ease-in-out`}
        >
          {data?.map((list: { slug: string; name: string }, index: number) => (
            <Link
              key={index}
              href={`category/${list.slug}`}
              className="text-[14px] md:text-[18px] w-full flex items-center justify-center rounded bg-[#DB4444] py-1 capitalize font-semibold text-black/70"
            >
              {list.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileCategoryBar;
