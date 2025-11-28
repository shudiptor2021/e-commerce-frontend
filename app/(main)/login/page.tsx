"use client";
import { doLogin } from "@/app/actions/login/doLogin";
import sideImage from "@/public/SideImage.jpg";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

const LogInPage = () => {
  const [state, action, ispending] = useActionState(doLogin, null);
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      router.push("/");
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
                  Log in to Exclusive
                </h1>
                <p className="text-[12px] md:text-[16px] text-black/80 font-semibold">
                  Enter your details below
                </p>
              </div>

              <div className="w-full ">
                <div className="flex items-center relative">
                  <input
                    type="text"
                    name="username"
                    className="w-full outline-none peer text-sm md:text-[18px] text-black/80 font-semibold duration-200 z-10"
                  />
                  <span className="absolute left-0 text-sm md:text-[18px] text-gray-400 peer-focus:text-sm peer-focus:-translate-y-5 duration-200 peer-user-valid:-translate-y-5  peer-valid:text-sm peer-valid:bg-white">
                    Email or Phone
                  </span>
                </div>
                <div className="w-full h-[1.5px] my-1 bg-gray-300 "></div>
              </div>
              {/* password */}
              <div className="flex flex-col gap-6">
                <h1 className="text-[12px] md:text-[16px] text-black/80 font-semibold">
                  Enter your password
                </h1>

                <div className="w-full ">
                  <div className="flex items-center relative">
                    <input
                      type="text"
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
                <button className="text-sm md:text-[16px] text-[#DB4444]">
                  Forgot password?
                </button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-[370px] mt-7 space-y-3">
            {/* google */}
            <div className="w-full h-8 md:h-14 flex items-center justify-center gap-3 border border-gray-700 text-sm md:text-[16px] text-black/90 cursor-pointer rounded ">
              <span>
                <FcGoogle size={24} />
              </span>
              Log in with Google
            </div>
            {/* sign up */}
            <div className="w-full flex items-center justify-center gap-3">
              <p className="text-sm md:text-[16px] text-gray-600 ">
                Didn't have account?
              </p>
              <Link
                href="signup"
                className="text-sm md:text-[16px] text-gray-700 underline underline-gray-400 underline-offset-6"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
