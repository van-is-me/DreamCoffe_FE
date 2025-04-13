import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./store.js"; //chứa tất cả trạng thái của ứng dụng được quản lý bởi Redux.
import { Provider } from "react-redux"; //cung cấp store cho ứng dụng React, cho phép các component truy cập vào trạng thái và hành động của Redux.
import { BrowserRouter } from "react-router-dom"; //cung cấp khả năng định tuyến cho ứng dụng React, cho phép điều hướng giữa các trang mà không cần tải lại trang.
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
