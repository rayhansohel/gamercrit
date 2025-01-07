
const WhyChoose = () => {
  return (
    <div className="">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Gamer Crit?</h2>
          <p className="opacity-80 max-w-xl mx-auto">
            Gamer Crit is your ultimate destination for exploring and connecting
            with the gaming world. Here's what sets us apart:
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Feature Card 1 */}
          <div className="p-6 bg-base-200 text-center rounded-box">
            <h3 className="text-xl font-semibold mb-2">
              Engaging Community
            </h3>
            <p className="opacity-70">
              Connect with fellow gamers through forums, discussions, and
              exclusive events.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="p-6 bg-base-200 text-center rounded-box">
            <h3 className="text-xl font-semibold mb-2">Expert Insights</h3>
            <p className="opacity-70">
              Access in-depth reviews and insights from seasoned gaming experts.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="p-6 bg-base-200 text-center rounded-box">
            <h3 className="text-xl font-semibold mb-2">Reliable Ratings</h3>
            <p className="opacity-70">
              Trust our community-driven ratings to make informed gaming
              choices.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="p-6 bg-base-200 text-center rounded-box">
            <h3 className="text-xl font-semibold mb-2">
              Stay Ahead with Updates
            </h3>
            <p className="opacity-70">
              Stay informed about the latest releases, updates, and trending
              games.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
