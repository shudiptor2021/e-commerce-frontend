"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchMain from "./SearchMain";

const DesktopNavbar = ({
  NavItem,
}: {
  NavItem: { label: string; link: string }[];
}) => {
  // const [user, setUser] = useState(null);

  // active link
  const pathName = usePathname();

  // useEffect(() => {
  //   if (userId) {
  //     fetchUserProfile(userId).then(setUser);
  //   }
  // }, [userId]);
  // console.log(user);

  return (
    <div className="hidden container mx-auto h-16 md:flex items-center justify-between px-14">
      {/* logo */}
      <div>
        <Link href="/" className="text-lg text-black/80 font-bold">
          Dokan
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
        {/* {isAdmin && <li><Link href='/dashboard'>Dashboard</Link></li>} */}
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </ul>
      {/* authentication */}
      <div className="flex items-center gap-8">
        {/* search input and cart */}
        <SearchMain />

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
    </div>
  );
};

export default DesktopNavbar;
