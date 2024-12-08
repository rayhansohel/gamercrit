import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useContext, useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";


const LoginForm = () => {
  const { userLogin, setUser, signInWithGoogle, user } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      // If user is already logged in, redirect to home page
      navigate("/");
    }
  }, [user, navigate]);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login with Google successful!", {
          position: "bottom-right",
          hideProgressBar: true,
        });
        window.location.reload();
        // Check if there's a redirect path saved in localStorage
        const redirectTo = localStorage.getItem("redirectTo");
        if (redirectTo) {
          localStorage.removeItem("redirectTo");
          navigate(redirectTo); // Redirect to the saved path
        } else {
          navigate("/"); // Redirect to home if no saved path
        }
      })
      .catch(() => {
        toast.error("Google sign-in failed. Try again!", {
          position: "bottom-right",
          hideProgressBar: true,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login successful!", {
          position: "bottom-right",
          hideProgressBar: true,
        });
        window.location.reload();
        
        // Check if there's a redirect path saved in localStorage
        const redirectTo = localStorage.getItem("redirectTo");
        if (redirectTo) {
          localStorage.removeItem("redirectTo");
          navigate(redirectTo); // Redirect to the saved path
        } else {
          navigate("/"); // Redirect to home if no saved path
        }
      })
      .catch(() => {
        toast.error("Put valid email and password", {
          position: "bottom-right",
          hideProgressBar: true,
        });
      });
  };

  return (
    <div>
      <div className="card min-w-[350px] bg-base-200 border border-base-100 rounded-3xl flex flex-col items-center justify-center pt-12">
        <div>
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn btn-sm bg-base-100 shadow-none"
          >
            <FcGoogle className="text-lg" />
            <span>Login with Google</span>
          </button>
        </div>
        <div className="flex w-full flex-col px-9 mt-4 -mb-4">
          <div className="divider">OR</div>
        </div>
        <form onSubmit={handleSubmit} className="card-body w-full space-y-2">
          <div className="form-control">
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email address"
              className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none bg-base-300"
              required
            />
          </div>
          <div className="form-control relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none bg-base-300"
              required
            />
            <span
              className="absolute right-2 top-[7px] cursor-pointer hover:text-pink-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
          </div>
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-sm bg-pink-600 hover:bg-pink-700"
            >
              <span>Login</span>
            </button>
          </div>
          <div className="text-sm text-center">
            <p>
              Don't Have An Account?{" "}
              <Link
                to="/auth/register"
                className="font-semibold text-red-700 hover:text-red-600"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
