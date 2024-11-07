import Foot from "../../layouts/footer/foot";
import Footer from "../../layouts/footer/footer";
import Access from "./access";
import GetStarted from "./getStarted";
import styles from "./index.module.scss";
import MoreThanMarket from "./moreThanMarket";
import PromotedAds from "./promotedAds";
import RecommendedAds from "./recommendedAds";
import Trends from "./trend";

const Home = () => {
  return (
    <main>
      <section className={styles.main}>
        <section className={styles.section}>
            <MoreThanMarket/>
            <PromotedAds/>
            <RecommendedAds/>
            <Access/>
            <GetStarted/>
            <Trends/>
            <br />
          <Footer />
        </section>
      </section>
      <Foot />
    </main>
  );
};
export default Home;
