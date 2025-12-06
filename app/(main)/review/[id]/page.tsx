import ReviewForm from "@/app/_components/ReviewForm";

const reviewPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="container mx-auto px-2 md:px-14 bg-white pb-10 md:py-20 flex justify-center items-center">
      <ReviewForm id={id} />
    </div>
  );
};

export default reviewPage;
