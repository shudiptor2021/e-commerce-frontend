"use client";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchAllProducts } from "../dataFetch/Api";
import ProductCard from "./ProductCard";

type Products = {
  id: string | number;
  // add other product fields as needed
};

const ShopProductPage = () => {
  // const [pageNumber, setPageNumber] = useState(1);
  // const limit = 12;
  const { ref, inView } = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  // console.log(data);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className="container mx-auto px-2 md:px-14 space-x-3 bg-white md:flex justify-between pb-8 md:py-8 md:pb-20">
      {/* products section */}
      <div className="w-full flex flex-col justify-center gap-20">
        {data?.pages?.map(
          (group, index) =>
            group?.products?.length > 0 && (
              <div
                key={index}
                className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 justify-items-center space-y-6"
              >
                {group?.products?.map((item: Products) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            )
        )}
        <div ref={ref} className="h-0.5"></div>
      </div>
    </section>
  );
};

export default ShopProductPage;

{
  /* pagination */
}
{
  /* <PaginationPage
          currentPage={pageNumber}
          totalPage={data?.totalPages || 1}
          setPageNumber={setPageNumber}
        /> */
}
