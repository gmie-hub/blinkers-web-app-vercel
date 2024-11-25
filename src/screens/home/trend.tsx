import styles from "./index.module.scss";
import { Image } from "antd";
import Product2 from "../../assets/Image.svg";
import Product3 from "../../assets/Image (1).svg";
import Button from "../../customs/button/button";
import Star from "../../assets/Vector.svg";
import StarYellow from "../../assets/staryellow.svg";
import favorite from "../../assets/Icon + container.svg";
import { useNavigate } from "react-router-dom";

// Data array
const cardData = [
  {
    id: 1,
    icon: <Image width={'100%'} src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 1,
  },
  {
    id: 2,
    icon: <Image width={'100%'} src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 2,
  },
  {
    id: 3,
    icon: <Image width={'100%'} src={Product3} alt="cardIcon" preview={false} />,
    title: "Female Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 3,
  },
  {
    id: 4,
    icon: <Image width={'100%'}  src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 5,
  },
  {
    id: 5,
    icon: <Image  width="100%" src={Product2} alt="cardIcon" preview={false} />,
    title: "Male Packing Shirt",
    location: "Lekki, Lagos",
    amount: "₦40,000",
    rating: 4,
  },
];



const Trends = () => {
  const navigate = useNavigate()

  const handleNavigateToMarket = 
    () => {
      navigate(`/market`);
      window.scrollTo(0, 0); // Scrolls to the top of the page

    }

  
   return (
    <div className={styles.accessWrapper}>
      <div>
        <p className={styles.TrendsHead}>Trending Now</p>
      </div>

      <section className={styles.trendContainer}>
        {/* Left section with two items */}
        <div className={styles.leftSectionTrend}>
          {cardData.slice(0, 2).map((card) => (
            <div className={styles.trendImage} key={card.id}>
              <div className={styles.favoriteIcon}>
                <Image
                  width={30}
                  src={favorite}
                  alt="Favorite"
                  preview={false}
                />{" "}
                {/* Add favorite icon */}
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
        </div>

        {/* Middle section with one item centered */}
        <div className={styles.middleSectionTrend}>
          <div className={styles.trendImage} key={cardData[2].id}>
            <div className={styles.favoriteIcon}>
              <Image width={30} src={favorite} alt="Favorite" preview={false} />{" "}
              {/* Add favorite icon */}
            </div>{" "}
            {cardData[2].icon}
            <div  className={styles.productList}>
              <p>{cardData[2].title}</p>
              <p>{cardData[2].location}</p>
              <p>{cardData[2].amount}</p>
              <div className={styles.starWrapper}>
                {countUpTo(
                  cardData[2]?.rating || 0,
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
          <Button
            type="button"
            variant="green"
            text="Shop Now"
            className={styles.buttonStyleTrend}
            onClick={handleNavigateToMarket}

          />
        </div>

        {/* Right section with two items */}
        <div className={styles.rightSectionTrend}>
          {cardData.slice(3).map((card) => (
            <div className={styles.trendImage} key={card.id}>
                  <div className={styles.favoriteIcon} >
                <Image width={30} src={favorite} alt="Favorite" preview={false} /> {/* Add favorite icon */}

                </div>
              {/* Add favorite icon */}
              {card.icon}
              <div  className={styles.productList}>
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
    
        </div>
        <div>
        <Button
            type="button"
            variant="green"
            text="Shop Now"
            className={styles.buttonStyleTrendBigscreen}
            onClick={handleNavigateToMarket}
          />
        </div>
     

      
      </section>

 
    </div>
  );
};

export default Trends;

export function countUpTo(num: number, element: JSX.Element, element1: JSX.Element) {
  const result = [];
  for (let i = 1; i <= 5; i++) {
    if (i > num) result.push(element1);
    else result.push(element);
  }
  return result; // Return the array
}
