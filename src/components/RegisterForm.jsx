import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../contexts/AuthContext";

const RegisterForm = () => {
  const { createNewUser, setUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const minLength = password.length >= 6;

    if (!uppercase.test(password)) {
      return "Password at least one uppercase letter!";
    }
    if (!lowercase.test(password)) {
      return "Password at least one lowercase letter!";
    }
    if (!minLength) {
      return "Password at least 6 characters long!";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address!";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const displayName = form.get("displayName");
    const email = form.get("email");
    const photoURL = form.get("photoURL") || "";
    const password = form.get("password");

    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setEmailError("");

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    setPasswordError("");
    toast.dismiss();

    try {
      // Create a new user with Firebase
      const result = await createNewUser(email, password);
      const user = result.user;

      // Update user profile with displayName and photoURL
      await updateProfile(user, { displayName, photoURL });

      // Set the updated user in context
      const updatedUser = { ...user, displayName, photoURL };
      setUser(updatedUser);

      // Notify user of success
      toast.success("Registration successful!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
      });

      // Navigate to the homepage after successful registration
      navigate("/");

      // Reload the page to ensure user session is fresh
      window.location.reload();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please log in.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
        });
      } else {
        toast.success(`Registration successful!`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
        });
      }
      console.error("Error during registration:", err);
    }
  };

  const handleGoogleRegister = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Registration with Google successful!", {
          position: "bottom-right",
          hideProgressBar: true,
        });

        // Navigate to the homepage after successful registration
        navigate("/");

        // Reload the page to ensure user session is fresh
        window.location.reload();
      })
      .catch(() => {
        toast.error("Google registration failed. Try again!", {
          position: "bottom-right",
          hideProgressBar: true,
        });
      });
  };

  return (
    <div>
      <div className="card min-w-[400px] bg-base-200 border border-base-100 rounded-box flex flex-col items-center justify-center pt-8">
        <div className="mt-10">
          <button
            onClick={handleGoogleRegister}
            type="button"
            className="btn btn-sm bg-base-100 shadow-none"
          >
            <FcGoogle className="text-xl" />
            <span>Register with Google</span>
          </button>
        </div>
        <div className="flex w-full flex-col px-9 mt-4 -mb-4">
          <div className="divider">OR</div>
        </div>
        <form onSubmit={handleSubmit} className="card-body w-full space-y-2">
          <div className="form-control">
            <input
              type="text"
              name="displayName"
              placeholder="Enter your name"
              className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none bg-base-300"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none bg-base-300"
              required
            />
          </div>
          {emailError && (
            <div className="text-sm text-red-500 mt-2 ml-4">
              <p>{emailError}</p>
            </div>
          )}
          <div className="form-control">
            <input
              type="text"
              name="photoURL"
              placeholder="Enter your photo URL (optional)"
              className="input input-sm input-bordered text-xs font-semibold focus:outline-none border-none bg-base-300"
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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-[7px] cursor-pointer hover:text-pink-600"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </span>
          </div>
          {passwordError && (
            <div className="text-sm text-red-500 mt-2 ml-4">
              <p>{passwordError}</p>
            </div>
          )}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-sm mt-2 bg-pink-600 hover:bg-pink-700"
            >
              <span>Register</span>
            </button>
          </div>
          <div className="text-sm text-center">
            <p>
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-semibold text-red-700 hover:text-red-600"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
