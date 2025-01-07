import { Helmet } from "react-helmet-async";
import AboutBrand from "../components/AboutBrand";
import WhyChoose from "../components/WhyChoose";
import Faq from "../components/Faq";

const AboutPage = () => {
  return (
    <div>
      <Helmet>
        <title>About Us - Gamer Crit</title>
      </Helmet>

      {/* About Brand Section */}
      <div className="container w-11/12 mx-auto py-8 lg:py-20">
        <AboutBrand />
      </div>

      {/* Wy Choose Section */}
      <div className="container w-11/12 mx-auto pb-8 lg:pb-20">
        <WhyChoose />
      </div>
      {/* FAQ Section */}
      <div className="container w-11/12 mx-auto pb-8 lg:pb-20">
        <Faq />
      </div>
    </div>
  );
};

export default AboutPage;
