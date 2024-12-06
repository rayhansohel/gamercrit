import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // Show a loading spinner or placeholder while determining auth state
      return;
    }

    if (!user) {
      // If the user is not logged in, store the current path in sessionStorage
      sessionStorage.setItem("redirectPath", window.location.pathname);
      navigate("/auth/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    // Show a loading spinner or placeholder while determining auth state
    return <div className="text-center">Loading...</div>;
  }

  // If user is authenticated, allow them to view the children (protected content)
  if (user) {
    return children;
  }

  // If user is not authenticated, they will be redirected by useEffect
  return null; // Or you can return a placeholder like a loading spinner
};

export default PrivateRoute;
