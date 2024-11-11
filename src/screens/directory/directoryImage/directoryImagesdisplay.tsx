import styles from "./index.module.scss";
import { Image } from "antd";
import LeftIcon from "../../../assets/arrow-left.svg";
import RightIcon from "../../../assets/arrow-right.svg";
import Rinsy from "../../../assets/rinskyImage.svg";

import { useState } from "react";

const cardData = [
  {
    id: 1,
    icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
    title: "Shop with Rinsy",
    address: "4 Blinkers Street, Lekki, Lagos",
    phoneNumber: "09012345678",
    category: "Fashion Accessories",
  },
  {
    id: 2,
    icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
    title: "Shop with Rinsy",
    address: "4 Blinkers Street, Lekki, Lagos",
    phoneNumber: "09012345678",
    category: "Fashion Accessories",
  },
  {
    id: 3,
    icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
    title: "Shop with Rinsy",
    address: "4 Blinkers Street, Lekki, Lagos",
    phoneNumber: "09012345678",
    category: "Fashion Accessories",
  },
  {
    id: 4,
    icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
    title: "Shop with Rinsy",
    address: "4 Blinkers Street, Lekki, Lagos",
    phoneNumber: "09012345678",
    category: "Fashion Accessories",
  },
];

// Main component
const DirectoryDisplay = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4; // Number of items to display per page
  const totalPages = Math.ceil(cardData.length / pageSize);

  // Calculate the slice of data to display based on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = cardData.slice(startIndex, endIndex);

  // Handle left button click (Previous)
  // const handlePrev = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // Handle right button click (Next)
  // const handleNext = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // Handle dot click to jump to the respective page
  // const handleDotClick = (page: any) => {
  //   setCurrentPage(page);
  // };

  return (
    <div style={{ marginBlock: "2rem" }}>
      <div className={styles.promoHead}>
        {/* <div className={styles.arrowContainer}>
          <div
            className={`${styles.arrowButton} ${
              currentPage === 1 ? styles.disabledArrow : styles.greenBackground
            }`}
            onClick={handlePrev}
            style={currentPage === 1 ? { backgroundColor: "#009900" } : {}}>
            <Image src={LeftIcon} alt="Left Arrow" preview={false} />
          </div>
          <div
            className={`${styles.arrowButton} ${
              currentPage === totalPages
                ? styles.disabledArrow
                : styles.greenBackground
            }`}
            onClick={handleNext}
            style={
              currentPage === totalPages ? { backgroundColor: "#009900" } : {}
            }>
            <Image src={RightIcon} alt="Right Arrow" preview={false} />
          </div>
        </div> */}
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
            onClick={() => handleDotClick(index + 1)}></span>
        ))}
      </div>
    </div>
  );
};

export default DirectoryDisplay;

// const cardData = [
//   {
//     id: 1,
//     icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
//     title: "Shop with Rinsy",
//     address: "4 Blinkers Street, Lekki, Lagos",
//     phoneNumber: "09012345678",
//     category: "Fashion Accessories",
//   },
//   {
//     id: 2,
//     icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
//     title: "Shop with Rinsy",
//     address: "4 Blinkers Street, Lekki, Lagos",
//     phoneNumber: "09012345678",
//     category: "Fashion Accessories",
//   },
//   {
//     id: 3,
//     icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
//     title: "Shop with Rinsy",
//     address: "4 Blinkers Street, Lekki, Lagos",
//     phoneNumber: "09012345678",
//     category: "Fashion Accessories",
//   },
//   {
//     id: 4,
//     icon: <img src={Rinsy} alt="" className={styles.cardImage} />,
//     title: "Shop with Rinsy",
//     address: "4 Blinkers Street, Lekki, Lagos",
//     phoneNumber: "09012345678",
//     category: "Fashion Accessories",
//   },
// ];
