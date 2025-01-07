import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
          <AiFillStar key={`full-${index}`} className="text-accent" />
        ))}
      {halfStars && <AiFillStar className="text-accent" />}
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
        const response = await fetch(
          "https://gamercrit-server.vercel.app/reviews"
        );
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
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-center">
        Top Rated Games
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {highestRatedReviews.length > 0 ? (
          highestRatedReviews.map((review) => (
            <div key={review._id} className="bg-base-200 rounded-box">
              <img
                src={review.coverImage}
                alt={review.title}
                className="w-full object-cover rounded-t-box"
              />
              <div className="p-4">
                <h3 className="font-bold">{review.title}</h3>
                <p className="opacity-70">{review.genre}</p>
                <p className="flex items-center pt-2">
                  <RatingStars rating={review.rating} />
                </p>
                <Link
                  to={`/review/${review._id}`}
                  className="btn btn-sm btn-primary mt-4"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default HighestRatedGames;
