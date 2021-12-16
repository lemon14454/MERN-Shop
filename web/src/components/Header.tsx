import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout, selectUser, togglePanel } from "../redux/user";
import {
  ShoppingCartIcon,
  LoginIcon,
  LogoutIcon,
  CogIcon,
  MenuIcon,
  XIcon,
  ArchiveIcon,
  UserAddIcon,
  DocumentSearchIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import Search from "./Search";
import { selectCart } from "../redux/cart";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const dispatch = useAppDispatch();
  const {
    login: { userInfo },
  } = useAppSelector(selectUser);
  const { CartItems } = useAppSelector(selectCart);

  const cartCount = (CartItems as any[]).reduce(
    (acc: number, item) => acc + item.qty,
    0
  );

  const LinkHandler = () => {
    setNavOpen(false);
  };

  return (
    <header className="flex bg-white p-4 items-center justify-between md:justify-around shadow sticky top-0 left-0 z-40">
      <Link to="/">
        <h3 className="font-bold text-sm md:text-2xl md:block">MERN Shop</h3>
      </Link>

      <div className="hidden md:block">
        <Search />
      </div>

      <div className="flex items-center justify-between gap-x-2">
        <Link to="/cart" className="nav-button relative">
          <ShoppingCartIcon className="h-4 w-4" />
          {cartCount > 0 && (
            <div className="flex justify-center items-center absolute -right-2 -bottom-1 rounded-full bg-green-400 text-white w-4 h-4 text-xs">
              {cartCount}
            </div>
          )}
        </Link>

        {userInfo ? (
          <>
            <button onClick={() => setNavOpen(!navOpen)}>
              <MenuIcon className="icon" />
            </button>

            <div
              className={`${
                navOpen ? "flex justify-end" : "hidden"
              } bg-[#000000b7] w-full absolute top-0 left-0 z-50`}
            >
              <div className="flex flex-col gap-y-2 bg-white p-3 w-[300px] h-screen sticky top-0">
                <div className="flex justify-between p-3 border-b-[1px] border-gray-400">
                  <h4 className="font-semibold text-xl">MERN SHOP</h4>

                  <button onClick={() => setNavOpen(false)}>
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="md:hidden my-2">
                  <Search />
                </div>
                <Link
                  onClick={LinkHandler}
                  to="/profile"
                  className="nav-button"
                >
                  個人資料
                  <CogIcon className="icon" />
                </Link>

                {userInfo?.isAdmin && (
                  <>
                    <Link
                      onClick={LinkHandler}
                      to="/admin/productlist"
                      className="nav-button"
                    >
                      商品管理
                      <ArchiveIcon className="icon" />
                    </Link>
                    <Link
                      onClick={LinkHandler}
                      to="/admin/orderlist"
                      className="nav-button"
                    >
                      訂單管理
                      <DocumentSearchIcon className="icon" />
                    </Link>
                    <Link
                      onClick={LinkHandler}
                      to="/admin/userlist"
                      className="nav-button"
                    >
                      會員管理
                      <UserAddIcon className="icon" />
                    </Link>
                  </>
                )}

                <button
                  className="nav-button"
                  onClick={() => {
                    dispatch(logout());
                    setNavOpen(false);
                  }}
                >
                  登出
                  <LogoutIcon className="icon" />
                </button>
              </div>
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
    </header>
  );
};

export default Header;

//  <header className="sticky z-40 top-0 w-full md:bg-white">
//   <div
//     className={`bg-bg gap-y-4 md:bg-transparent md:shadow-none md:container md:mx-auto flex flex-col md:flex-row p-5 md:items-center justify-between pt-[80px] md:pt-5 md:opacity-100 ${
//       navOpen ? "opacity-85 absolute right-0" : "opacity-0 hidden md:flex"
//     }`}
//   >

//     {/* 靠右的nav */}
//     <div className="flex flex-col md:flex-row gap-x-4 relative">
//       {userInfo && <h3 className="ml-3 mb-5">你好，{userInfo.name}</h3>}
//       <Link to="/cart" className="nav-button relative">
//         購物車
//         <ShoppingCartIcon className="icon" />
//         {cartCount > 0 && (
//           <div className="flex justify-center items-center absolute -right-2 -bottom-1 rounded-full bg-main text-white w-4 h-4 text-xs">
//             {cartCount}
//           </div>
//         )}
//       </Link>
//       {userInfo ? (
//         <>
//           <Link to="/profile" className="nav-button">
//             個人資料
//             <CogIcon className="icon" />
//           </Link>

//           {userInfo?.isAdmin && (
//             <>
//               <Link to="/admin/productlist" className="nav-button">
//                 商品管理
//                 <ArchiveIcon className="icon" />
//               </Link>
//               <Link to="/admin/orderlist" className="nav-button">
//                 訂單管理
//                 <DocumentSearchIcon className="icon" />
//               </Link>
//               <Link to="/admin/userlist" className="nav-button">
//                 會員管理
//                 <UserAddIcon className="icon" />
//               </Link>
//             </>
//           )}

//           <button
//             className="nav-button"
//             onClick={() => {
//               dispatch(logout());
//             }}
//           >
//             登出
//             <LogoutIcon className="icon" />
//           </button>
//         </>
//       ) : (
//         <button
//           className="nav-button"
//           onClick={() => dispatch(togglePanel("login"))}
//         >
//           登入
//           <LoginIcon className="icon" />
//         </button>
//       )}
//     </div>
//   </div>

//   {/* 手機版菜單 */}
//   <div
//     onClick={() => setNavOpen(!navOpen)}
//     className="border-[1px] p-2 bg-bg hover:bg-gray-200 cursor-pointer rounded-md absolute top-6 right-6 md:hidden"
//   >
//     <MenuIcon className="h-6 w-6" />
//   </div>
// </header>
