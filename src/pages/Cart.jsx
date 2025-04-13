import React, { useEffect, useState } from "react";
import { getCart, saveCart } from "../utils/cart";
import { TrashIcon } from "@heroicons/react/solid";
import noti from "../common/noti";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Lấy giỏ hàng khi component mount hoặc khi cart được cập nhật
  useEffect(() => {
    const syncCart = () => setCart(getCart());

    syncCart();

    window.addEventListener("storage", syncCart);
    window.addEventListener("cartUpdated", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("cartUpdated", syncCart);
    };
  }, []);

  const updateCartAndNotify = (updatedCart, message = null) => {
    setCart(updatedCart);
    saveCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated")); // cập nhật giỏ hàng ở navbar
    if (message) noti.success(message);
  };

  const handleQuantityChange = (productId, amount) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
        : item
    );
    updateCartAndNotify(updatedCart);
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    updateCartAndNotify(updatedCart, "Đã xoá sản phẩm khỏi giỏ hàng!");
  };

  const handleClearCart = () => {
    updateCartAndNotify([], "Đã xoá toàn bộ giỏ hàng!");
  };

  const handlePayment = () => {
    navigate("/payment-momo");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        🛒 Giỏ hàng của bạn
      </h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Không có sản phẩm nào trong giỏ hàng.
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="text-blue-600 font-semibold">
                  {(item.price * item.quantity).toLocaleString()}₫
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 text-sm flex items-center gap-1 mt-2"
                >
                  <TrashIcon className="w-4 h-4" />
                  Xoá
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-xl text-green-600 mt-4">
            Tổng cộng: {totalPrice.toLocaleString()}₫
          </div>

          <div className="text-right mt-4 space-x-4">
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Xoá toàn bộ giỏ hàng
            </button>

            <button
              onClick={handlePayment}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Thanh toán bằng MoMo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
