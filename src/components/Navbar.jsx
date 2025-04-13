import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import menus from "../common/menu";
import { UserIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { getCart } from "../utils/cart"; // 🛒 import từ utils

function Navbar() {
  const menuItems = menus.mainMenu();
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };

    window.addEventListener("cartUpdated", updateCartCount);

    updateCartCount();
    window.addEventListener("storage", updateCartCount);

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <div className="navbar bg-base-100 shadow sticky top-0 z-50">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          ☕ Dream Coffee
        </Link>
      </div>

      {/* Menu chính */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              {item.childs.length > 0 ? (
                <details>
                  <summary>{item.title}</summary>
                  <ul className="p-2 bg-base-100 rounded-box shadow">
                    {item.childs.map((child, childIdx) => (
                      <li key={childIdx}>
                        {child.params.length > 0 ? (
                          <details>
                            <summary>{child.title}</summary>
                            <ul className="p-2 bg-base-100 shadow rounded-box">
                              {child.params.map((param, paramIdx) => (
                                <li key={paramIdx}>
                                  <Link
                                    to={`/menu/${child.pathName}/${param.paramName}`}
                                    state={{
                                      categoryId: param.categoryId,
                                      categoryTitle: param.title,
                                    }}
                                  >
                                    {param.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </details>
                        ) : (
                          <Link to={`/${item.pathName}/${child.pathName}`}>
                            {child.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link to={`/${item.pathName}`}>{item.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Phần bên phải */}
      <div className="navbar-end hidden lg:flex space-x-4 items-center">
        {/* Giỏ hàng */}
        <button
          onClick={() => navigate("/cart")}
          className="relative btn btn-ghost btn-circle"
        >
          <ShoppingCartIcon className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {/* Đăng nhập / Avatar */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.image}
                  alt="User Avatar"
                  className="object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="pointer-events-none text-center font-semibold">
                {user.fullName}
              </li>
              <li className="text-xs text-center text-gray-500 pointer-events-none">
                {user.username} - {user.role}
              </li>
              <div className="divider my-1" />
              <li>
                <a onClick={handleLogout} className="text-red-500">
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-gray-500 hover:text-gray-800 flex items-center gap-1"
          >
            <UserIcon className="w-5 h-5" />
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
