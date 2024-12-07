import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialLinks = () => {
  return (
    <div className="min-w-full  flex rounded-box">
      {/* social icons  */}
      <div className="flex gap-4">
        <div
          href="https://www.facebook.com/RayhanSohel"
          target="_blank"
          className="text-xl w-10 h-10 bg-base-100 flex items-center justify-center rounded-lg text-pink-600 hover:text-gray-700"
        >
          <FaFacebook />
        </div>
        <a
          href="https://x.com/rrayhanSohel"
          target="_blank"
          className="text-xl w-10 h-10 bg-base-100 flex items-center justify-center rounded-lg text-pink-600 hover:text-gray-700"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.instagram.com/arayhansohel/"
          target="_blank"
          className="text-xl w-10 h-10 bg-base-100 flex items-center justify-center rounded-lg text-pink-600 hover:text-gray-700"
        >
          {" "}
          <FaInstagram />
        </a>
        <a
          href="https://github.com/RayhanSohel"
          target="_blank"
          className="text-xl w-10 h-10 bg-base-100 flex items-center justify-center rounded-lg text-pink-600 hover:text-gray-700"
        >
          {" "}
          <FaGithub />
        </a>
        <a
          href="https://www.youtube.com/@gronetech"
          target="_blank"
          className="text-xl w-10 h-10 bg-base-100 flex items-center justify-center rounded-lg text-pink-600 hover:text-gray-700"
        >
          {" "}
          <FaYoutube />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
