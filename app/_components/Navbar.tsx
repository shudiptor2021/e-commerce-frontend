// "use client";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import ModalMenu from "./ModalMenu";
import TopNavbar from "./TopNavbar";

const NavItem = [
  { link: "/", label: "Home" },
  { link: "/contact", label: "Contact" },
  { link: "/about", label: "About" },
];

const Navbar = async () => {
  return (
    <div className="w-full md:h-28 border border-gray-300">
      {/* upper nav */}
      <TopNavbar />
      {/* main navbar */}
      <DesktopNavbar NavItem={NavItem} />
      <MobileNavbar NavItem={NavItem} />
      <ModalMenu />
    </div>
  );
};

export default Navbar;
