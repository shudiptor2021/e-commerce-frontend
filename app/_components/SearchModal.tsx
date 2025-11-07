"use client";
import { useToggleMenu } from "@/context/NavbarToggleContext";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { fetchSearchProducts } from "../dataFetch/Api";

const SearchModal = () => {
  const { searchItem, setSearchItem } = useToggleMenu();
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const pathname = usePathname();
  // const {filtered, setFiltered} = useState([]);
  // autofocus on search input field
  const inputRef = useRef<HTMLInputElement>(null);

  // data call
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", query],
    queryFn: () => fetchSearchProducts(query),
  });
  // console.log(data)
  // search results
  // const results = data?.filter((product: any) => {
  //   product.title.toLowerCase().includes(query.toLowerCase())
  // });

  const handleModal = () => {
    setSearchItem(false);
  };

  // for auto focus
  useEffect(() => {
    if (searchItem) {
      inputRef.current?.focus();
    }
  }, [searchItem]);

  //  Close modal on route change
  useEffect(() => {
    setSearchItem(false);
  }, [pathname]);

  return (
    <div>
      {searchItem && (
        <div className=" flex flex-col items-center justify-start pt-28 fixed inset-0 bg-black/25 backdrop-blur-sm top-[112px] left-0 bottom-0 right-0 z-20">
          <div className="w-full mx-5 md:mx-0 md:w-[500px] h-9 md:h-12 flex items-center justify-between bg-gray-100 rounded text-black/90 px-4 z-30 ">
            <input
              type="text"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowResults(true)}
              onBlur={() => setShowResults(false)}
              placeholder="What are you looking for?"
              className="w-full md:w-[450px] border p-1 text-[14px] text-black border-none outline-none cursor-pointer"
            />
            <span>
              <Link href={`/products/${query}`}>
                <FiSearch size={24} className="text-black/90" />
              </Link>
            </span>
          </div>
          {/* results */}

          {(query || showResults) && (
            <ul className="w-full md:w-[500px] md:h-[360px] overflow-hidden">
              {data && data?.length > 0 ? (
                data?.map((item: any) => (
                  <li key={item.id} onClick={handleModal}>
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

          {/* cross button */}

          <div
            onClick={handleModal}
            className="absolute right-3 top-3 md:right-8 md:top-5 cursor-pointer"
          >
            <FaTimes size={24} className="text-black/90" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
