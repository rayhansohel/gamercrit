/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Fetch slider data
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("/slider.json");
        const data = await response.json();
        setSlides(data);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      }
    };

    fetchSlides();
  }, []);

  const scrollToSlide = (index) => {
    if (sliderRef.current && slides.length > 0) {
      const totalSlides = slides.length;
      const nextIndex = (index + totalSlides) % totalSlides;
      setCurrentSlide(nextIndex);
      const targetSlide = sliderRef.current.querySelector(
        `#slide${nextIndex + 1}`
      );
      targetSlide?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Carousel */}
      <div ref={sliderRef} className="carousel w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            id={`slide${index + 1}`}
            key={slide.id}
            className="carousel-item relative w-full max-h-[700px] min-h-[600px]"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full object-cover"
            />
            {/* Title and Paragraph */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center text-white p-10 w-[400px] md:w-[700px] h-[300px] bg-[#0000002c] backdrop-blur-sm rounded-box">
              <h2 className="text-3xl md:text-5xl mb-2 uppercase text-pink-600">
                {slide.title}
              </h2>
              <p className="text-md">{slide.paragraph}</p>
              <Link to="/reviews">
                <button className="btn btn-sm mt-4 bg-pink-600 hover:bg-pink-700 text-white border-none shadow-none">
                  Explore More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Slide number buttons (fixed) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, btnIndex) => (
          <button
            key={btnIndex}
            onClick={() => scrollToSlide(btnIndex)}
            className={`btn btn-xs w-7 h-7 border-none hover:bg-pink-600 ${
              currentSlide === btnIndex
                ? "bg-pink-600 text-white"
                : "bg-base-200 "
            }`}
            aria-label={`Go to slide ${btnIndex + 1}`}
          >
            {btnIndex + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
