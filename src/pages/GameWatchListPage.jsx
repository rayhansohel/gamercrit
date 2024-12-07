import { Helmet } from "react-helmet-async";

const GameWatchListPage = () => {
  return (
    <div>
      <Helmet>
        <title>Watch List- Gamer Crit</title>
      </Helmet>
      <div className="w-11/12 mx-auto my-6 md:my-12">My Watch List </div>
    </div>
  );
};

export default GameWatchListPage;
