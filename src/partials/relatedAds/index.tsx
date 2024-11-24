import styles from "./index.module.scss";
import { Image } from "antd";
import Star from "../../assets/Vector.svg";
import StarYellow from "../../assets/staryellow.svg";
import Product2 from "../../assets/Image.svg";
import Product3 from "../../assets/Image (1).svg";
import {useState } from "react";
import favorite from "../../assets/Icon + container.svg";
import righIcont from "../../assets/arrow-right-green.svg";
import { useNavigate } from "react-router-dom";
import { countUpTo } from "../../screens/home/trend";

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
const RelatedAds = () => {
  const [currentPage] = useState(1);
  const pageSize = 4; // Number of items to display per page
  const navigate = useNavigate()

  // Calculate the slice of data to display based on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = cardData.slice(startIndex, endIndex);

  const handleNavigateToRelatedAds = ()=>{
    navigate('/related-ads');
    window.scrollTo(0, 0); // Scrolls to the top of the page

  }
 
   


  return (
    <div className={styles.relatedWrapper}>
      <div className={styles.promoHead}>
        <p>Related Ads</p>
        <div className={styles.seeMore}>
          <p onClick={handleNavigateToRelatedAds}>See All</p>

          <Image src={righIcont} alt="righIcont" preview={false} />
        </div>
      </div>

      {/* Display the promo images */}
      <section className={styles.promoImageContainer}>
        {currentData.map((card) => (
          <div className={styles.promoImage} key={card.id}>
            <div className={styles.favoriteIcon}>
              <Image width={30} src={favorite} alt="Favorite" preview={false} />
            </div>
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
                  )} <span>(20)</span>
                </div>
              </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default RelatedAds;
