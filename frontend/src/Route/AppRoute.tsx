import { createBrowserRouter, RouterProvider } from "react-router";

import PublicLayout from "../layout/PublicLayout.tsx";
import SellerLayout from "../layout/SellerLayout.tsx";

// Public Pages
import Home from "../pages/Home.tsx";
import Listings from "../pages/Listings.tsx";
import ListingDetails from "../pages/ProductDetails.tsx";
import Login from "../pages/Loginpage.tsx";
import Register from "../pages/Register.tsx";

// Seller Pages
import Dashboard from "../pages/Seller/Dashboard.tsx";
import AddListing from "../pages/Seller/AddListing.tsx";
import EditListing from "../pages/Seller/EditListing.tsx";
import MyListings from "../pages/Seller/MyListings.tsx";
import Categories from "../pages/Categories.tsx";
import loader from "./loader.tsx";
import productDetailsLoader from "./productDetailsLoader.tsx";
import ProtectedRoute from "../components/ProtectedRoute.tsx";


export const router = createBrowserRouter([
  // Public Routes
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/listings",
        element: <Listings />,
         loader: loader,
      },
      {
        path: "/listings/:id",
        element: <ListingDetails />,
         loader: productDetailsLoader,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path:"/category",
        element:<Categories/>
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  // Seller Routes
  {
  element: <ProtectedRoute />,
  children: [
    {
      element: <SellerLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/mylistings",
          element: <MyListings />,
        },
        {
          path: "/listings/add",
          element: <AddListing />,
        },
        {
          path: "/listings/:id/edit",
          element: <EditListing />,
        },
      ],
    },
  ],
},
]);




 const AppRoute = () => {
    return <RouterProvider router={router} />;
}

export default AppRoute;

