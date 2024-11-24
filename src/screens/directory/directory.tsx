import styles from "./directory.module.scss";
import { Image, Pagination } from "antd";
import Product2 from "../../assets/Image.svg";
import Product3 from "../../assets/Image (1).svg";
import {useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "/Container.svg";
import SearchInput from "../../customs/searchInput";

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
  {
    id: 7,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 4,
  },
  {
    id: 8,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 4,
  },
  {
    id: 9,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 4,
  },
  {
    id: 10,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 4,
  },
  {
    id: 11,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 4,
  },
  {
    id: 12,
    icon: <Image width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 4,
  },
];

const Directory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Set the number of items per page
  const navigate = useNavigate();

  // Calculate the data to display for the current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCards = cardData.slice(indexOfFirst, indexOfLast);

  // Handle page change
  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleNavigateToNotClaim = 
    (id: number) => {
      navigate(`/not-claim/${id}`);
    }
  

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url(${Icon})`, // Ensure you use the correct image reference
          }}
        >
          <div className={styles.home}>
            <p className={styles.picHead}>Directory</p>
            <p className={styles.picPara}>Explore various business listings</p>
          </div>
          <div>
            <div className={styles.searchWrapper}>
              {/* <Select
                name="employment_type"
                placeholder="Category"
                options={[]}
              /> */}

              <SearchInput
                placeholder="Search businesses..."
                // width="40rem"
                isBtn={true}
              />
            </div>
          </div>
        </div>
      </div>

      <section className={styles.promoImageContainer}>
        {currentCards?.map((card: any) => (
          <div
            className={styles.promoImage}
            key={card.id}
            onClick={() => handleNavigateToNotClaim(card.id)}
          >
            {/* <div className={styles.favoriteIcon}>
              <Image width={30} src={favorite} alt="Favorite" preview={false} />
            </div> */}
            {card.icon}
            <div className={styles.productList}>
              <p>{card.title}</p>
              <p>{card.location}</p>
              <p>{card.amount}</p>
              <div className={styles.subjectBg}>Fashion Accessories</div>
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

export default Directory;
