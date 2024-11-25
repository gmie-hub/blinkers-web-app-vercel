import styles from "./relatedBusiness.module.scss";
import { Image } from "antd";
import Product2 from "../../../assets/Image.svg";
import Product3 from "../../../assets/Image (1).svg";
import BackIncon from "../../../assets/back.svg";
import { useNavigate } from "react-router-dom";
import LocationIcon from "../../../assets/locationrelated.svg";
import CallIcon from "../../../assets/callrelated.svg";

// Data array
const cardData = [
  {
    id: 1,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    phone:"09012345678",
    rating: 1,
  },
  {
    id: 2,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 2,
    phone:"09012345678",

  },
  {
    id: 3,
    icon: <Image width="100%" src={Product3} alt="cardIcon" preview={false} />,
    title: "Female Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 3,
    phone:"09012345678",

  },
  {
    id: 4,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 5,
    phone:"09012345678",

  },
  {
    id: 5,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 4,
    phone:"09012345678",

  },
  // Add more data as needed...
];

// Main component with `limit` prop to control how many data to display
const RelatedBusinesses = ({
  limit = cardData.length,
  showHeading = true,
}: {
  limit?: number;
  showHeading?: boolean;
}) => {
  const navigate = useNavigate();

  const handleNavigateToNotClaim = () => {
    navigate(`/not-claim/1`);
    window.scrollTo(0, 0);
  }

  return (
    <div className="wrapper">
      {showHeading && (
        <div onClick={() => handleNavigateToNotClaim()} className={styles.back}>
          <Image width={9} src={BackIncon} alt="BackIncon" preview={false} />
          <p>Back</p>
        </div>
      )}

      <div>
        {showHeading && (
          <div className={styles.promoHead}>
            <p>Related Businesses</p>
          </div>
        )}

        {/* Display the promo images with the limit applied */}
        <section className={styles.promoImageContainer}>
          {cardData.slice(0, limit).map((card) => (
            <div className={styles.promoImage} key={card.id}>
              {card.icon}
              <div className={styles.productList}>

                <p className={styles.title}>{card.title}</p>
                <div className={styles.info}>
                <Image src={LocationIcon} alt="LocationIcon" preview={false} />

                <p>{card.location}</p>

                </div>
                <div className={styles.info}>
                <Image width={20} height={20} src={CallIcon} alt="CallIcon" preview={false} />

                <p>{card.phone}</p>

                </div>
                <p className={styles.subjectBg}>Fashion Accessories</p>

              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default RelatedBusinesses;
