"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchMain from "./SearchMain";
import UserProfile from "./UserProfile";
import Image from "next/image";
import logo from "@/public/ecommerce.png"

interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
}

const DesktopNavbar = ({
  NavItem,
  userData,
}: {
  NavItem: { label: string; link: string }[];
  userData: User | null;
}) => {
  // active link
  const pathName = usePathname();
  return (
    <div className="hidden container mx-auto h-16 md:flex items-center justify-between px-14">
      {/* logo */}
      <div>
        <Link href="/" className="flex gap-2 items-center">
          
          <Image src={logo} alt="logo" className="h-8 w-8"/>
          <span className="text-lg text-black/80 font-bold ">Dokan</span>
        </Link>
      </div>
      {/* nav items for desktop */}
      <ul className="hidden md:flex items-center gap-12">
        {NavItem.map((item, index) => {
          // const isActive= pathName.startsWith(item.link);
          return (
            <li
              key={index}
              className={` text-[16px] font-semibold  ${
                pathName === item.link
                  ? "text-black underline underline-offset-4"
                  : "text-gray-500"
              } `}
            >
              <Link href={item.link}>{item.label}</Link>
            </li>
          );
        })}
        {userData?.role === "admin" && (
          <li className="text-blue-500 font-bold shadow bg-blue-300 rounded px-2 py-0.5">
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
      {/* authentication */}
      <div className="flex items-center gap-8">
        {/* search input and cart */}
        <SearchMain />

        {/* auth button */}
        {userData ? (
          <UserProfile userData={userData} />
        ) : (
          <div className="flex items-center gap-8">
            <button
              className={`${
                pathName === "/login"
                  ? "text-black underline underline-offset-6"
                  : "text-gray-500 hover:text-black"
              } text-[16px] font-bold`}
            >
              <Link href="/login">Log In</Link>
            </button>
            <button
              className={`${
                pathName === "/signup"
                  ? "text-black underline underline-offset-6"
                  : "text-gray-500 hover:text-black"
              } text-[16px] font-bold`}
            >
              <Link href="/signup">Sign Up</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNavbar;
