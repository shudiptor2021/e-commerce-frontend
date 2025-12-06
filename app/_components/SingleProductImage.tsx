"use client";
import Image from "next/legacy/image";
import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

interface Item {
  product: any; // Replace 'any' with a specific type for your product if available
}

interface Image {
  url: string;
  public_id: string;
  _id: string;
}

const SingleProductImage = ({ product }: Item) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // console.log(product?.images)
  return (
    <div className="w-full md:w-[700px] md:h-[350px] flex flex-col-reverse md:flex-row gap-4 md:gap-8">
      {/* vertical thumbnail */}
      <div className="flex flex-row md:flex-col gap-4">
        {product?.images?.map((image: Image, index: number) => (
          <div
            key={image._id}
            onClick={() => setSelectedIndex(index)}
            className={`w-12 h-12 md:w-20 md:h-20 overflow-hidden rounded border cursor-pointer ${
              selectedIndex === index ? " border-[#DB4444]" : "border-gray-300"
            } `}
          >
            <Image
              src={image.url}
              alt="product id"
              width={80}
              height={80}
              objectFit="cover"
            />
          </div>
        ))}
      </div>

      {/* main carousel */}
      <div className="w-full h-[300px] md:w-[500px] md:h-[350px] overflow-hidden">
        <Carousel
          selectedItem={selectedIndex}
          onChange={setSelectedIndex}
          showArrows={false}
          showThumbs={false}
          autoPlay={false}
          showStatus={false}
          showIndicators={false}
        >
          {product?.images?.map((image: Image) => (
            <div key={product.id} className=" ">
              <Image
                src={image.url}
                alt={`Product image `}
                width={300}
                height={300}
                className="object-contain "
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SingleProductImage;
