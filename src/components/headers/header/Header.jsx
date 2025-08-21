import { useRef, useEffect, useState } from 'react'
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import {logo} from "@/assets"
import { allItems } from '@/constants';
import { HeaderBottom } from '@/components/headers/header-bottom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { userSignOut } from '../../../redux/amazonSlice';
import {AccountMenu} from '@/components/headers/account-menu';

export const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
    const [showAll, setShowAll] = useState(false)
    const products = useSelector((state) => state.amazon.products)
    const userInfo = useSelector((state) => state.amazon.userInfo)
    console.log(products)
    console.log(userInfo)
    const ref = useRef()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                showAll && setShowAll(false);
            }
        };

        document.body.addEventListener("click", handleClickOutside);
        
        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [ref, showAll]);

    const handleLogout=()=>{
      signOut(auth)
      .then(() => {
        console.log("Signed Out Successfully!");
        dispatch(userSignOut())
    })
    .catch((error) => {
      console.log(error)
    });
    }
   
    return (
        <div className='w-full sticky top-0 z-50'>
            <div className="w-full bg-amazon_blue text-white px-4 py-3 flex items-center gap-4">
                <Link to='/'>
                    <div className="headerHover">
                        <img className="w-24 mt-2" src={logo} alt="logo" />
                    </div>
                </Link>
                
                <div className="headerHover flex-row hidden mdl:inline-flex">
                    <LocationOnOutlinedIcon />
                    <p className="text-sm text-lightText font-light flex flex-col">
                        Deliver to{" "}
                        <span className="text-sm font-semibold -mt-1 text-whiteText">
                            Oman
                        </span>
                    </p>
                </div>
                
                <div className="h-10 rounded-md hidden lgl:flex flex-grow relative">
                    <span
                        onClick={() => setShowAll(!showAll)}
                        className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
                    >
                        All <span></span>
                        <ArrowDropDownOutlinedIcon />
                    </span>
                    {showAll && (
                        <div>
                            <ul ref={ref} className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex flex-col gap-1 z-50">
                                {allItems.map((item) => (
                                    <li
                                        className="text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparent hover:border-b-amazon_blue cursor-pointer duration-200"
                                        key={item._id}
                                    >
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <input
                        className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
                        type="text"
                        placeholder="Search Amazon"
                    />
                    <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
                        <SearchIcon />
                    </span>
                </div>

                
                <AccountMenu userInfo={userInfo} onSignOut={handleLogout} />

                <div className="hidden lgl:flex flex-col items-start justify-center headerHover">
                    <p className="text-xs text-lightText font-light">Returns</p>
                    <p className="text-sm font-semibold -mt-1 text-whiteText">& Orders</p>
                </div>
                
                <Link className='text-white' to='/cart'>
                    <div className="flex items-start justify-center headerHover relative">
                        <ShoppingCartIcon />
                        <p className="text-xs font-semibold mt-3 text-whiteText">
                            Cart 
                            <span className='absolute text-xs -top-1 left-6 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center'>
                                {products.length > 0 ? products.length : 0}
                            </span>
                        </p>
                    </div>
                </Link>
                {userInfo && (
                    <div onClick={handleLogout} className="flex flex-col justify-center items-center headerHover relative">
                        <LogoutIcon />
                        <p className="hidden mdl:inline-flex text-xs font-semibold text-whiteText">
                            Log out
                        </p>
                    </div>
                )}
            </div>
            <HeaderBottom userInfo={userInfo} />

        </div>
    );
}

export default Header