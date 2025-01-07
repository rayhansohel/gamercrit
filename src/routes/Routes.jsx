import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import AllReviewsPage from './../pages/AllReviewsPage';
import AddReviewPage from '../pages/AddReviewPage';
import MyReviewsPage from './../pages/MyReviewsPage';
import GameWatchListPage from './../pages/GameWatchListPage';
import ReviewDetailPage from './../pages/ReviewDetailPage';
import UpdateReviewPage from './../pages/UpdateReviewPage';
import AboutPage from "../pages/AboutPage";
import ContactUsPage from "../pages/ContactUsPage";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/reviews",
        element: <AllReviewsPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactUsPage />,
      },
      {
        path: "/add-review",
        element: (
          <PrivateRoute>
            <AddReviewPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviewsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/review/:id",
        element: <ReviewDetailPage />,
      },
      {
        path: "/update-review/:id",
        element: (
          <PrivateRoute>
            <UpdateReviewPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <PrivateRoute>
            <GameWatchListPage />
          </PrivateRoute>
        ),
      },
    ],
  },


//Auth route
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default Routes;