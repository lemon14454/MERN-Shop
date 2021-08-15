import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectUser, togglePanel } from "../redux/user";
import {
  ShoppingCartIcon,
  ChevronDownIcon,
  LoginIcon,
  LogoutIcon,
  CogIcon,
  MenuIcon,
  ArchiveIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const dispatch = useAppDispatch();
  const {
    login: { userInfo },
  } = useAppSelector(selectUser);

  return (
    <header className="text-text absolute z-40 top-0 w-full md:bg-white md:border md:border-b-[1px] ">
      <div
        className={`bg-bg md:bg-transparent md:shadow-none md:container md:mx-auto flex flex-col md:flex-row p-5 md:items-center justify-between pt-[80px] md:pt-5 transition duration-300 md:opacity-100 ease-in-out ${
          navOpen ? "opacity-90 shadow-md " : "opacity-0 hidden md:flex"
        }`}
      >
        <Link to="/">
          <div className="font-bold text-main mb-6 md:mb-0">
            <span className="ml-3 text-2xl">MERN Shop</span>
          </div>
        </Link>

        {/* 靠右的nav */}
        <div className="flex flex-col md:flex-row gap-x-4 relative">
          <Link to="/cart" className="nav-button">
            購物車
            <ShoppingCartIcon className="icon" />
          </Link>
          {userInfo ? (
            <>
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="nav-button md:bg-transparent md:border-none"
              >
                {userInfo?.name}
                <ChevronDownIcon className="icon" />
              </button>
              <div
                onClick={() => {
                  setDropOpen(!dropOpen);
                  setNavOpen(!navOpen);
                }}
                className={`${
                  dropOpen ? "opacity-100" : "opacity-0 hidden"
                } transition duration-300 flex flex-col md:absolute md:top-6 md:right-0 md:w-[250px] md:bg-bg md:rounded-md md:p-4 md:shadow-lg md:border-gray-200 md:border ml-6 mt-3`}
              >
                <button className="nav-button">
                  個人資料
                  <CogIcon className="icon" />
                </button>
                {userInfo?.isAdmin && (
                  <Link to="/admin/productlist" className="nav-button">
                    商品管理
                    <ArchiveIcon className="icon" />
                  </Link>
                )}

                <button
                  className="nav-button"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  登出
                  <LogoutIcon className="icon" />
                </button>
              </div>
            </>
          ) : (
            <button
              className="nav-button"
              onClick={() => dispatch(togglePanel("login"))}
            >
              登入
              <LoginIcon className="icon" />
            </button>
          )}
        </div>
      </div>

      {/* 手機版菜單 */}
      <div
        onClick={() => setNavOpen(!navOpen)}
        className="border-[1px] p-2 bg-bg hover:bg-gray-200 cursor-pointer rounded-md absolute top-6 left-6 md:hidden"
      >
        <MenuIcon className="h-6 w-6" />
      </div>
    </header>
  );
};

export default Header;
