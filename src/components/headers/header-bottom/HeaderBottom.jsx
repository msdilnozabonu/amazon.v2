import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { SideNavContent } from "@/components/headers/side-nav";

export const HeaderBottom = ({ userInfo }) => {
  const ref = useRef();
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li
          onClick={() => setSidebar(true)}
          className="headerHover flex items-center gap-1 cursor-pointer"
        >
          <MenuIcon />
          All
        </li>
        <li className="headerHover hidden md:inline-flex">Today's Deals</li>
        <li className="headerHover hidden md:inline-flex">Customer Service</li>
        <li className="headerHover hidden md:inline-flex">Gift Cards</li>
        <li className="headerHover hidden md:inline-flex">Registry</li>
        <li className="headerHover hidden md:inline-flex">Sell</li>
      </ul>

      {sidebar && (
        <div className="fixed inset-0 bg-amazon_blue bg-opacity-50 text-black z-50">
          <div className="w-full h-full relative flex">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-[57%] md:w-[350px] h-full bg-white shadow-lg"
            >
              <div className="w-full bg-amazon_light text-white py-3 px-6 flex items-center gap-4">
                {userInfo?.image ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={userInfo.image}
                    alt="User"
                  />
                ) : (
                  <AccountCircleIcon />
                )}
                <h3 className="font-titleFont font-bold text-lg tracking-wide">
                  {userInfo?.userName || "Hello, Sign In"}
                </h3>
              </div>

              <SideNavContent
                title="Digital Content & Devices"
                one="Amazon Music"
                two="Kindle E-readers & Books"
                three="Amazon Appstore"
              />
              <SideNavContent
                title="Shop By Department"
                one="Electronics"
                two="Computers"
                three="Smart Home"
              />
              <SideNavContent
                title="Programs & Features"
                one="Gift Cards"
                two="Amazon Live"
                three="International Shopping"
              />
              <SideNavContent
                title="Help & Settings"
                one="Your Account"
                two="Customer Service"
                three="Contact Us"
              />
            </motion.div>

            <span
              onClick={() => setSidebar(false)}
              className="cursor-pointer absolute top-4 left-[60%] md:left-[360px] w-10 h-10 text-black flex items-center justify-center border bg-gray-200 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              <CloseIcon />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderBottom;
