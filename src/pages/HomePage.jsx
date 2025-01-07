import { Helmet } from "react-helmet-async";
import Hero from "./../components/Hero";
import HighestRatedGames from "../components/HighestRatedGames";
import ImageSlider from "../components/ImageSlider";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import { useState, useEffect } from "react";
import CommunityHighlights from "../components/CommunityHighlights";
import Promotion from "../components/Promotion";
import Newsletter from "../components/Newsletter";
import GenreTabs from "../components/GenreTabs";

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
    <div>
      <Helmet>
        <title>Gamer Crit</title>
      </Helmet>

      {/* Loader Modal */}
      {isLoading && (
        <div className="flex justify-center items-center h-[calc(100vh-356px)]">
          <Lottie animationData={loadingAnimation} className="w-32" />
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <>
          {/* Display Hero Slider */}
          <div className="pb-8 lg:pb-20">
            <Hero />
          </div>

          {/* Display high rated games */}
          <div className="container w-11/12 mx-auto pb-8 lg:pb-20">
            <HighestRatedGames />
          </div>

          {/* Community Section */}
          <div className="bg-base-200 pb-8 lg:pb-20">
            <CommunityHighlights />
          </div>

          {/* About Brand Section */}
          <div className="container w-11/12 mx-auto py-8 lg:py-20">
            <GenreTabs />
          </div>
          
          {/* Game Image slider */}
          <div className="pb-8 lg:pb-20">
            <ImageSlider />
          </div>

          {/* Promotion Section */}
          <div className="container w-11/12 mx-auto pb-8 lg:pb-20">
            <Promotion />
          </div>

          {/* Wy Choose Section */}
          <div className="container w-11/12 mx-auto pb-8 lg:pb-20">
            <Newsletter />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
