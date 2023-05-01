import { useCallback, useEffect, useState } from "react";
import { BsChevronDown, BsFillBellFill, BsSearch } from "react-icons/bs";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import Image from "next/image";

const TOP_OFFSET = 66;

type NavbarProps = {};
const Navbar = (props: NavbarProps) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // console.log(window.scrollY);
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      {/* flexbox */}
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        {/* logo */}
        {/* <img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" /> */}
        <div className="relative h-[28px] w-[103px]">
          <Image
            src={"/images/logo.png"}
            className="object-contain"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
            priority
          />
        </div>

        {/* navbar items */}
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" active />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>

        {/* mobile menu */}
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>

        {/* search, notification, account , profile menu*/}
        <div className="flex flex-row ml-auto gap-7 items-center">
          {/* icons */}
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch className="w-6" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsFillBellFill className="w-6" />
          </div>

          {/* account menu */}
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              {/* <img src="/images/default-blue.png" alt="" /> */}
              <div className="relative  w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                <Image
                  src={"/images/default-blue.png"}
                  className="object-contain"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  priority
                />
              </div>
            </div>
            <BsChevronDown
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
