import { Link } from 'react-router-dom';

const AboutBrand = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between p-6 gap-8">
      {/* Left section with image */}
      <div>
        <img
          src="https://i.ibb.co.com/jGhZMgv/2151418276.jpg"
          alt="Brand Image"
          className="w-full min-h-[300px] max-h-[400px] object-cover rounded-box"
        />
      </div>

      {/* Right section with title, description, and button */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">Gamer Crit</h2>
        <p className="opacity-70 mb-6 text-justify">
        Gamer Crit is a platform dedicated to providing unbiased and in-depth reviews for gamers, helping them make informed decisions before purchasing their next game. We focus on offering comprehensive evaluations, including gameplay mechanics, graphics, storylines, and overall user experience. Our goal is to highlight both the strengths and weaknesses of each title, ensuring that gamers receive honest feedback.
        </p>
        <Link to="/reviews">
          <button className="btn btn-sm bg-pink-600 text-white hover:bg-pink-700">
            Go to Reviews
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutBrand;


