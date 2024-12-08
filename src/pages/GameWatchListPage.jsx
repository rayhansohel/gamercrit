import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const GameWatchListPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch Watchlist data for the logged-in user
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view the watchlist.");
      navigate("auth/login");
      return;
    }

    const fetchWatchlist = async () => {
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
      }
    };

    fetchWatchlist();
  }, [user, navigate]);

  // Remove a game from the watchlist
  const handleRemove = async (reviewId) => {
    try {
      const response = await fetch(
        `https://gamercrit-server.vercel.app/watchlist/${reviewId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to remove the game from watchlist.");
      }
      setWatchlist(watchlist.filter((item) => item.reviewId !== reviewId));
      toast.success("Game removed from your watchlist.");
    } catch (error) {
      console.error("Failed to remove game from watchlist", error);
      toast.error("Failed to remove game. Please try again.");
    }
  };

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
            <AiFillStar key={`full-${index}`} className="text-green-500 text-lg" />
          ))}
        {halfStars && <AiFillStar className="text-green-500 text-lg" />}
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

      <div className="w-11/12 mx-auto my-6 md:my-12">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {watchlist.length === 0 ? (
          <p className="text-gray-600">
            No games added to your watchlist yet. Start exploring reviews!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full max-w-4xl mx-auto bg-base-200 rounded-box overflow-hidden border-base-100">
              <thead className="bg-base-100">
                <tr>
                  <th className="px-4 py-3 border-b border-base-100 text-left">
                    Cover Image
                  </th>
                  <th className="px-4 py-3 border-b border-base-100 text-left">
                    Game Title
                  </th>
                  <th className="px-4 py-3 border-b border-base-100 hidden md:table-cell text-left">
                    Genre
                  </th>
                  <th className="px-4 py-3 border-b border-base-100 hidden md:table-cell text-left">
                    Published
                  </th>
                  <th className="px-4 py-3 border-b border-base-100 text-left">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((item) => (
                  <tr key={item.reviewId}>
                    <td className="p-4 border-b border-base-100">
                      <img
                        src={item.coverImage}
                        alt={item.title || "N/A"}
                        className="w-20 md:w-32 h-20 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-3 border-b border-base-100">
                      {item.title || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-b border-base-100 hidden md:table-cell">
                      {item.genre || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-b border-base-100 hidden md:table-cell">
                      {item.year || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-b border-base-100">
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
