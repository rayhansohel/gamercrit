/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const GameWatchListPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch Watchlist data for the logged-in user
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view the watchlist.");
      navigate("auth/login");
      return;
    }

    const fetchWatchlist = async () => {
      setLoading(true); // Start loader
      try {
        const response = await fetch(
          `https://gamercrit-server.vercel.app/watchlist?email=${user.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch watchlist data");
        }
        const data = await response.json();
        setWatchlist(data);
      } catch (error) {
        console.error("Failed to fetch watchlist data", error);
        setErrorMessage("Failed to fetch watchlist. Please try again.");
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchWatchlist();
  }, [user, navigate]);

  // Render star ratings
  const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="flex">
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <AiFillStar key={`full-${index}`} className="text-accent text-lg" />
          ))}
        {halfStars && <AiFillStar className="text-accent text-lg" />}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <AiOutlineStar key={`empty-${index}`} className="text-gray-400 text-lg" />
          ))}
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Watch List - Gamer Crit</title>
      </Helmet>

      <div className="w-11/12 mx-auto my-6 md:my-20">
        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-356px)]">
            <Lottie animationData={loadingAnimation} className="w-32" />
          </div>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : watchlist.length === 0 ? (
          <p className="text-center">
            No games added to your watchlist yet. Start exploring reviews!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full max-w-4xl mx-auto bg-base-200 rounded-box overflow-hidden border-base-100">
              <thead className="bg-base-100">
                <tr>
                  <th className="px-4 py-3 text-left">
                    Cover Image
                  </th>
                  <th className="px-4 py-3 text-left">
                    Game Title
                  </th>
                  <th className="px-4 py-3 hidden md:table-cell text-left">
                    Genre
                  </th>
                  <th className="px-4 py-3 hidden md:table-cell text-left">
                    Published
                  </th>
                  <th className="px-4 py-3 text-left">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((item) => (
                  <tr key={item.reviewId}>
                    <td className="p-4 border-t border-base-300">
                      <img
                        src={item.coverImage}
                        alt={item.title || "N/A"}
                        className="w-20 md:w-32 h-20 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold border-t border-base-300">
                      {item.title || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-t border-base-300 hidden md:table-cell">
                      {item.genre || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-t border-base-300 hidden md:table-cell">
                      {item.year || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-t border-base-300">
                      <RatingStars rating={item.rating} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameWatchListPage;

