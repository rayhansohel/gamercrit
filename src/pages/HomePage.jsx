import { Helmet } from "react-helmet-async";
import Hero from './../components/Hero';
import HighestRatedGames from "../components/HighestRatedGames";
import ImageSlider from "../components/ImageSlider";
import AboutBrand from "../components/AboutBrand";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetching process
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-[calc(100vh-96px)] relative">
      <Helmet>
        <title>Home - Gamer Crit</title>
      </Helmet>

      {/* Loader Modal */}
      {isLoading && (
        <div className="flex justify-center items-center h-[calc(100vh-200px)]">
          <Lottie animationData={loadingAnimation} className="w-32" />
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Display Hero Slider */}
          <div>
            <Hero />
          </div>

          {/* Display high rated games */}
          <div className="w-11/12 mx-auto my-8">
            <HighestRatedGames />
          </div>

          {/* Game Image slider */}
          <div>
            <ImageSlider />
          </div>

          {/* About Brand Section */}
          <div className="w-11/12 mx-auto my-8">
            <AboutBrand />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;

