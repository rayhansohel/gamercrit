import { Helmet } from "react-helmet-async";
import Hero from './../components/Hero';
import HighestRatedGames from "../components/HighestRatedGames";

const HomePage = () => {
  return (
    <div className="min-h-[calc(100vh-96px)]">
      <Helmet>
        <title>Home - Gamer Crit</title>
      </Helmet>
      {/* Display Hero Slider*/}
      <div>
        <Hero />
      </div>
      {/* Display high rated games*/}
      <div className="w-11/12 mx-auto my-8">
        <HighestRatedGames />
      </div>
    </div>
  );
};

export default HomePage;
