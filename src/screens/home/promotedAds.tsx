import styles from "./index.module.scss";
import { Image } from "antd";
import LeftIcon from "../../assets/arrow-left.svg";
import RightIcon from "../../assets/arrow-right.svg";
import Product1 from "../../assets/Product.svg";
import Product2 from "../../assets/Image.svg";
import Product3 from "../../assets/Image (1).svg";
import { useState } from "react";

// Data array
const cardData = [
  {
    id: 1,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
  },
  {
    id: 2,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
  },
  {
    id: 3,
    icon: <Image width="100%" src={Product3} alt="cardIcon" preview={false} />,
  },
  {
    id: 4,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
  },
  {
    id: 5,
    icon: <Image width="100%" src={Product3} alt="cardIcon" preview={false} />,
  },
  {
    id: 6,
    icon: <Image width="100%" src={Product1} alt="cardIcon" preview={false} />,
  },
  {
    id: 7,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
  },
  {
    id: 8,
    icon: <Image width="100%" src={Product3} alt="cardIcon" preview={false} />,
  },
  {
    id: 9,
    icon: <Image width="100%" src={Product1} alt="cardIcon" preview={false} />,
  },
];

// Main component
const PromotedAds = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of items to display per page
  const totalPages = Math.ceil(cardData.length / pageSize);

  // Calculate the slice of data to display based on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = cardData.slice(startIndex, endIndex);

  // Handle left button click (Previous)
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle right button click (Next)
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle dot click to jump to the respective page
  const handleDotClick = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div  style={{marginBlock:'2rem'}}>
      <div className={styles.promoHead}>
        <p>Promoted Ads</p>

        <div className={styles.arrowContainer}>
          <div
            className={`${styles.arrowButton} ${
              currentPage === 1 ? styles.disabledArrow : styles.greenBackground
            }`}
            onClick={handlePrev}
            style={currentPage === 1 ? { backgroundColor: "#009900" } : {}}
          >
            <Image src={LeftIcon} alt="Left Arrow" preview={false} />
          </div>
          <div
            className={`${styles.arrowButton} ${
              currentPage === totalPages
                ? styles.disabledArrow
                : styles.greenBackground
            }`}
            onClick={handleNext}
            style={currentPage === totalPages ? { backgroundColor: "#009900" } : {}}
          >
            <Image src={RightIcon} alt="Right Arrow" preview={false} />
          </div>
        </div>
      </div>

      {/* Display the promo images */}
      <section className={styles.promoImageContainer}>
        {currentData.map((card) => (
          <div className={styles.promoImage} key={card.id}>
            {card.icon}
          </div>  
        ))}
      </section>

      {/* Dot-style pagination */}
      <div className={styles.dotPagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentPage === index + 1 ? styles.activeDot : ""
            }`}
            onClick={() => handleDotClick(index + 1)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PromotedAds;
