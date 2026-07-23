"use client";

import { resetPassword } from "@/app/actions/reset-password/reset";

import sideImage from "@/public/SideImage.jpg";
import Image from "next/legacy/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const ResetPage = () => {
  const [state, action, ispending] = useActionState(resetPassword, null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  console.log(token);

  useEffect(() => {
    if (state?.success) {
      router.push("/login");
      toast.success("Password reset successfully! You can login now!");
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
                  Reset Password
                </h1>
                <p className="text-[12px] md:text-[16px] text-black/80 font-semibold">
                  Enter your new password
                </p>
              </div>

              <div className="w-full ">
                <input
                  type="text"
                  name="token"
                  hidden
                  value={token || ""}
                  readOnly
                  className="w-full outline-none peer text-sm md:text-[18px] text-black/80 font-semibold duration-200 z-10"
                />
              </div>
              {/* password */}
              <div className="flex flex-col gap-6">
                <div className="w-full ">
                  <div className="flex items-center relative">
                    <input
                      type="password"
                      name="password"
                      className="w-full outline-none peer text-sm md:text-[18px] text-black/80 font-semibold duration-200 z-10"
                    />
                    <span className="absolute left-0 text-sm md:text-[18px] text-gray-400 peer-focus:text-sm peer-focus:-translate-y-5 duration-200 peer-user-valid:-translate-y-5  peer-valid:text-sm peer-valid:bg-white">
                      Password
                    </span>
                  </div>
                  <div className="w-full h-[1.5px] my-1 bg-gray-300 "></div>
                </div>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
