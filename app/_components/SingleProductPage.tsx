import RelatedItems from "@/app/_components/RelatedItems";
import SingleProduct from "@/app/_components/SingleProduct";
import { fetchProduct } from "@/app/dataFetch/Api";

export const revalidate = 0;
// revalidate: 0 means no caching, always fetch fresh data

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   const allProducts = await fetchAllProducts();

//   return allProducts?.products?.map((product: { id: string }) => ({
//     id: product.id,
//   }))
// }

const SingleProductPage = async ({ id }: { id: string }) => {
  // Fetch product details based on the product ID
  // console.log(id);
  if (!id) {
    return <div>Product not found</div>;
  }
  const data = await fetchProduct(id);
  // console.log(data)
  return (
    <div className="container mx-auto px-2 md:px-14 pb-10 md:py-20 bg-white">
      <SingleProduct data={data} />
      <RelatedItems category={data?.category} />
    </div>
  );
};

export default SingleProductPage;
