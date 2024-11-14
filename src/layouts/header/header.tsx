import { useState } from "react";
import { Image, Modal } from "antd"; // Use Modal instead of Popover
import BlinkersLogo from "../../assets/Logo.svg";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import Button from "../../customs/button/button";
import CategoriesCard from "../../screens/home/category"; // Your CategoriesCard component

const Header = () => {
  const [isCardVisible, setIsCardVisible] = useState(false); // State to control modal visibility

  // Function to toggle modal visibility
  const handleCategoryClick = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <nav className={styles.container}>
      <Image src={BlinkersLogo} />

      <div className={styles.middleNav}>
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : styles.navLink
          }
        >
          Home
        </NavLink>

        {/* Categories Button */}
        <Button onClick={handleCategoryClick} variant="transparent">
          Categories
        </Button>

        {navItems.map((items) => (
          <NavLink
            key={items.id}
            to={items.route}
            className={({ isActive }) =>
              isActive ? styles.activeNavLink : styles.navLink
            }
          >
            {items.name}
          </NavLink>
        ))}
      </div>

      <div>
        <Button className={styles.btn}>Get Started</Button>
      </div>

      {/* Modal to center CategoriesCard */}
      <Modal
        visible={isCardVisible}
        onCancel={handleCategoryClick} // Close modal when clicked outside or 'X' is clicked
        footer={null} // No footer buttons
        closable={false} // Hides the default 'X' close button
        centered // This ensures the modal is always centered on the screen
        width={1300} // Set a custom width if necessary
        style={{ top: "40px" }} // Adjust the top position to move modal down from the header
        bodyStyle={{
          paddingBlockStart: "5px", // Optional: you can adjust padding
        }}
      >
        <div>
          <CategoriesCard /> {/* Show CategoriesCard inside the modal */}
        </div>
      </Modal>
    </nav>
  );
};

const navItems = [
  { id: 1, name: "About Us", route: "/about-us" },
  { id: 2, name: "Contact Us", route: "/contact-us" },
  { id: 3, name: "Jobs", route: "/jobs" },
  { id: 4, name: "Directory", route: "/directory" },
  { id: 5, name: "Pricing", route: "/pricing" },
];

export default Header;
