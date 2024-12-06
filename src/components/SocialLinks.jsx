import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialLinks = () => {
  return (
    <div className="bg-base-200 min-w-full h-16 flex items-center justify-center rounded-box">
      {/* social icons  */}
      <div className="flex gap-4">
        <div
          href="https://www.facebook.com/RayhanSohel"
          target="_blank"
          className="text-xl w-10 h-10 bg-base-100 flex items-center justify-center rounded-lg text-gray-700 hover:text-pink-600"
        >
          <FaFacebook />
        </div>
        <a
          href="https://x.com/rrayhanSohel"
          target="_blank"
          className="text-xl w-10 h-10 bg-base-100 flex items-center justify-center rounded-lg text-gray-700 hover:text-pink-600"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.instagram.com/arayhansohel/"
          target="_blank"
          className="text-xl w-10 h-10 bg-base-100 flex items-center justify-center rounded-lg text-gray-700 hover:text-pink-600"
        >
          {" "}
          <FaInstagram />
        </a>
        <a
          href="https://github.com/RayhanSohel"
          target="_blank"
          className="text-xl w-10 h-10 bg-base-100 flex items-center justify-center rounded-lg text-gray-700 hover:text-pink-600"
        >
          {" "}
          <FaGithub />
        </a>
        <a
          href="https://www.youtube.com/@gronetech"
          target="_blank"
          className="text-xl w-10 h-10 bg-base-100 flex items-center justify-center rounded-lg text-gray-700 hover:text-pink-600"
        >
          {" "}
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
