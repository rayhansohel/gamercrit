/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const MyReviewsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Loader state

  // Fetch reviews data for the logged-in user
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to view your reviews.");
      navigate("auth/login");
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://gamercrit-server.vercel.app/reviews/user/${user.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        setErrorMessage("Failed to fetch reviews. Please try again.");
      } finally {
        setIsLoading(false); // Stop the loader
      }
    };

    fetchReviews();
  }, [user, navigate]);

  // Delete a review
  const handleDelete = async (reviewId) => {
    console.log("Review ID to delete:", reviewId);
    try {
      const response = await fetch(
        `https://gamercrit-server.vercel.app/reviews/${reviewId}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete the review.");
      }

      setReviews(reviews.filter((review) => review._id !== reviewId));
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.error("Failed to delete review", error);
      toast.error("Failed to delete review. Please try again.");
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
            <AiFillStar
              key={`full-${index}`}
              className="text-green-500 text-lg"
            />
          ))}
        {halfStars && <AiFillStar className="text-green-500 text-lg" />}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <AiOutlineStar
              key={`empty-${index}`}
              className="text-gray-400 text-lg"
            />
          ))}
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>My Reviews - Gamer Crit</title>
      </Helmet>

      <div className="w-11/12 mx-auto my-6 md:my-12">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Lottie animationData={loadingAnimation} className="w-32" />
          </div>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-600">No reviews found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full max-w-4xl mx-auto bg-base-200 rounded-box overflow-hidden border-base-100">
              <thead className="bg-base-100">
                <tr>
                  <th className="px-8 py-3 border-b border-base-100 text-left">
                    Cover Image
                  </th>
                  <th className="px-4 py-3 border-b border-base-100 text-left">
                    Title
                  </th>
                  <th className="px-4 py-3 border-b border-base-100 text-left hidden md:table-cell">
                    Rating
                  </th>
                  <th className="px-4 py-3 border-b border-base-100 text-left hidden md:table-cell">
                    Genre
                  </th>
                  <th className="px-4 py-3 border-b border-base-100 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id}>
                    <td className="p-4 border-b border-base-100">
                      <img
                        src={review.coverImage}
                        alt={review.title || "N/A"}
                        className="w-20 md:w-32 h-20 object-cover rounded-lg ml-4"
                      />
                    </td>
                    <td className="px-4 py-3 font-semibold border-b border-base-100">
                      {review.title}
                    </td>
                    <td className="px-4 py-3 border-b border-base-100 hidden md:table-cell">
                      <RatingStars rating={review.rating} />
                    </td>
                    <td className="px-4 py-3 border-b border-base-100 hidden md:table-cell">
                      {review.genre || "N/A"}
                    </td>
                    <td className="px-4 py-3 border-b border-base-100">
                      <button
                        onClick={() =>
                          navigate(`/update-review/${review._id}`)
                        }
                        className="btn btn-sm bg-pink-600 text-white hover:bg-pink-700 mb-4 sm:mb-0 w-20"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="btn btn-sm bg-gray-600 text-white hover:bg-gray-700 ml-0 sm:ml-4 w-20"
                      >
                        Delete
                      </button>
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

export default MyReviewsPage;
