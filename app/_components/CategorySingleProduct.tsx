import RelatedItems from "@/app/_components/RelatedItems";
import SingleProduct from "@/app/_components/SingleProduct";
import { fetchProduct } from "@/app/dataFetch/Api";

export const revalidate = 0;
// revalidate: 0 means no caching, always fetch fresh data

const CategorySingleProduct = async ({ id }: { id: string }) => {
  // Fetch product details based on the product ID
  // console.log(id);
  if (!id) {
    return <div>Product not found</div>;
  }
  const data = await fetchProduct(id);
  // console.log(data)

  return (
    <div className="container mx-auto px-2 md:px-14 md:py-20 bg-white">
      <SingleProduct data={data} />
      <RelatedItems category={data?.category} />
    </div>
  );
};

export default CategorySingleProduct;
