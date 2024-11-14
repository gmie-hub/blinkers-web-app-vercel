import Access from "./access";
import Directory from "./directory";
import GetStarted from "./getStarted";
import PictureBg from "./landingImage/picture";
import MoreThanMarket from "./moreThanMarket";
import PromotedAds from "./promotedAds";
import RecommendedAds from "./recommendedAds";
import Trends from "./trend";

const Home = () => {
  return (
    <section>
      {" "}
      <PictureBg />
      <div className='wrapper'>
        <Directory />
        <MoreThanMarket />
        <PromotedAds />
        <RecommendedAds />
        <Access />
        <GetStarted />
        <Trends />
      </div>
    </section>
  );
};
export default Home;
