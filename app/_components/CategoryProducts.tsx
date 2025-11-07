"use client";
import { fetchCategoryItem } from "@/app/dataFetch/Api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Range } from "react-range";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  brand: string;
  rating: number;
  thumbnail: string;
  price: number;
  // add more fields if needed
}

const CategoryProducts = ({ slug }: { slug?: string }) => {
  const { data } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => fetchCategoryItem(slug),
    staleTime: 1000 * 60 * (60 * 24), // 24 hours
    refetchOnWindowFocus: false,
  });

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // price range
  useEffect(() => {
    if (data?.products?.length) {
      const prices = data.products.map((p: Product) => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    }
  }, [data]);

  // Extract unique brands and ratings
  const brands = useMemo(() => {
    return data?.products
      ? [...new Set(data.products.map((p: Product) => p.brand))]
      : [];
  }, [data]);

  const ratings = useMemo(() => {
    return data?.products
      ? [
          ...new Set(data.products.map((p: Product) => Math.floor(p.rating))),
        ].sort((a, b) => (b as number) - (a as number))
      : [];
  }, [data]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (!data?.products) return [];

    return data.products.filter((product: Product) => {
      const matchBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      const matchRating =
        selectedRatings.length === 0 ||
        selectedRatings.includes(Math.floor(product.rating));
      const matchPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchBrand && matchRating && matchPrice;
    });
  }, [data, selectedBrands, selectedRatings, priceRange]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <section className="container min-h-[500px] mx-auto px-2 md:px-14 bg-white md:flex items-start justify-between md:pt-10 md:pb-20">
      {/* filtering */}
      <div className=" md:w-[280px] space-y-4 md:space-y-8">
        {/* ------------ */}
        <div>
          <h4 className="font-semibold mb-2">Filter by Price</h4>
          <div className="text-[12px] md:text-sm mb-2 cursor-pointer">
            ${priceRange[0]} — ${priceRange[1]}
          </div>
          <Range
            step={10}
            min={minPrice}
            max={maxPrice}
            values={priceRange}
            onChange={(values) => setPriceRange(values as [number, number])}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  background: "#e5e7eb",
                  borderRadius: "4px",
                }}
                className="w-[95%] md:w-[90%] mx-auto md:ml-2"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={key} // ✅ Set key explicitly
                  {...rest} // ✅ Spread the rest
                  style={{
                    ...props.style,
                    height: "20px",
                    width: "20px",
                    backgroundColor: "#3b82f6",
                    borderRadius: "50%",
                  }}
                />
              );
            }}
          />
        </div>

        {/* ------------------ */}
        <div className="space-y-2">
          <h4 className="font-semibold mb-2">Filter by Brand</h4>
          {brands.map((brand: any, index) => (
            <label
              key={index}
              className="block text-[12px] md:text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              {brand}
            </label>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold mb-2">Filter by Rating</h4>
          {ratings.map((rating: any) => (
            <label
              key={rating}
              className="block text-[12px] md:text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
              />
              {rating}★ & up
            </label>
          ))}
        </div>
      </div>

      {/* products section */}
      <div className=" md:w-full grid grid-cols-2 md:grid-cols-4 justify-items-end gap-3 py-10 md:py-0">
        {filteredProducts.length ? (
          filteredProducts.map((item: Product) => (
            <ProductCard key={item.id} item={item} />
          ))
        ) : (
          <p>No products match selected filters.</p>
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
