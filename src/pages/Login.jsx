import React, { useState } from "react";
import noti from "../common/noti"; // Thông báo lỗi hoặc thành công
import APIs from "../APIs"; // API cho login
import { useDispatch } from "react-redux"; // Dùng dispatch để quản lý trạng thái
import { authen, setRole } from "../reducers/UserReducer"; // Các action cho user
import { changeLoadingState } from "../reducers/SystemReducer"; // Thay đổi trạng thái loading
import { useNavigate } from "react-router-dom"; // Điều hướng trang
import { UserIcon, LockClosedIcon } from "@heroicons/react/solid"; // Icon cho username và password

function Login() {
  const navigate = useNavigate(); // Điều hướng trang
  const dispatch = useDispatch(); // Dùng dispatch để quản lý trạng thái

  // Các state cho email, mật khẩu
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Hàm đăng nhập
  const login = () => {
    if (username.trim() == "" || password.trim() == "")
      return noti.error("Username và mật khẩu không được để trống !!!");
    dispatch(changeLoadingState(true));
    APIs.login({ username: username.trim(), passwordHash: password.trim() })
      .then((res) => {
        dispatch(authen(res.data)); // Lưu thông tin người dùng vào Redux
        dispatch(setRole(res.data?.role)); // Lưu vai trò người dùng vào Redux\
        localStorage.setItem("user", JSON.stringify(res.data)); // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("token", res.data?.token); // Lưu token vào localStorage
        dispatch(changeLoadingState(false));

        if (res.data?.role == "Admin") navigate("/admin");
        else navigate("/");
        noti.success("Đăng nhập thành công", 2000);
      })
      .catch((err) => {
        noti.error(err?.response?.data?.message || "Đăng nhập thất bại", 2000);
        dispatch(changeLoadingState(false));
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md relative">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Đăng Nhập
        </h2>

        {/* Username */}
        <div className="relative mb-4">
          <UserIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <LockClosedIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={login}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Đăng Nhập
        </button>
      </div>
    </div>
  );
}

export default Login;
