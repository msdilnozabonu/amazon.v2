import { Link } from "react-router-dom";
import { useState } from "react";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

export const AccountMenu = ({ userInfo, onSignOut }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="headerHover px-2 py-1 cursor-pointer select-none"
      >
        <div className="flex flex-col items-start justify-center">
          {userInfo ? (
            <>
              <p className="text-sm text-gray-100 font-medium">
                Hello, {userInfo.userName}
              </p>
              <p className="text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex">
                Account & Lists{" "}
                <span>
                  <ArrowDropDownOutlinedIcon />
                </span>
              </p>
            </>
          ) : (
            <>
              <p className="text-xs text-lightText font-light">Hello, sign in</p>
              <p className="text-sm font-semibold -mt-1 text-whiteText hidden mdl:inline-flex">
                Account & Lists{" "}
                <span>
                  <ArrowDropDownOutlinedIcon />
                </span>
              </p>
            </>
          )}
        </div>
      </div>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50 p-4">
          {!userInfo ? (
            <>
              <Link className="w-full text-black" to="/auth/signin">
                <button className="w-full bg-yellow-400 rounded-md py-1 font-semibold cursor-pointer hover:bg-yellow-500 active:bg-yellow-700">
                  Sign In
                </button>
              </Link>
              <p className="text-black text-xs mt-1">
                New Customer?
                <Link to="/auth/signup">
                  <span className="text-blue-600 ml-1 cursor-pointer hover:text-orange-600">
                    Start here.
                  </span>
                </Link>
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Hello, {userInfo.userName}
              </p>
              <Link to="/account">
                <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                  Your Account
                </p>
              </Link>
              <button
                onClick={onSignOut}
                className="mt-3 w-full bg-red-500 text-white py-1 text-sm rounded-md hover:bg-red-600"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
