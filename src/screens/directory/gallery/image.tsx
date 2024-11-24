import styles from "./styles.module.scss";
import { Image } from "antd";
import Product2 from "../../../assets/Image.svg";
import Product3 from "../../../assets/Image (1).svg";
import BackIncon from "../../../assets/back.svg";
import { useNavigate } from "react-router-dom";

// Data array
const cardData = [
  {
    id: 1,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 1,
  },
  {
    id: 2,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 2,
  },
  {
    id: 3,
    icon: <Image width="100%" src={Product3} alt="cardIcon" preview={false} />,
    title: "Female Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 3,
  },
  {
    id: 4,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 5,
  },
  {
    id: 5,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 4,
  },
  {
    id: 6,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 4,
  },
  // Add more data as needed...
];

// Main component with `limit` prop to control how many data to display
const ImagePage = ({
  limit = cardData.length,
  showHeading = true,
}: {
  limit?: number;
  showHeading?: boolean;
}) => {
  const navigate = useNavigate();

  const handleNavigateToPrevious = () => {
    navigate(-1)
    window.scrollTo(0, 0);
  }

  return (
    <div className="wrapper" >

      {showHeading && (
        <div onClick={() => handleNavigateToPrevious()} className={styles.back}>
          <Image width={9} src={BackIncon} alt="BackIncon" preview={false} />
          <p>Back</p>
        </div>
      )}
      <div  className={styles.imageWrapper} >

     

      <div  className={styles.InnerWrapper} >
        {showHeading && (
          <div className={styles.promoHead}>
            <p>Photos</p>
          </div>
        )}

        {/* Display the promo images with the limit applied */}
        <section className={styles.promoImageContainer}>
          {cardData.slice(0, limit).map((card) => (
            <div className={styles.promoImage} key={card.id}>
              {card.icon}
             
            </div>
          ))}
        </section>
      </div>
      </div>
    </div>
  );
};

export default ImagePage;
