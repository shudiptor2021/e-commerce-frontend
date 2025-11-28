"use client";

import { createUser } from "@/app/actions/signup/doSignup";
import sideImage from "@/public/SideImage.jpg";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const [state, action, ispending] = useActionState(createUser, null);

  const router = useRouter();
  useEffect(() => {
    // navigate on success: response has neither 'errors' nor 'error'
    if (state?.success) {
      router.push("/login");
    }
  }, [state, router]);

  return (
    <div className="container mx-auto px-6 pb-10 md:px-14 md:py-20 bg-white">
      <div className="w-full md:flex items-center justify-center gap-30">
        <div className="hidden md:block">
          <Image src={sideImage} alt="sideimage" width={600} height={600} />
        </div>
        {/* right side */}
        <div className="w-full h-[350px] md:w-[370px] md:h-[530px]  ">
          <form
            action={action}
            className="w-full h-full flex flex-col justify-between "
          >
            <div className="space-y-2 md:space-y-4">
              <h1 className="text-2xl md:text-4xl text-black/90 font-semibold">
                Create an account
              </h1>
              <p className="text-[12px] md:text-[16px] text-black/80 font-semibold">
                Enter your details below
              </p>
            </div>
            {/* name */}
            <div className="w-full ">
              <div className="flex items-center relative">
                <input
                  type="text"
                  name="name"
                  className="w-full outline-none peer text-sm md:text-[18px] text-black/80 font-semibold duration-200 z-10 "
                />
                <span className="absolute left-0 text-sm md:text-[18px] text-gray-400 peer-focus:text-sm peer-focus:-translate-y-5 duration-200 peer-user-valid:-translate-y-5  peer-valid:text-sm peer-valid:bg-white">
                  Name
                </span>
              </div>
              <div className="w-full h-[1.5px] my-1 bg-gray-300 "></div>
              {state?.errors && (
                <p className="text-sm text-red-500 py-1">{state.errors.name}</p>
              )}
            </div>
            {/* email */}
            <div className="w-full ">
              <div className="flex items-center relative">
                <input
                  type="text"
                  name="email"
                  className="w-full outline-none peer text-sm md:text-[18px] text-black/80 font-semibold duration-200 z-10 "
                />
                <span className="absolute left-0 text-sm md:text-[18px] text-gray-400 peer-focus:text-sm peer-focus:-translate-y-5 duration-200 peer-user-valid:-translate-y-5  peer-valid:text-sm peer-valid:bg-white">
                  Email
                </span>
              </div>
              <div className="w-full h-[1.5px] my-1 bg-gray-300 "></div>
              {state?.errors && (
                <p className="text-sm text-red-500 py-1">
                  {state.errors.email}
                </p>
              )}
            </div>

            {/* phone */}
            <div className="w-full ">
              <div className="flex items-center relative">
                <input
                  type="text"
                  name="phone"
                  className="w-full outline-none peer text-sm md:text-[18px] text-black/80 font-semibold duration-200 z-10 "
                />
                <span className="absolute left-0 text-sm md:text-[18px] text-gray-400 peer-focus:text-sm peer-focus:-translate-y-5 duration-200 peer-user-valid:-translate-y-5  peer-valid:text-sm peer-valid:bg-white">
                  Phone
                </span>
              </div>
              <div className="w-full h-[1.5px] my-1 bg-gray-300 "></div>
              {state?.errors && (
                <p className="text-sm text-red-500 py-1">
                  {state.errors.phone}
                </p>
              )}
            </div>
            {/* password */}
            <div className="w-full ">
              <div className="flex items-center relative">
                <input
                  type="password"
                  name="password"
                  className="w-full outline-none peer text-sm md:text-[18px] text-black/80 font-semibold duration-200 z-10 "
                />
                <span className="absolute left-0 text-sm md:text-[18px] text-gray-400 peer-focus:text-sm peer-focus:-translate-y-5 duration-200 peer-user-valid:-translate-y-5  peer-valid:text-sm peer-valid:bg-white">
                  Password
                </span>
              </div>
              <div className="w-full h-[1.5px] my-1 bg-gray-300 "></div>
              {state?.errors && (
                <p className="text-sm text-red-500 py-1">
                  {state.errors.password}
                </p>
              )}
            </div>
            {state?.error && (
              <p className="text-[12px] md:text-sm text-red-500 font-semibold ">
                {state.error}
              </p>
            )}

            {/* create button */}
            <div className="space-y-5">
              <button
                type="submit"
                className="w-full h-8 md:h-14 flex items-center justify-center text-sm md:text-[16px] text-white bg-[#DB4444] hover:bg-[#DB5555] cursor-pointer rounded "
              >
                Create Account
              </button>

              <button className="w-full h-8 md:h-14 flex items-center justify-center gap-3 border border-gray-700 text-sm md:text-[16px] text-black/90 cursor-pointer rounded ">
                <span>
                  <FcGoogle size={24} />
                </span>
                Sign up with Google
              </button>
            </div>

            <div className="w-full flex items-center justify-center gap-3">
              <p className="text-sm md:text-[16px] text-gray-600 ">
                Already have account?
              </p>
              <Link
                href="login"
                className="text-sm md:text-[16px] text-gray-700 underline underline-gray-400 underline-offset-6"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
