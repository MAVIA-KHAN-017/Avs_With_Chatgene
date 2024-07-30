
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { lazy } from "react";
import ThemedSuspense from "./utils/ThemedSuspense"

// Styling Files 
import "./App.css";
import "./styles/Dashboard.css";
import "./styles/Sidebar.css";
import "./styles/Receivable.css";
import "./styles/Chatbot.css";
import SalePage from "./pages/sale/SalePage";

const Page404 = lazy(() => import("./pages/404"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SignIn = lazy(() => import("./components/signin/signin"));
const Layout = lazy(() => import("./container/Layout"));
const StockPage = lazy(() => import("./pages/stock/StockPage"));
const ReceivablePage = lazy(() => import("./pages/receivable/ReceivablePage"));


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Page404 /> ,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "stock",
          element: <StockPage />,
        },
        {
          path: "receivable",
          element: <ReceivablePage />,
        },
        {
          path: "sale",
          element: <SalePage />,
        },
      ],
    },
    {
      path: "/login",
      element: <SignIn />,
    },
  ]);
  return (
    <React.Suspense fallback={<ThemedSuspense />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
