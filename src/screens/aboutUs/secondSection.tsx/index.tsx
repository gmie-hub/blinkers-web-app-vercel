import styles from "./index.module.scss";
import { Image } from "antd";
import Image4 from "../../../assets/image 4.svg";
import Image24 from "../../../assets/image 24.svg";
import Image5 from "../../../assets/about5.svg";
import Image6 from "../../../assets/about6.svg";
import Image7 from "../../../assets/about7.svg";
const cardData = [
  {
    id: 1,
    icon: <Image width={40} height={40} src={Image5} alt="Image5" preview={false} />,
    title: "For Buyers",
    content:
      "Buyers can instantly connect with multiple sellers, compare offers, and negotiate prices before making a purchase. We also provide timely updates on new products, keeping buyers informed.",
  },
  {
    id: 2,
    icon: <Image width={40} height={40} src={Image6} alt="Image6" preview={false} />,
    title: "For Sellers",
    content:
      "Sellers can reach a targeted global audience, making it easy to introduce new products, connect with potential buyers, and expand their market reach effectively.",
  },
  {
    id: 3,
    icon: <Image width={40} height={40} src={Image7} alt="Image7" preview={false} />,
    title: "For Service Providers",
    content:
      "Service provider are listed based on their proximity to potential customers, and our real-time locator shows their location to facilitate seamless connections.",
  },
  {
    id: 4,
    icon: <Image src={Image24} alt="cardIcon" preview={false} />,
    title: "For Businesses",
    content:
      "Business owners can expand their reach by listing in our global directory. The platform helps attract targeted customers, showcase products and services, and build credibility.",
  },
  {
    id: 5,
    icon: <Image src={Image4} alt="cardIcon" preview={false} />,
    title: "For Job Seekers",
    content:
      "Job seekers can explore opportunities that fit their skills and goals. Our platform connects job seekers to employers looking for talent worldwide, simplifying the job search process. ",
  },

];
const Main = () => {
  return (
    <div>
  <div className={styles.marketplaceWrapper}>
    
      <div className={styles.cardContainer}>
        {cardData?.length &&
          cardData?.map((card) => (
            <div className={styles.card} key={card.id}>
              <div>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.content}</p>
            </div>
          ))}
      </div>
    </div>
    </div>
  
  );
};
export default Main;
