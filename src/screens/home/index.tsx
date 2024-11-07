import Access from "./access";
import Directory from "./directory";
import GetStarted from "./getStarted";
import MoreThanMarket from "./moreThanMarket";
import PromotedAds from "./promotedAds";
import RecommendedAds from "./recommendedAds";
import Trends from "./trend";

const Home = () => {
  return (
        <section>
          <Directory />
          <MoreThanMarket />
          <PromotedAds />
          <RecommendedAds />
          <Access />
          <GetStarted />
          <Trends />
        </section>
  );
};
export default Home;
