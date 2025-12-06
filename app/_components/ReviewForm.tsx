"use client";

import { redirect } from "next/navigation";
import { useActionState } from "react";
import { createReview } from "../actions/review/createReview";

const ReviewForm = ({ id }: { id: string }) => {
  const [state, action, ispending] = useActionState(createReview, null);
  // useEffect(() => {
  if (state?.success) {
    redirect("/shop");
  }
  // }, []);
  return (
    <div>
      <form
        action={action}
        className="w-full md:w-[800px] h-fit p-3 md:p-8 text-[12px] md:text-[16px] shadow flex flex-col gap-1.5 md:gap-3 "
      >
        <input type="text" name="id" defaultValue={id} hidden />
        <div className="w-full flex flex-col gap-1 md:gap-2">
          <label
            htmlFor="reviewerName"
            className="text-sm md:text-[16px] font-semibold text-black/80"
          >
            Enter Your Name:
          </label>
          <input
            type="text"
            id="reviewerName"
            name="reviewerName"
            placeholder="Your Name*"
            className="w-full text-black/80 px-3 py-2 md:px-5 md:py-3 outline-none bg-gray-100 rounded"
          />

          {state?.errors && (
            <p className="text-sm text-red-500 py-1">
              {state.errors.reviewerName}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1 md:gap-2">
          <label
            htmlFor="reviewerEmail"
            className="text-sm md:text-[16px] font-semibold text-black/80"
          >
            Enter Your Email:
          </label>
          <input
            type="text"
            id="reviewerEmail"
            name="reviewerEmail"
            placeholder="example@gmail.com*"
            className="w-full text-black/80 px-3 py-2 md:px-5 md:py-3  outline-none bg-gray-100 rounded"
          />

          {state?.errors && (
            <p className="text-sm text-red-500 py-1">
              {state.errors.reviewerEmail}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-1 md:gap-2">
          <label
            htmlFor="rating"
            className="text-sm md:text-[16px] font-semibold text-black/80"
          >
            Add Your Rate Out of 5:
          </label>
          <input
            type="text"
            id="rating"
            name="rating"
            placeholder="1 to 5*"
            className="w-full text-black/80 px-3 py-2 md:px-5 md:py-3 outline-none bg-gray-100 rounded"
          />

          {state?.errors && (
            <p className="text-sm text-red-500 py-1">{state.errors.rating}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 md:gap-2">
          <label
            htmlFor="comment"
            className="text-sm md:text-[16px] font-semibold text-black/80"
          >
            Write Your Valuable Comment:
          </label>
          <textarea
            id="comment"
            name="comment"
            placeholder="Write your Comment"
            className="w-full h-[170px] md:h-52 text-black/80 px-3 py-2 md:px-5 md:py-3 outline-none bg-gray-100 rounded"
          />
          {state?.errors && (
            <p className="text-sm text-red-500 py-1">{state.errors.comment}</p>
          )}
        </div>
        <div className="w-full flex justify-end">
          <button
            type="submit"
            disabled={ispending}
            className="w-24 h-5 md:w-[215px] md:h-14 text-white text-[12px] md:text-[16px] font-semibold bg-[#DB4444] rounded flex items-center justify-center cursor-pointer"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
