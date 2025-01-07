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

const GenreTabs = () => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://gamercrit-server.vercel.app/reviews"
        );
        const data = await response.json();
        setReviews(data);

        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data.map((review) => review.genre))];
        setCategories(uniqueCategories);

        setLoading(false); // Stop loader
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        setLoading(false); // Stop loader even on error
      }
    };

    fetchReviews();
  }, []);

  // Filter reviews based on active category
  const filteredReviews =
    activeCategory === "All"
      ? reviews
      : reviews.filter((review) => review.genre === activeCategory);

  return (
    <div>
      <div>
            {/* Genre Tabs */}
            <div className="mb-6">
              <h2 className="text-3xl font-semibold text-center mb-6">
                Explore by Genre
              </h2>

              <div className="flex space-x-2 justify-center mb-4">
                {/* Tab for Each Genre */}
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`${
                      activeCategory === category
                        ? "bg-accent text-white"
                        : "bg-base-200"
                    } btn btn-sm`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Display Reviews for the Active Category */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-base-200 rounded-box "
                  >
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
                <p>No reviews found.</p>
              )}
            </div>
      </div>
    </div>
  );
};

export default GenreTabs;
