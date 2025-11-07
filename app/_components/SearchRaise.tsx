"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LiaTimesSolid } from "react-icons/lia";
import { fetchSearchProducts } from "../dataFetch/Api";

const SearchRaise = () => {
  const [searchBar, setSearchBar] = useState(false);
  //   for filtering data
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  //   for getting api data
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", query],
    queryFn: () => fetchSearchProducts(query),
  });

  const handleSearchClick = () => {
    if (query.length > 0) {
      setSearchBar(!searchBar);
      setQuery("");
      redirect(`/products/${query}`);
    }
    // console.log("search on");
  };

  // handle on focus
  const handleFocus = () => {
    setSearchBar(true);
  };

  // handle on focus
  const handleBlur = () => {
    if (!query) {
      setSearchBar(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSearchBar(false);
    setShowResults(false);
  };

  return (
    <div className="relative">
      <div
        className={`w-full ${
          searchBar ? "md:w-[500px]" : "md:w-[250px]"
        } h-9 flex items-center justify-center md:justify-between bg-gray-100 rounded text-black/80 px-2 md:px-4 z-20 cursor-pointer ease-in-out duration-200 `}
      >
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What are you looking for?"
          className={`w-full ${
            searchBar ? "md:w-[450px]" : "md:w-[200px]"
          } border p-1 text-sm md:text-[14px] text-black border-none outline-none cursor-pointer`}
          //   disabled={!searchBar}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className="flex items-center gap-2">
          <button onClick={handleSearchClick}>
            <FiSearch size={24} className="text-black/90 cursor-pointer" />
          </button>
          <button
            onClick={handleClear}
            className={`${query ? "block" : "hidden"}`}
          >
            <LiaTimesSolid size={24} className="text-red-500 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* search results */}
      {(query || showResults) && (
        <ul className="absolute md:-bottom-[360px] w-full md:w-[500px] h-[360px] overflow-hidden z-20">
          {data && data?.length > 0 ? (
            data?.map((item: any) => (
              <li key={item.id} onClick={() => setShowResults(false)}>
                <Link
                  className="block px-4 py-2 bg-white hover:bg-gray-100 rounded"
                  href={`/shop/${item.id}`}
                >
                  {item.title}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchRaise;
