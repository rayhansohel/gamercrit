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
      } catch (error) {
        console.error("Failed to fetch reviews", error);
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
      <div className="w-11/12 mx-auto my-6 md:my-12">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div
                key={review._id}
                className="bg-base-200 border border-base-100 rounded-box p-4"
              >
                <img
                  src={review.coverImage}
                  alt={review.title}
                  className="w-full max-h-48 min-h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-xl font-semibold mb-2">{review.title}</h3>
                <p>
                  <span className="font-semibold">Published:</span>{" "}
                  {review.year}
                </p>
                <p>
                  <span className="font-semibold">Genre:</span> {review.genre}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-semibold">Ratings:</span>{" "}
                  <span>
                    <RatingStars rating={review.rating} />
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Review by:</span>{" "}
                  {review.name}
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
    </div>
  );
};

export default AllReviewsPage;
