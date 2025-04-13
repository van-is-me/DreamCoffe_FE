import React from "react";
import noti from "../common/noti";
import { addToCart } from "../utils/cart";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all flex flex-col justify-between">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="text-blue-600 font-bold text-base mb-2">
          {product.price.toLocaleString()}₫
        </div>
      </div>

      <button
        onClick={() => {
          addToCart(product);
          noti.success(`Đã thêm ${product.name} vào giỏ hàng`);
        }}
        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      >
        Mua hàng
      </button>
    </div>
  );
}

export default ProductCard;
