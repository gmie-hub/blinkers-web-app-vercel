import styles from "./index.module.scss";
import { Image, Pagination } from "antd";
import Star from "../../../../assets/Vector.svg";
import StarYellow from "../../../../assets/staryellow.svg";
import Product2 from "../../../../assets/Image.svg";
import Product3 from "../../../../assets/Image (1).svg";
import {  useState } from "react";
import favorite from "../../../../assets/Icon + container.svg";
import { useNavigate } from "react-router-dom";
import { countUpTo } from "../../trend";

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

const RightSide = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set the number of items per page
  const navigate = useNavigate();

  // Calculate the data to display for the current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCards = cardData.slice(indexOfFirst, indexOfLast);

  // Handle page change
  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleNavigateToProductDetails =
    (id: number) => {
      navigate(`/product-details/${id}`);
    }

  return (
    <div>
      {/* Display the promo images */}
      <section className={styles.promoImageContainer}>
        {currentCards?.map((card) => (
          <div className={styles.promoImage} key={card.id} onClick={() => handleNavigateToProductDetails(card.id)}>
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

      <Pagination
        current={currentPage}
        total={cardData.length} // Total number of items
        pageSize={itemsPerPage} // Number of items per page
        onChange={onPageChange} // Handle page change
        showSizeChanger={false} // Hide the option to change the page size
        style={{
          marginTop: "20px",
          textAlign: "center", // Center the pagination
          display: "flex",
          justifyContent: "center", // Ensure the pagination is centered
        }}
      />
    </div>
  );
};

export default RightSide;
