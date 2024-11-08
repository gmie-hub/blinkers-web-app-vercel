import Access from "./access";
import Directory from "./directory";
import GetStarted from "./getStarted";
import PictureBg from "./landingImage/picture";
import MoreThanMarket from "./moreThanMarket";
import PromotedAds from "./promotedAds";
import RecommendedAds from "./recommendedAds";
import Trends from "./trend";
import styles from "./index.module.scss";

const Home = () => {
  return (
    <section>
      {" "}
      <PictureBg />
      <div className={styles.wrapper}>
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
