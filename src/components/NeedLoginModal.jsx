/* eslint-disable react/prop-types */
import Lottie from "lottie-react";
import loginAnimation from "../assets/login-animation.json";

const NeedLoginModal = ({ isOpen, onClose, onRedirect }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-base-200 p-6 rounded-box max-w-sm w-full flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        <h2 className="text-xl text-center font-semibold ">Please Login</h2>
        <Lottie animationData={loginAnimation} className="w-32" />
        <p className="mt-2 text-sm text-center">
          You need to log in to access this page.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="btn btn-sm bg-base-100 border-none shadow-none"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm btn-accent  text-white border-none shadow-none"
            onClick={onRedirect}
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default NeedLoginModal;
