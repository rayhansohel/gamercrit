import { createBrowserRouter } from "react-router-dom";
import App from "../App";
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

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "/reviews/:id",
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
      {
        path: "auth/login",
        element: <LoginPage />,
      },
      {
        path: "auth/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default Routes;
