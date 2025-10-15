import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Kategoriler from "./pages/categories";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import BanaOzel from "./pages/BanaOzel";
import Arama from "./pages/Arama";

import "./index.css";

// 🔸 Router yapısı (v7 future flag’leriyle)
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/kategoriler", element: <Kategoriler /> },
        { path: "/ilan-ver", element: <NewListing /> },
        { path: "/giris", element: <Login /> },
        { path: "/bana-ozel", element: <BanaOzel /> },
        { path: "/arama", element: <Arama /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// 🔸 Service Worker kaydı (senin sisteminle eşleşen versiyon)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js?v=28")
      .then((reg) => console.log("SW registered:", reg.scope))
      .catch((err) => console.log("SW registration failed:", err));
  });
}
