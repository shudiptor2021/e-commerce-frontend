"use client";
import ProductCard from "@/app/_components/ProductCard";
import { fetchSearchProducts } from "@/app/dataFetch/Api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Range } from "react-range";

// Define the Products type (adjust fields as needed)
type Product = {
  id: string;
  title: string;
  brand: string;
  rating: number;
  thumbnail: string;
  price: number;
  // add other fields as needed, e.g. name: string, price: number, etc.
};

const SearchProducts = ({ slug }: { slug: string }) => {
  const { data } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => fetchSearchProducts(slug),
    // staleTime: 1000 * 60 * (60 * 24), // 24 hours
    // refetchOnWindowFocus: false,
  });
  //  console.log(data)

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // price range
  useEffect(() => {
    if (data?.length > 0) {
      const prices = data?.map((p: Product) => p.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    }
  }, [data]);

  // Extract unique brands and ratings
  const brands = useMemo(() => {
    return data ? [...new Set(data?.map((p: Product) => p.brand))] : [];
  }, [data]);

  const ratings = useMemo(() => {
    return data
      ? [
          ...new Set(data?.products?.map((p: Product) => Math.floor(p.rating))),
        ].sort((a, b) => (b as number) - (a as number))
      : [];
  }, [data]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (!data) return [];

    return data?.filter((product: Product) => {
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
    <div className="container min-h-[500px] mx-auto px-2 md:px-14 md:py-10 bg-white md:flex justify-between gap-3 md:pt-10 md:pb-20">
      {/* filtering */}
      <div className=" md:w-[280px] space-y-4 md:space-y-8">
        {/* ------------ */}
        <h1 className="text-[16px] md:text-2xl text-black/80 font-bold mb-4 md:mb-6">
          Search Results for "{slug}"
        </h1>

        <div>
          <h4 className="font-semibold mb-2">Filter by Price</h4>
          <div className="text-[12px] md:text-sm mb-2">
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
        <div>
          <h4 className="font-semibold mb-2">Filter by Brand</h4>
          {brands.map((brand: any, index) => (
            <label key={index} className="block text-[12px] md:text-sm">
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

        <div>
          <h4 className="font-semibold mb-2">Filter by Rating</h4>
          {ratings.map((rating: any) => (
            <label key={rating} className="block text-[12px] md:text-sm">
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

      <div className=" md:w-full grid grid-cols-2 md:grid-cols-4 justify-items-end gap-3 py-10 md:py-0">
        {filteredProducts.length ? (
          filteredProducts.map((item: Product) => (
            <ProductCard key={item.id} item={item} />
          ))
        ) : (
          <p>No products match selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default SearchProducts;
