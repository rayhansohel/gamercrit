import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0; 
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex">
      {/* Full stars */}
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <AiFillStar key={`full-${index}`} className="text-green-500" />
        ))}

      {/* Half star */}
      {halfStars && <AiFillStar className="text-green-500" />}

      {/* Empty stars */}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <AiOutlineStar key={`empty-${index}`} className="text-green-500" />
        ))}
    </div>
  );
};

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:4000/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Reviews - Gamer Crit</title>
      </Helmet>
      <div className="w-11/12 mx-auto my-6 md:my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-base-200 border border-base-100 rounded-box p-4"
              >
                <img
                  src={review.coverImage}
                  alt={review.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <h3 className="text-xl font-semibold mb-2">{review.title}</h3>
                <p><span className="font-semibold">Published:</span> {review.year}</p>
                <p><span className="font-semibold">Genre:</span> {review.genre}</p>
                <p className="flex items-center gap-2"><span className="font-semibold">Ratings:</span> <span><RatingStars rating={review.rating} /></span></p>
                <p><span className="font-semibold">Review by:</span> {review.name}</p>

                <Link
                  to={`/reviews/${review._id}`}
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
    </div>
  );
};

export default AllReviewsPage;
