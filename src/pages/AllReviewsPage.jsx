/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

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
          <AiFillStar key={`full-${index}`} className="text-accent" />
        ))}

      {/* Half star */}
      {halfStars && <AiFillStar className="text-accen" />}

      {/* Empty stars */}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <AiOutlineStar key={`empty-${index}`} className="text-gray-500" />
        ))}
    </div>
  );
};

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [genres, setGenres] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://gamercrit-server.vercel.app/reviews"
        );
        const data = await response.json();
        setReviews(data);
        setFilteredReviews(data);

        // Extract unique genres
        const uniqueGenres = [...new Set(data.map((review) => review.genre))];
        setGenres(uniqueGenres);

        setLoading(false); // Stop loader
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        setLoading(false); // Stop loader even on error
      }
    };

    fetchReviews();
  }, []);

  // Handle sorting
  const handleSort = (criteria) => {
    setSortCriteria(criteria);

    const sortedReviews = [...filteredReviews].sort((a, b) => {
      if (criteria === "Rating") {
        return b.rating - a.rating; // Sort by descending rating
      } else if (criteria === "Year") {
        return b.year - a.year; // Sort by descending year
      }
      return 0;
    });

    setFilteredReviews(sortedReviews);
  };

  // Handle filtering
  const handleFilter = (genre) => {
    setSelectedGenre(genre);

    if (genre === "All") {
      setFilteredReviews(reviews); // Show all reviews
    } else {
      const filtered = reviews.filter((review) => review.genre === genre);
      setFilteredReviews(filtered);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Reviews - Gamer Crit</title>
      </Helmet>
      <div className="container w-11/12 mx-auto my-6 md:my-12">
        {loading ? (
          // Loader modal
          <div className="flex justify-center items-center h-[calc(100vh-360px)]">
            <Lottie animationData={loadingAnimation} className="w-32" />
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold mb-6 text-center">
              All Games
            </h1>
            {/* Filter and Sort Dropdowns */}
            <div className="flex justify-between items-center mb-6 gap-4">
              {/* Filter by Genre */}
              <select
                className="select select-sm select-bordered border-base-100 bg-base-200 w-full max-w-xs"
                value={selectedGenre}
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value="All">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>

              {/* Sort by Criteria */}
              <select
                className="select select-sm select-bordered border-base-100 bg-base-200 w-full max-w-xs"
                value={sortCriteria}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="Rating">Rating</option>
                <option value="Year">Year</option>
              </select>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
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
                      <div className="pt-2">
                        <p>
                          <span className="font-semibold">Published:</span>{" "}
                          {review.year}
                        </p>
                        <p>
                          <span className="font-semibold">Review by:</span>{" "}
                          {review.name}
                        </p>
                      </div>
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
                <p>No reviews found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllReviewsPage;
