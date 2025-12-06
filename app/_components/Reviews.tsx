"use client";
import Link from "next/link";
import { useState } from "react";
import { MdVerifiedUser } from "react-icons/md";
import Rating from "./Rating";

interface Review {
  rating: number;
  comment: string;
  reviewerName: string;
  _id: string;
}

interface ReviewsProps {
  product: any;
  userData: UserData | null;
}

interface UserData {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
}

const Reviews = ({ product, userData }: ReviewsProps) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const handleCommentOpenClose = () => {
    setCommentOpen(!commentOpen);
  };
  return (
    <div className=" flex flex-col gap-2.5 md:gap-4">
      <div className="flex justify-between border-t border-b py-2 md:py-3">
        <h1 className="text-[16px] md:text-xl text-black/60 font-semibold ">
          Product Reviews
        </h1>
        <button className="text-[15px] md:text-[18px] text-green-700 underline">
          <Link href={userData ? "/review/" + product._id : "/login"}>
            {" "}
            Add Review
          </Link>
        </button>
      </div>
      {/* reviews */}
      <div
        className={`flex flex-col gap-1.5 md:gap-2 h-36 md:h-44 overflow-hidden ${
          commentOpen ? "h-fit md:h-fit" : ""
        }`}
      >
        {product?.reviews?.length > 0 ? (
          product?.reviews?.map((review: Review) => (
            <div key={review._id} className="flex flex-col gap-1 border-b pb-2">
              <h2 className="text-[12px] md:text-[15px] text-gray-500 flex items-center gap-3">
                {review.reviewerName}{" "}
                <span className="text-green-700 flex items-center gap-1">
                  <MdVerifiedUser size={18} /> Verified Purchase
                </span>
              </h2>
              <Rating rating={review.rating} />
              <h1 className="text-[16px] md:text-xl font-semibold">
                {review.comment}
              </h1>
            </div>
          ))
        ) : (
          <div>
            <h1 className="text-[16px] md:text-xl font-semibold">
              No Reviews!
            </h1>
          </div>
        )}
      </div>
      {product?.reviews?.length > 2 && (
        <button
          className="text-[12px] md:text-sm text-gray-500 cursor-pointer"
          onClick={handleCommentOpenClose}
        >
          {commentOpen ? <>Less more...</> : <>See more...</>}
        </button>
      )}
    </div>
  );
};

export default Reviews;
