// import { useState } from "react";
// import { Image, Modal } from "antd";
// import BlinkersLogo from "../../assets/Logo.svg";
// import { NavLink } from "react-router-dom";
// import styles from "./styles.module.scss";
// import Button from "../../customs/button/button";
// import CategoriesCard from "../../screens/home/category";

// const Header = () => {
//   const [isCardVisible, setIsCardVisible] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle menu visibility on mobile

//   // Function to toggle category modal visibility
//   const handleCategoryClick = () => {
//     setIsCardVisible(!isCardVisible);
//   };

//   // Function to toggle mobile menu visibility
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className={styles.container}>
//       <Image src={BlinkersLogo} className={styles.logo} />

//       {/* Menu Button for Mobile */}
//       <button className={styles.menuButton} onClick={toggleMenu}>
//         {isMenuOpen ? "✖" : "☰"} {/* Change icon based on menu state */}
//       </button>

//       {/* Navigation Links */}
//       <div className={`${styles.middleNav} ${isMenuOpen ? styles.showMenu : ""}`}>
//         <NavLink
//           to=""
//           className={({ isActive }) =>
//             isActive ? styles.activeNavLink : styles.navLink
//           }
//         >
//           Home
//         </NavLink>

//         <span className={styles.navLink} onClick={handleCategoryClick} >
//           Categories
//         </span>

//         {navItems.map((item) => (
//           <NavLink
//             key={item.id}
//             to={item.route}
//             className={({ isActive }) =>
//               isActive ? styles.activeNavLink : styles.navLink
//             }
//           >
//             {item.name}
//           </NavLink>
//         ))}
//       </div>

//       <div className={styles.rightNav}>
//         <Button className={styles.btn}>Get Started</Button>
//       </div>

//       {/* Modal for Categories */}
//       <Modal
//         visible={isCardVisible}
//         onCancel={handleCategoryClick}
//         footer={null}
//         closable={false}
//         centered
//         width={1300}
//         style={{ top: "40px" }}
//         bodyStyle={{
//           paddingBlockStart: "5px",
//         }}
//       >
//         <CategoriesCard />
//       </Modal>
//     </nav>
//   );
// };

// const navItems = [
//   { id: 1, name: "About Us", route: "/about-us" },
//   { id: 2, name: "Contact Us", route: "/contact-us" },
//   { id: 3, name: "Jobs", route: "/jobs" },
//   { id: 4, name: "Directory", route: "/directory" },
//   { id: 5, name: "Pricing", route: "/pricing" },
// ];

// export default Header;

import { useCallback, useState } from "react";
import { Image, Modal } from "antd";
import BlinkersLogo from "../../assets/Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Button from "../../customs/button/button";
import CategoriesCard from "../../screens/home/category";

const Header = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToLogin = useCallback(
    () => {
      navigate('/login');
    },
    [navigate]
  );

  // Function to toggle category modal visibility
  const handleCategoryClick = () => {
    setIsCardVisible(!isCardVisible);
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
      <div className={`${styles.middleNav} ${isMenuOpen ? styles.showMenu : ""}`}>
        <NavLink
          to=""
          className={({ isActive }) =>
            isActive ? styles.activeNavLink : styles.navLink
          }
        >
          Home
        </NavLink>

        <span className={styles.navLink} onClick={handleCategoryClick}>
          Categories
        </span>

        {navItems.map((item) => (
          <NavLink
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
            <Button className={styles.btn}>Get Started</Button>
          </div>
        )}
      </div>

      {/* Right Nav - Shown only on large screens */}
      <div className={styles.rightNav}>
        <Button onClick={handleNavigateToLogin} className={styles.btn}>Get Started</Button>
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
        <CategoriesCard />
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