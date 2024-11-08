import styles from "./index.module.scss";
import { Image } from "antd";
import cardIcon from "../../assets/image 21.svg";
import Image4 from "../../assets/image 23.svg";
import Image8 from "../../assets/image 27.svg";
import Image24 from "../../assets/image 28 (1).svg";
import SearchInput from "../../customs/searchInput";

const cardData = [
    {
      id: 1,
      icon: <Image src={cardIcon} alt="cardIcon" preview={false} />,
      title: "Categories",
      content:'Browse diverse product categories to find exactly what you need.'
    },
    {
      id: 2,
      icon: <Image src={Image4} alt="cardIcon" preview={false} />,
      title: "Directory",
      content:'Discover businesses and services in our comprehensive global directory'
    },
    {
      id: 3,
      icon: <Image src={Image8} alt="cardIcon" preview={false} />,
      title: 'Jobs',
      content:'Find and apply for job opportunities that match your skills'
    },
    {
      id: 4,
      icon: <Image src={Image24} alt="cardIcon" preview={false} />,
      title: "Market",
      content:'Explore products and services worldwide to connect with sellers directly'
    },
 
  ];

const Directory = () => {
  return (
    <div className={styles.directryContainer}>
         {cardData?.length &&
          cardData?.map((card,index) => (
            <div className={styles.directryCard} key={card.id}
            style={{
                backgroundColor:
                  index === 0
                    ? "#0080001A"
                    : index === 1
                    ? "#FF57331A"
                    : index === 2
                    ? "#0066991A"
                    : "#FFD7001A", // Apply different colors based on the card index
              }}>
              <div>{card.icon}</div>
              <h3
              style={{
                color:
                  index === 0
                    ? "#008000"
                    : index === 1
                    ? "#FF5733"
                    : index === 2
                    ? "#006699"
                    : "#D0B214", // Apply different colors based on the card index
              }}>{card.title}</h3>
              <p>{card.content}</p>
              <br />
              <SearchInput
            placeholder="What are you looking for?"
            width="10rem"
            // isBtn={true} // Show the button on the right side
          />
            </div>
          ))}
     

    </div>
  );
}

export default Directory;
