const Faq = () => {
    return (
      <div className="pt-8 lg:pt-20">
        <div>
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">FAQs</h2>
            <p className="text-base-content opacity-80 max-w-xl mx-auto">
              Have questions about Gamer Crit? Here are some of the most common
              ones to help you get started.
            </p>
          </div>
  
          {/* FAQ Accordion */}
          <div className="space-y-4">
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                What is Gamer Crit?
              </div>
              <div className="collapse-content">
                <p>
                  Gamer Crit is an all-in-one platform where gamers can explore
                  reviews, connect with other players, and discover personalized
                  game recommendations.
                </p>
              </div>
            </div>
  
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Is Gamer Crit free to use?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, Gamer Crit is free to use. You can explore reviews, join
                  the community, and access many features without any cost.
                </p>
              </div>
            </div>
  
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Can I contribute my own game reviews?
              </div>
              <div className="collapse-content">
                <p>
                  Absolutely! Registered users can contribute reviews, rate games,
                  and share their insights with the community.
                </p>
              </div>
            </div>
  
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                How do I create an account?
              </div>
              <div className="collapse-content">
                <p>
                  Creating an account is simple. Click on the 'Sign Up' button on
                  the top-right corner, fill in your details, and start your
                  journey with Gamer Crit.
                </p>
              </div>
            </div>
  
            <div className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                How are personalized recommendations generated?
              </div>
              <div className="collapse-content">
                <p>
                  We use advanced algorithms to analyze your preferences, past
                  reviews, and gameplay habits to suggest games you'll love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Faq;
  
