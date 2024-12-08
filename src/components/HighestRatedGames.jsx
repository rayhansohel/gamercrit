import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex">
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <AiFillStar key={`full-${index}`} className="text-green-500" />
        ))}
      {halfStars && <AiFillStar className="text-green-500" />}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <AiOutlineStar key={`empty-${index}`} className="text-gray-500" />
        ))}
    </div>
  );
};

const HighestRatedGames = () => {
  const [highestRatedReviews, setHighestRatedReviews] = useState([]);

  useEffect(() => {
    const fetchHighestRatedReviews = async () => {
      try {
        const response = await fetch("https://gamercrit-server.vercel.app/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch highest-rated reviews");
        }
        const data = await response.json();
        data.sort((a, b) => b.rating - a.rating);
        setHighestRatedReviews(data.slice(0, 6));
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchHighestRatedReviews();
  }, []);

  return (
    <div className="p-4">
      <Helmet>
        <title>Highest Rated Games - Gamer Crit</title>
      </Helmet>
      <h1 className="text-xl font-semibold mb-6 text-center">Top Rated Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {highestRatedReviews.length > 0 ? (
          highestRatedReviews.map((review) => (
            <div
              key={review._id}
              className="bg-base-200 border border-base-100 rounded-box p-4"
            >
              <img
                src={review.coverImage}
                alt={review.title}
                className="w-full max-h-48 min-h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="text-pink-600 font-bold mb-2">{review.title}</h3>
              <p>
                <span className="font-semibold">Genre:</span> {review.genre}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Ratings:</span>{" "}
                <span>
                  <RatingStars rating={review.rating} />
                </span>
              </p>

              <Link
                to={`/review/${review._id}`}
                className="btn btn-sm bg-pink-600 text-white hover:bg-pink-700 mt-4"
              >
                Explore Details
              </Link>
            </div>
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default HighestRatedGames;
