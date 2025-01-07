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

const Promotion = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(
          "https://gamercrit-server.vercel.app/reviews"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch promotional games");
        }
        const data = await response.json();

        // Randomly select 4 games from the fetched reviews
        const randomPromotions = [];
        while (randomPromotions.length < 4) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomGame = data[randomIndex];
          if (!randomPromotions.includes(randomGame)) {
            randomPromotions.push(randomGame);
          }
        }

        setPromotions(randomPromotions);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPromotions();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-4xl font-semibold mb-8 text-center">
          Featured Promotions
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-8">
          {promotions.length > 0 ? (
            promotions.map((promo) => (
              <div key={promo._id} className="bg-base-100 rounded-box">
                <img
                  src={promo.coverImage}
                  alt={promo.title}
                  className="w-full object-cover rounded-t-box"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg">{promo.title}</h3>
                  <p className="text-sm opacity-70">{promo.genre}</p>
                  <div className="flex items-center mt-2">
                    <RatingStars rating={promo.rating} />
                  </div>
                  <Link
                    to={`/review/${promo._id}`}
                    className="btn btn-sm btn-primary mt-4"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No promotional games available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promotion;
