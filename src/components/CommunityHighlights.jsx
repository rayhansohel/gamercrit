import { Link } from "react-router-dom";

const CommunityHighlights = () => {
  return (
    <div className="container w-11/12 mx-auto pt-8 lg:pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-8">
        {/* Left section with title, description, and button */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="opacity-70 mb-6 text-justify">
            Discover a vibrant community of gamers who share your passion. With
            Gamer Crit, connect with players worldwide, participate in
            discussions, and showcase your achievements. Our forums,
            leaderboards, and events are designed to bring gamers together and
            celebrate the spirit of gaming.
          </p>
          <Link to="/auth/login">
            <button className="btn btn-sm btn-primary">
              Join Now
            </button>
          </Link>
        </div>

        {/* Right section with image */}
        <div>
          <img
            src="https://i.ibb.co.com/n6VCqRg/community-image.jpg"
            alt="Community Image"
            className="w-full min-h-[300px] max-h-[400px] object-cover rounded-box"
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityHighlights;
