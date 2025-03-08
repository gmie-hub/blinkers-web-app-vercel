import styles from "./relatedAds.module.scss";
import { Image } from "antd";
import Product2 from "../../../assets/Image.svg";
import Product3 from "../../../assets/Image (1).svg";
// import { countUpTo } from "../trend";
// import Star from "../../../assets/Vector.svg";
// import StarYellow from "../../../assets/staryellow.svg";
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
];

// Main component
const PromotedAds = () => {
  const navigate  = useNavigate()
  return (
    <div className="wrapper" style={{ marginBlock: "2rem" }}>
      <div onClick={()=>navigate('/market')} className={styles.back}>
        <Image width={9} src={BackIncon} alt="BackIncon" preview={false} />
        <p>Back</p>
      </div>
      <div>
        <div className={styles.promoHead}>
          <p>Related Ads</p>
        </div>

        {/* Display the promo images */}
        <section className={styles.promoImageContainer}>
          {cardData?.map((card) => (
            <div className={styles.promoImage} key={card.id}>
              {card.icon}
              <div className={styles.productList}>
                <p>{card.title}</p>
                <p>{card.location}</p>
                <p>{card.amount}</p>
                {/* <div className={styles.starWrapper}>
                  {countUpTo(
                    card?.rating || 0,
                    <Image
                      width={20}
                      src={StarYellow}
                      alt="StarYellow"
                      preview={false}
                    />,
                    <Image width={20} src={Star} alt="Star" preview={false} />
                  )}{" "}
                  <span>(20)</span>
                </div> */}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PromotedAds;
