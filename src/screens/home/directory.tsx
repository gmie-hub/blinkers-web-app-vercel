import styles from "./index.module.scss";
import { Image } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import cardIcon from "../../assets/image 21.svg";
import Image4 from "../../assets/image 23.svg";
import Image8 from "../../assets/image 27.svg";
import Image24 from "../../assets/image 28 (1).svg";
import SearchInput from "../../customs/searchInput";
import { useState } from "react"; // Import useState for handling search input value

const cardData = [
  {
    id: 1,
    icon: <Image src={cardIcon} alt="cardIcon" preview={false} />,
    title: "Categories",
    content: "Browse diverse product categories to find exactly what you need.",
    route: "/categories", // Route for this card
    placeholder:"Search Categories..."
  },
  {
    id: 2,
    icon: <Image src={Image4} alt="cardIcon" preview={false} />,
    title: "Directory",
    content:
      "Discover businesses and services in our comprehensive global directory",
    route: "/directory", 
    placeholder:"Search Directory..."

  },
  {
    id: 3,
    icon: <Image src={Image8} alt="cardIcon" preview={false} />,
    title: "Jobs",
    content: "Find and apply for job opportunities that match your skills",
    route: "/jobs", 
    placeholder:"Search Jobs..."

  },
  {
    id: 4,
    icon: <Image src={Image24} alt="cardIcon" preview={false} />,
    title: "Market",
    content:
      "Explore products and services worldwide to connect with sellers directly",
    route: "/market",
    placeholder:"Search Market..."

  },
];

const Directory = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [searchValues, setSearchValues] = useState<{ [key: number]: string }>({}); // State to store search input value for each card

  const handleNavigate = (route: string, query: string = "") => {
    const fullRoute = query ? `${route}/${query}` : route;
    navigate(fullRoute); 
    window.scrollTo(0, 0); 
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setSearchValues((prevState) => ({
      ...prevState,
      [id]: e.target.value, // Update the search value for the specific card
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, route: string, id: number) => {
    if (e.key === 'Enter') {
      handleNavigate(route, searchValues[id]); // Trigger navigate on Enter key press
    }
  };

  return (
    <div className={styles.directryContainer}>
      {cardData?.length &&
        cardData?.map((card, index) => (
          <div
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
            <h3 className={styles.dirTitle}
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

            <SearchInput
              placeholder="Search for a Job..."
              value={searchValues[card.id] || ""} // Set the search value for the specific card
              onChange={(e) => handleSearchChange(e, card.id)} // Update the search value for this card
              onKeyDown={(e) => handleKeyDown(e, card.route, card.id)} // Trigger handleNavigate on Enter key press

            >
              {/* <button
                className={styles.smallButton} // Add a style for the button
                onClick={() => handleNavigate(card.route, searchValues[card.id])} // Pass the specific search value to the route
              >
                search
              </button> */}
            </SearchInput>
          </div>
        ))}
    </div>
  );
};

export default Directory;
