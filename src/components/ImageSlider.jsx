import { useState, useEffect } from "react";
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

const ImageSlider = () => {
  const [slides, setSlides] = useState([]); // To store image, title, and rating data
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the 1st actual image
  const slideInterval = 3000; // 3 seconds for auto-slide
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Fetch images, titles, and ratings from the reviews API
    const fetchSlides = async () => {
      try {
        const response = await fetch(
          "https://gamercrit-server.vercel.app/reviews"
        );
        const data = await response.json();
        const slidesData = data.map((review) => ({
          image: review.coverImage,
          title: review.title,
          rating: review.rating,
        }));
        // Add cloned slides for seamless looping
        setSlides([
          slidesData[slidesData.length - 1],
          ...slidesData,
          slidesData[0],
        ]);
      } catch (error) {
        console.error("Failed to fetch slides", error);
      }
    };

    fetchSlides();
  }, []);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) nextSlide();
    }, slideInterval);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [isAnimating]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Handle transition end for looping effect
  const handleTransitionEnd = () => {
    setIsAnimating(false);

    if (currentIndex === slides.length - 1) {
      // Reset to the real first slide
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      // Reset to the real last slide
      setCurrentIndex(slides.length - 2);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Image Slider - Gamer Crit</title>
      </Helmet>

      <div className="w-full overflow-hidden relative mb-6 md:mb-12">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * (100 / 3)}%)`,
            transition: isAnimating ? "transform 0.5s ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-1/2 md:w-1/3 flex-shrink-0 relative">
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className="w-full max-h-[400px] object-cover"
              />
              {/* Overlay with Title and Ratings */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent text-white p-4">
                <h3 className="md:text-2xl">{slide.title}</h3>
                <p className="flex items-center gap-2">
                  <RatingStars rating={slide.rating} />
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="w-10 h-10 opacity-50 hover:opacity-100 absolute top-1/2 left-4 bg-gray-800 text-white p-2 rounded-full transform -translate-y-1/2"
          onClick={prevSlide}
        >
          ❮
        </button>

        <button
          className="w-10 h-10 opacity-50 hover:opacity-100 absolute top-1/2 right-4 bg-gray-800 text-white p-2 rounded-full transform -translate-y-1/2"
          onClick={nextSlide}
        >
          ❯
        </button>
      </div>

      {slides.length === 0 && (
        <p className="text-center mt-4">No images to display</p>
      )}
    </div>
  );
};

export default ImageSlider;
