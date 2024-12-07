import { Helmet } from "react-helmet-async";
import Hero from './../components/Hero';

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
    </div>
  );
};

export default HomePage;
