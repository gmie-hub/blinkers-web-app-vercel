import styles from "./index.module.scss";
import { Image } from "antd";
import Icon1 from "../../assets/Icon.svg";
import Icon2 from "../../assets/Icon (1).svg";
import Icon3 from "../../assets/Icon (2).svg";
import Icon4 from "../../assets/Icon (3).svg";

import Icon5 from "../../assets/Ellipse 856.svg";
import Icon6 from "../../assets/Ellipse 857.svg";

const cardData = [
  {
    id: 1,
    icon: <Image src={Icon1} alt="Icon1" preview={false} />,
    title: "Search For Products",
    content:
      "Explore thousands of products from sellers around the world, all organized by category to make finding what you want easy",
  },
  {
    id: 2,
    icon: <Image src={Icon2} alt="Icon2" preview={false} />,
    title: "Check Seller Details",
    content:
      "See seller profiles, reviews, and contact options to know who you’re dealing with. You can view details about their business, including location, ratings, and more.",
  },
  {
    id: 3,
    icon: <Image src={Icon3} alt="Icon3" preview={false} />,
    title: "Connect and Communicate",
    content:
      "Get in touch with sellers directly through their contact details listed on the platform. You can call, message, or visit their website.",
  },
  {
    id: 4,
    icon: <Image src={Icon4} alt="Icon4" preview={false} />,
    title: "Make Your Purchase Off-Platform",
    content:
      "Once you’re satisfied with your choice, arrange payment and delivery directly with the seller.",
  },
];
const GetStarted = () => {
  return (
    <div  className={styles.accessWrapper}>
      <div className={styles.getStartedHead}>
        <h2>How To Get Started</h2>
        <p>Find, Connect, and Shop Directly with Sellers Worldwide</p>
      </div>
      <section className={styles.getStarted}>
        <div className={styles.getStartedRight}>
          <div className={styles.double}>
            <Image src={Icon5} alt="Icon5" preview={false} />,
            <Image src={Icon6} alt="Icon6" preview={false} />,
          </div>
          <div className={styles.single}>
            <Image src={Icon5} alt="Icon7" preview={false} />,
          </div>
        </div>

        <div className={styles.getStartedLeft}>
          {cardData?.map((card) => (
            <div key={card.id} className={styles.cardContent}>
              {card.icon}
              <div className={styles.cardText}>
                <h3>{card.title}</h3>
                <p>{card.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default GetStarted;
