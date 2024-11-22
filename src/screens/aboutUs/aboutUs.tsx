import Icon from "/Container.svg";
import styles from "./aboutUs.module.scss";
import { Image } from "antd";
import Main from "./secondSection.tsx";
import WhyChooseUs from "./whyChooseUs.tsx";
import Aim from "./aim/aims.tsx";
import Image1 from "../../assets/about1.svg";
import Image2 from "../../assets/about2.svg"
import Image3 from "../../assets/about3.svg";
import Image4 from "../../assets/about4.svg";

const cardData = [
  {
    id: 1,
    icon: (
      <Image
        // width="23rem"
        // height={"19.3rem"}
        src={Image1}
        alt="Image1"
        preview={false}
      />
    ),
  },
  {
    id: 2,
    icon: (
      <Image
      // width="23rem"
      // height={"19.3rem"}
        src={Image2}
        alt="Image2"
        preview={false}
      />
    ),
  },
  {
    id: 3,
    icon: (
      <Image
      // width="23rem"
      // height={"19.3rem"}
        src={Image3}
        alt="Image3"
        preview={false}
      />
    ),
  },
  {
    id: 4,
    icon: (
      <Image
      // width="23rem"
      // height={"19.3rem"}
        src={Image4}
        alt="Image4"
        preview={false}
      />
    ),
  },
];

const AboutUs = () => {
  return (
    <div
      className="wrapper"
    >
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${Icon})`, // Ensure you use the correct image reference
          }}
        >
          <div className={styles.home}>
            <p className={styles.picHead}>About Us</p>
          </div>
        </div>

        <div className={styles.mainContainer}>
          <div className={styles.leftSection}>
            <h1>More Than A Market Place</h1>
            <p>
              Blinkers Business Directory Ltd. Is the owner of the Blinkers
              mobile application and website, which lists all businesses in
              Nigeria. It is your one-stop platform for buying, selling, and
              discovering products and services, as well as connecting with
              businesses and job opportunities.
            </p>
            <p>
              We aim to bring people together from across the world to explore a
              wide variety of products, grow their businesses, and find
              employment opportunities in one convenient platform.
            </p>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.cardContainer}>
              {cardData.map((card) => (
                <div key={card.id} className={styles.card}>
                  {card.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Main />
        <WhyChooseUs />
        <Aim />
      </div>
    </div>
  );
};
export default AboutUs;
