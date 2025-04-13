import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import APIs from "../APIs";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const { paramName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const { categoryId, categoryTitle } = location.state || {}; // Lấy categoryId và categoryTitle từ state của location

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top khi load trang
  }, []);

  useEffect(() => {
    if (!categoryId) {
      // Nếu không có categoryId thì redirect về trang chủ hoặc thông báo lỗi
      navigate("/", { replace: true });
      return;
    }

    APIs.getProductByCategory(categoryId)
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Lỗi khi tải sản phẩm:", err);
      });
  }, [categoryId, navigate]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Danh sách {categoryTitle || paramName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Không có sản phẩm nào.
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
