const Newsletter = () => {
    return (
      <div className="py-16 bg-base-200 rounded-3xl">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-semibold text-primary mb-4">
              Stay Updated with Gamer Crit
            </h2>
            <p className="max-w-xl mx-auto">
              Subscribe to our newsletter and get the latest news, reviews, and game recommendations delivered straight to your inbox.
            </p>
          </div>
  
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <div className="flex flex-col md:flex-row items-center bg-base-100 p-6 rounded-box shadow-xl shadow-primary-100">
              <div className="flex w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 p-2 rounded-l-md focus:outline-none bg-base-300"
                />
                <button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-r-md">
                  Subscribe
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Newsletter;
  