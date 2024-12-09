import {useState } from "react";
import { Image, Modal } from "antd";
import BlinkersLogo from "../../assets/Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Button from "../../customs/button/button";
import CategoriesCard from "../../screens/home/category";
import Image8 from "../../assets/cat1.svg";

const Header = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  // Function to toggle category modal visibility
  const handleCategoryClick = () => {
    setIsCardVisible(!isCardVisible);
    setIsOpen(!isOpen);
  };

  // Function to toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.container}>
      <Image src={BlinkersLogo} className={styles.logo} />

      {/* Menu Button for Mobile */}
      <button className={styles.menuButton} onClick={toggleMenu}>
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Navigation Links */}
      <div
        className={`${styles.middleNav} ${isMenuOpen ? styles.showMenu : ""}`}
      >
        <NavLink
                  onClick={()=>{setIsMenuOpen(false)}}

          to=""
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : styles.navLink
          }
        >
          Home
        </NavLink>

        <span className={styles.navLink} onClick={handleCategoryClick}>
        Categories
        <Image
          src={Image8}
          alt="Toggle Icon"
          className={`${styles.icon} ${isOpen ? styles.rotate : ""}`}
          preview={false}
        />
      </span>

        {navItems.map((item) => (
          <NavLink
          onClick={()=>{setIsMenuOpen(false)}}
            key={item.id}
            to={item.route}
            className={({ isActive }) =>
              isActive ? styles.activeNavLink : styles.navLink
            }
          >
            {item.name}
          </NavLink>
        ))}

        {/* Get Started button - Displayed under nav items on small screens */}
        {isMenuOpen && (
          <div className={styles.mobileButtonWrapper}>
            <Button    onClick={() => {
            handleNavigateToLogin();
          }}className={styles.btn}>Get Started</Button>
          </div>
        )}
      </div>

      {/* Right Nav - Shown only on large screens */}
      <div className={styles.rightNav}>
        <Button
          onClick={() => {
            handleNavigateToLogin();
          }}
          className={styles.btn}
        >
          Get Started
        </Button>
      </div>

      {/* Modal for Categories */}
      <Modal
        visible={isCardVisible}
        onCancel={handleCategoryClick}
        footer={null}
        closable={false}
        centered
        width={1300}
        style={{ top: "40px" }}
        bodyStyle={{
          paddingBlockStart: "5px",
        }}
      >
        <CategoriesCard handleClose={()=>setIsCardVisible(false)} />
      </Modal>
    </nav>
  );
};

const navItems = [
  { id: 1, name: "About Us", route: "/about-us" },
  { id: 2, name: "Contact Us", route: "/contact-us" },
  { id: 3, name: "Jobs", route: "/jobs" },
  { id: 4, name: "FAQ", route: "/faq" },
  { id: 5, name: "Directory", route: "/directory" },
  { id: 6, name: "Pricing", route: "/pricing" },
];

export default Header;