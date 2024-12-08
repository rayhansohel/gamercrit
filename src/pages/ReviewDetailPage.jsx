import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useAuth } from "../contexts/AuthContext"; // Custom hook for authentication context

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
          <AiOutlineStar key={`empty-${index}`} className="text-gray-400" />
        ))}
    </div>
  );
};

const ReviewDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth(); // Access user from context
  const [review, setReview] = useState(null);
  const [isAdded, setIsAdded] = useState(false); // State to track if added to watchlist

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(
          `https://gamercrit-server.vercel.app/reviews/${id}`
        );
        const data = await response.json();
        setReview(data);
      } catch (error) {
        console.error("Failed to fetch review details", error);
      }
    };

    fetchReview();
  }, [id]);

  const handleAddToWatchList = async () => {
    if (!user) {
      alert("You must be logged in to add to WatchList.");
      return;
    }

    const watchlistItem = {
      reviewId: id,
      title: review.title,
      coverImage: review.coverImage,
      email: user.email,
      username: user.displayName || user.username, // Ensure it uses displayName or username
    };

    try {
      const response = await fetch(
        `https://gamercrit-server.vercel.app/watchlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(watchlistItem),
        }
      );

      if (response.ok) {
        setIsAdded(true);
      } else {
        console.error("Failed to add to WatchList");
      }
    } catch (error) {
      console.error("Error adding to WatchList:", error);
    }
  };

  if (!review) return <p>Loading...</p>;

  return (
    <div className="w-11/12 mx-auto my-6 md:my-12 flex justify-center items-center">
      <Helmet>
        <title>{review.title} - Gamer Crit</title>
      </Helmet>
      <div className="bg-base-200 border border-base-100 rounded-box p-6 max-w-4xl">
        <img
          src={review.coverImage}
          alt={review.title}
          className="w-full max-h-[400px] object-cover rounded-lg mb-4"
        />
        <h1 className="text-2xl font-bold mb-4">{review.title}</h1>
        <p>
          <span className="font-semibold">Published:</span> {review.year}
        </p>
        <p>
          <span className="font-semibold">Genre:</span> {review.genre}
        </p>
        <p className="flex items-center gap-2">
          <span className="font-semibold">Ratings:</span>
          <RatingStars rating={review.rating} />
        </p>
        <p className="my-4">{review.description}</p>
        <p>
          <span className="font-semibold">Reviewed by:</span> {review.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {review.email}
        </p>
        {user && (
          <button
            onClick={handleAddToWatchList}
            disabled={isAdded}
            className={`btn btn-sm mt-4 ${isAdded ? "bg-gray-500" : "bg-pink-600 hover:bg-pink-700"} text-white`}
          >
            {isAdded ? "Added to WatchList" : "Add to WatchList"}
          </button>
        )}
        {!user && (
          <p className="mt-4 text-sm text-red-500">You must be logged in to add to WatchList.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewDetailPage;
