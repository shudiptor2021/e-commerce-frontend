"use client";
import { useToggleMenu } from "@/context/NavbarToggleContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import SearchMain from "./SearchMain";
import SearchRaise from "./SearchRaise";

const MobileNavbar = ({
  NavItem,
}: {
  NavItem: { label: string; link: string }[];
}) => {
  const { mobileMenuOpen, setMobileMenuOpen } = useToggleMenu();
  // const [isActive, setIsActive] = useState();

  // disable modal when scroll attempts
  useEffect(() => {
    const handleScrollAttempt = (e: Event) => {
      e.preventDefault();
      // close modal on scroll
      setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      window.addEventListener("wheel", handleScrollAttempt, { passive: false });
      window.addEventListener("touchmove", handleScrollAttempt, {
        passive: false,
      });
    }
    return () => {
      window.removeEventListener("wheel", handleScrollAttempt);
      window.removeEventListener("touchmove", handleScrollAttempt);
    };
  }, [mobileMenuOpen]);

  // active link
  const pathName = usePathname();

  return (
    <section className=" container mx-auto">
      <div className="w-full px-3">
        <div className=" flex items-center justify-between py-2 md:hidden">
          {/* logo */}
          <div>
            <Link href="/" className="text-md font-bold">
              Dokan
            </Link>
          </div>
          {/* buttons */}
          <div className="flex items-center gap-4">
            {/* search input and cart */}
            <SearchMain />
            {/* menu toggle button */}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer w-8 flex items-center justify-center "
            >
              {mobileMenuOpen ? (
                <FaTimes size={20} />
              ) : (
                <FaBarsStaggered size={20} />
              )}
            </button>
          </div>
        </div>
        {/* search field */}
        <div className=" w-full pb-2 md:hidden">
          <SearchRaise />
        </div>
      </div>

      {/* mobile menu items */}
      <div
        className={`fixed left-0 top-[106px] bg-white z-50 w-[50%] h-screen p-8 shadow-md md:hidden transform transition-all ease-in-out duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <ul className="w-full ">
          {NavItem.map((item, index) => (
            <li
              key={index}
              className={`w-full px-5 py-2 rounded-sm hover:bg-gray-100 ${
                pathName === item.link ? "bg-gray-100" : ""
              }`}
            >
              <Link href={item.link} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* authentication */}
        <div className="flex flex-col gap-2 pt-2 justify-start items-start px-5 ">
          {/* <SignedOut>
            <button
              className={`${
                pathName === "/login"
                  ? "text-black underline underline-offset-6"
                  : "text-gray-500 hover:text-black"
              } text-[14px] font-semibold`}
            >
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Log In</Link>
            </button>
            <button
              className={`${
                pathName === "/signup"
                  ? "text-black underline underline-offset-6"
                  : "text-gray-500 hover:text-black"
              } text-[14px] font-semibold`}
            >
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
        </div>
      </div>
    </section>
  );
};

export default MobileNavbar;
