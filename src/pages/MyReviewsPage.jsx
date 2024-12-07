
import { Helmet } from 'react-helmet-async';

const MyReviewsPage = () => {
    return (
        <div>
        <Helmet>
          <title>My Review - Gamer Crit</title>
        </Helmet>
        <div className="w-11/12 mx-auto my-6 md:my-12">My Reviews</div>
      </div>
    );
};

export default MyReviewsPage;