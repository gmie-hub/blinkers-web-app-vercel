import styles from "./index.module.scss";
import { Image, Modal } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import cardIcon from "../../assets/image 21.svg";
import Image4 from "../../assets/image 23.svg";
import Image8 from "../../assets/image 27.svg";
import Image24 from "../../assets/image 28 (1).svg";
import CategoriesCard from "./category";
import { useState } from "react";

const cardData = [
  {
    id: 1,
    icon: <Image src={cardIcon} alt="cardIcon" preview={false} />,
    title: "Categories",
    content: "Browse diverse product categories to find exactly what you need.",
    route: "/market", // Route for this card
    placeholder: "Search Categories...",
  },
  {
    id: 2,
    icon: <Image src={Image4} alt="cardIcon" preview={false} />,
    title: "Directory",
    content:
      "Discover businesses and services in our comprehensive global directory",
    route: "/directory",
    placeholder: "Search Directory...",
  },
  {
    id: 3,
    icon: <Image src={Image8} alt="cardIcon" preview={false} />,
    title: "Jobs",
    content: "Find and apply for job opportunities that match your skills",
    route: "/jobs",
    placeholder: "Search Jobs...",
  },
  {
    id: 4,
    icon: <Image src={Image24} alt="cardIcon" preview={false} />,
    title: "Market",
    content:
      "Explore products and services worldwide to connect with sellers directly",
    route: "/market",
    placeholder: "Search Market...",
  },
];

const HomeDirectory = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [isCardVisible, setIsCardVisible] = useState(false);

  // const handleCategoryClick = () => {
  //   const newValue = !isCardVisible;
  //   localStorage.setItem("categoriesClicked", String(newValue));
  //   setIsCardVisible(newValue);

  //   // Dispatch a custom event for local storage updates
  //   window.dispatchEvent(new Event("storageUpdated"));
  // };


  // const handleNavigate = (route: string, query: string = "") => {
  //   const fullRoute = query ? `${route}/${query}` : route;
  //   navigate(fullRoute);
  //   window.scrollTo(0, 0);
  // };

  const handleNavigate = (route: string,title: string, query: string = "", ) => {
    if (title === "Categories") {
      setIsCardVisible(true)
    } else {
      const fullRoute = query ? `${route}/${query}` : route;
      navigate(fullRoute);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
    
    <div className={styles.directryContainer}>
      {cardData?.length &&
        cardData?.map((card, index) => (
          <div
            onClick={() => handleNavigate(card?.route,card?.title)}
            className={styles.directryCard}
            key={card.id}
            style={{
              backgroundColor:
                index === 0
                  ? "#0080001A"
                  : index === 1
                  ? "#FF57331A"
                  : index === 2
                  ? "#0066991A"
                  : "#FFD7001A", // Apply different colors based on the card index
            }}
          >
            <div>{card.icon}</div>
            <h3
              className={styles.dirTitle}
              style={{
                color:
                  index === 0
                    ? "#008000"
                    : index === 1
                    ? "#FF5733"
                    : index === 2
                    ? "#006699"
                    : "#D0B214", // Apply different colors based on the card index
              }}
            >
              {card.title}
            </h3>
            <p>{card.content}</p>
            <br />

            {/* <SearchInput
              placeholder={card?.placeholder}
              value={searchValues[card.id] || ""} // Set the search value for the specific card
              onChange={(e) => handleSearchChange(e, card.id)} // Update the search value for this card
              onKeyDown={(e) => handleKeyDown(e, card.route, card.id)} // Trigger handleNavigate on Enter key press

            >
            
            </SearchInput> */}
          </div>
        ))}
    </div>

    <Modal
        open={isCardVisible}
        onCancel={()=>setIsCardVisible(false)}
        footer={null}
        closable={false}
        centered
        width={1300}
        style={{ top: "40px" }}
        bodyStyle={{ paddingBlockStart: "5px" }}
      >
        <CategoriesCard handleClose={() => setIsCardVisible(false)} />
      </Modal>
    </>
  );
};

export default HomeDirectory;
