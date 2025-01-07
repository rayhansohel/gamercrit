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
            className="carousel-item relative w-full min-h-[600px]"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full object-cover"
            />
            {/* Title and Paragraph */}
            <div className="absolute w-full h-full bg-gradient-to-r from-black to-black/20">
              <div className="container mx-auto w-11/12 flex h-full items-center">
                <div className="flex flex-col justify-center text-white max-w-80 md:max-w-xl space-y-2">
                  <h2 className="text-4xl md:text-6xl mb-2 uppercase font-poppins">
                    {slide.title}
                  </h2>
                  <p className="text-md">{slide.paragraph}</p>
                  <Link to="/reviews">
                    <button className="btn btn-sm mt-4 btn-accent  text-white border-none shadow-none">
                      Explore More
                    </button>
                  </Link>
                </div>
              </div>
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
            className={`btn btn-xs w-7 h-7 border-none hover:btn-accent ${
              currentSlide === btnIndex
                ? "btn-accent text-white"
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
