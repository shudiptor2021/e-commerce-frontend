"use client";
import { forgotPassword } from "@/app/actions/forgot-password/forgot";
import sideImage from "@/public/SideImage.jpg";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";



const ForgotPasswordPage = () => {
  const [state, action, ispending] = useActionState(forgotPassword, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      router.push("/reset-password");
      toast.success("If an account with this email exists, we will send you a reset link!");
    }
  }, [state, router]);

  return (
    <div className="container mx-auto px-6 pb-10 md:px-14 md:py-20 bg-white">
      <div className="w-full md:flex items-center justify-center gap-30">
        <div className="hidden md:block">
          <Image src={sideImage} alt="sideimage" width={600} height={600} />
        </div>
        {/* right side */}
        <div>
          {/* email */}
          <div className="w-full md:w-[370px] ">
            <form action={action} className="w-full h-full flex flex-col gap-8">
              <div className="space-y-2 md:space-y-4">
                <h1 className="text-2xl md:text-4xl text-black/90 font-semibold">
                  Forgot Password
                </h1>
                <p className="text-[12px] md:text-[16px] text-black/80 font-semibold">
                  Enter your Email 
                </p>
              </div>

              <div className="w-full ">
                <div className="flex items-center relative">
                  <input
                    type="text"
                    name="email"
                    className="w-full outline-none peer text-sm md:text-[18px] text-black/80 font-semibold duration-200 z-10"
                  />
                  <span className="absolute left-0 text-sm md:text-[18px] text-gray-400 peer-focus:text-sm peer-focus:-translate-y-5 duration-200 peer-user-valid:-translate-y-5  peer-valid:text-sm peer-valid:bg-white">
                    Email
                  </span>
                </div>
                <div className="w-full h-[1.5px] my-1 bg-gray-300 "></div>
              </div>

              {state?.error && (
                <p className="text-[12px] md:text-sm text-red-500 font-semibold ">
                  {state.error}
                </p>
              )}

              {/* submit button */}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-[145px] h-8 md:h-14 flex items-center justify-center text-md text-white bg-[#DB4444] hover:bg-[#DB5555] cursor-pointer rounded "
                >
                  Continue
                </button>
                <Link href="/login" className="text-sm md:text-[20px] text-[#065818] hover:underline underline-offset-4">
                  Back
                </Link>
              </div>
            </form>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
