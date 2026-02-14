"use client";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import ModalMenu from "./ModalMenu";
import TopNavbar from "./TopNavbar";

const NavItem = [
  { link: "/", label: "Home" },
  { link: "/contact", label: "Contact" },
  { link: "/about", label: "About" },
];

interface UserData {
  _id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
}

const Navbar = ({ userData }: { userData: UserData | null }) => {
  // console.log(userData);
  return (
    <div className="w-full md:h-28 border border-gray-300">
      {/* upper nav */}
      <TopNavbar />
      {/* main navbar */}
      <DesktopNavbar NavItem={NavItem} userData={userData!} />
      <MobileNavbar NavItem={NavItem} userData={userData!} />
      <ModalMenu />
    </div>
  );
};

export default Navbar;
