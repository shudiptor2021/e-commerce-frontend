"use client";

interface UserData {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
}

const AddReviewButton = ({ userData }: { userData: UserData | null }) => {
  console.log(userData);
  return <div></div>;
};

export default AddReviewButton;
