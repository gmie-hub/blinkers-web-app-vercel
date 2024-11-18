import styles from "./index.module.scss";
import { Image } from "antd";
import Product2 from "../../../../assets/Image.svg";
import Product3 from "../../../../assets/Image (1).svg";
import Star from "../../../../assets/Vector.svg";
import StarYellow from "../../../../assets/staryellow.svg";
import BackIncon from "../../../../assets/back.svg";
import { useNavigate } from "react-router-dom";
import { countUpTo } from "../../trend";
import { useCallback } from "react";


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
  // Add more data as needed...
];

// Main component with `limit` prop to control how many data to display
const SellersAds = ({
  limit = cardData.length,
  showHeading = true,
}: {
  limit?: number;
  showHeading?: boolean;
}) => {
  const navigate = useNavigate();

  const handleNavigateToRelateSellerProfile = useCallback(() => {
    navigate(`/sellers-profile`);
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="wrapper" style={{ marginBlock: "2rem" }}>
      {showHeading && (
        <div
          onClick={() => handleNavigateToRelateSellerProfile()}
          className={styles.back}
        >
          <Image width={9} src={BackIncon} alt="BackIncon" preview={false} />
          <p>Back</p>
        </div>
      )}

      <div>
        {showHeading && (
          <div className={styles.promoHead}>
            <p>Ads Posted By Omorinsola’s Store</p>
          </div>
        )}

        {/* Display the promo images with the limit applied */}
        <section className={styles.promoImageContainer}>
          {cardData.slice(0, limit).map((card) => (
            <div className={styles.promoImage} key={card.id}>
              {card.icon}
              <div className={styles.productList}>
                <p>{card.title}</p>
                <p>{card.location}</p>
                <p>{card.amount}</p>
                <div className={styles.starWrapper}>
                  {countUpTo(
                    card?.rating || 0,
                    <Image
                      width={20}
                      src={StarYellow}
                      alt="StarYellow"
                      preview={false}
                    />,
                    <Image width={20} src={Star} alt="Star" preview={false} />
                  )}
                  <span>(20)</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

    </div>
  );
};

export default SellersAds;
