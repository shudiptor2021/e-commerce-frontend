import { getSingleProduct } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

const viewPage = async (props: Props) => {
  const { id } = await props.params;
  const product = await getSingleProduct(id);
  // console.log(product?.thumbnail?.url);
  const productData = [
    { name: "id", item: product._id },
    { name: "title", item: product.title },
    { name: "price", item: product.price },
    { name: "category", item: product.category },
    { name: "stock", item: product.stock },
    { name: "rating", item: product.rating },
    { name: "brand", item: product.brand },
    { name: "warranty Information", item: product.warrantyInformation },
    { name: "shipping Information", item: product.shippingInformation },
    { name: "available Status", item: product.availableStatus },
    { name: "product Age", item: product.productAge },
    { name: "return Policy", item: product.returnPolicy },
    { name: "minimumOrder Quantity", item: product.minimumOrderQuantity },
    { name: "created At", item: product.createdAt },
  ];
  return (
    <div className="p-2 md:p-3 lg:p-4">
      {/* top */}
      <div className="w-full flex justify-between items-center ">
        <h1 className="text-muted-foreground">View Product Details</h1>
        <Link href={`/dashboard/products`}>
          <button>Back</button>
        </Link>
      </div>

      {/* product details */}

      <div className="w-full flex flex-col md:flex-row gap-3 mt-8">
        {/* left side */}
        <div className="w-1/2 flex flex-wrap gap-2 lg:gap-5">
          {productData.map((data, index) => (
            <div
              key={index}
              className=" w-fit px-4 py-2 capitalize border border-muted-foreground rounded flex items-center gap-4"
            >
              <h1>{data.name}:</h1>
              <p>{data.item}</p>
            </div>
          ))}
          <div className=" w-fit px-4 py-2 border border-muted-foreground rounded flex items-center gap-4">
            <h1>tags:</h1>
            {product?.tags ? (
              <ul className="flex items-center gap-2">
                {product.tags.map((tag: string, index: number) => (
                  <li key={index}>{tag}</li>
                ))}
              </ul>
            ) : (
              <p>null</p>
            )}
          </div>
        </div>
        {/* right side */}
        <div className="w-1/2 flex flex-col gap-2 lg:gap-4">
          <div className=" w-fit px-4 py-2 border border-muted-foreground rounded flex items-center gap-4">
            <h1>description:</h1>
            <p>{product.description}</p>
          </div>
          {/* image */}
          <div className=" w-full px-4 py-2 border border-muted-foreground rounded flex gap-4">
            <h1>Thumnail:</h1>
            {product?.thumbnail?.url ? (
              <Image
                src={product.thumbnail.url}
                alt={product.thumbnail.public_id}
                width={100}
                height={100}
              />
            ) : (
              <p>no thumbnail</p>
            )}
          </div>

          <div className=" w-full px-4 py-2 border border-muted-foreground rounded flex gap-2">
            <h1>Images:</h1>
            {product?.images && product.images.length > 0 ? (
              <div>
                {product.images.map(
                  (
                    image: { url: string; public_id: string },
                    index: number
                  ) => (
                    <div key={index}>
                      <Image
                        src={image.url}
                        alt={`Product image || ${image.public_id}`}
                        width={100}
                        height={100}
                      />
                    </div>
                  )
                )}
              </div>
            ) : (
              <p>no images</p>
            )}
          </div>
        </div>
      </div>
      {/* update button */}
      <div>
        <Link href={`/dashboard/products/${product._id}/update`}>
          <button>update</button>
        </Link>
      </div>
    </div>
  );
};

export default viewPage;
