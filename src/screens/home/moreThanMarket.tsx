import styles from "./index.module.scss";
import { Image } from "antd";
import cardIcon from "../../assets/image 7.svg";
import Image4 from "../../assets/image 4.svg";
import Image8 from "../../assets/image 8.svg";
import Image24 from "../../assets/image 24.svg";
import Image28 from "../../assets/image 28.svg";
import Image29 from "../../assets/image 29.svg";

const cardData = [
  {
    id: 1,
    icon: <Image src={cardIcon} alt="cardIcon" preview={false} />,
    title: "Global Marketplace",
    content:
      "Our marketplace connects buyers and sellers from around the globe, giving you access to a wide network of trusted business opportunities.",
  },
  {
    id: 2,
    icon: <Image src={Image4} alt="cardIcon" preview={false} />,
    title: "Discover Businesses and Job Opportunities",
    content:
      "Explore our business directory to find verified businesses or check the jobs section for the latest job opportunities posted.",
  },
  {
    id: 3,
    icon: <Image src={Image8} alt="cardIcon" preview={false} />,
    title: "Easy and Convenient Connections",
    content:
      "Post Ads as a seller or browse an extensive selection of products and business listings. When you find what you're looking for, connect directly with sellers.",
  },
  {
    id: 4,
    icon: <Image src={Image24} alt="cardIcon" preview={false} />,
    title: "Add Your Business To The Directory",
    content:
      "Add your business to our global directory, making it easy for potential customers to find you, reach new audiences, and grow your brand effortlessly.",
  },
  {
    id: 5,
    icon: <Image src={Image29} alt="cardIcon" preview={false} />,
    title: "Claim Your Business",
    content:
      "Claim your business in the directory to take full control of your brand’s profile. Verify ownership, keep your information up-to-date, and boost your credibility.",
  },
  {
    id: 6,
    icon: <Image src={Image28} alt="cardIcon" preview={false} />,
    title: "Post Jobs",
    content:
      "Post job listings to reach a wider audience and attract top talent. Easily share your opportunities and manage applicants all in one place.",
  },
];
const MoreThanMarket = () => {
  return (
    <div style={{marginBlock:'2rem'}}>
        <div className={styles.head}>
        <h1>We Are More Than A Market Place</h1>
        <h4>Connect, shop, sell, get jobs and grow your business</h4>
      

        </div>
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
  );
};
export default MoreThanMarket;
