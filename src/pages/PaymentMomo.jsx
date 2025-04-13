import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getCart } from "../utils/cart";
import APIs from "../APIs";
import noti from "../common/noti";
import { useNavigate } from "react-router-dom";

function PaymentMomo() {
  const [qrUrl, setQrUrl] = useState("");
  const [payUrl, setPayUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = getCart();

    if (!cartData || cartData.length === 0) {
      noti.error("Giỏ hàng trống! Chuyển về trang chủ...");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    const total = cartData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const createPayment = async (amount, orderInfo) => {
      setLoading(true);
      try {
        const res = await APIs.createMomoPayment({ amount, orderInfo });
        console.log("Momo response:", res.data);

        const { qrCodeUrl, payUrl } = res.data;

        // ✅ In ra mã QR MoMo để kiểm tra
        console.log("Mã QR MoMo:", qrCodeUrl);

        if (qrCodeUrl && qrCodeUrl.startsWith("momo://")) {
          setQrUrl(qrCodeUrl);
          setPayUrl(payUrl);
        } else {
          noti.error("Không có QR hợp lệ từ MoMo.");
        }
      } catch (err) {
        noti.error("Không thể tạo thanh toán MoMo");
        console.error("Momo error:", err);
      } finally {
        setLoading(false);
      }
    };

    const orderInfo = `Thanh toán đơn hàng gồm ${cartData.length} sản phẩm`;
    createPayment(total, orderInfo);
  }, [navigate]);

  return (
    <div className="max-w-xl mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold mb-6 text-pink-600">
        Thanh toán bằng MoMo
      </h1>

      {loading ? (
        <p className="text-gray-500">Đang tạo mã QR...</p>
      ) : qrUrl ? (
        <>
          <p className="mb-4">
            Vui lòng quét mã QR bằng ứng dụng MoMo để thanh toán:
          </p>
          <div className="bg-white p-4 inline-block rounded shadow">
            <QRCodeCanvas value={qrUrl} size={256} />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Hoặc bấm vào link nếu không quét được:{" "}
            <a
              href={payUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Mở link thanh toán
            </a>
          </p>
        </>
      ) : (
        <p className="text-red-500">Không thể hiển thị mã QR.</p>
      )}
    </div>
  );
}

export default PaymentMomo;
