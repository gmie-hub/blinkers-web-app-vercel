import { useState } from "react";
import { Image, Modal, Dropdown, Menu } from "antd";
import BlinkersLogo from "../../assets/Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import Button from "../../customs/button/button";
import CategoriesCard from "../../screens/home/category";
import Image8 from "../../assets/cat1.svg";
import NotyIcon from "../../assets/notyIcon.svg";
import ChatIcon from "../../assets/chatyicon.svg";
import ProfileIcon from "../../assets/Avatarprofile.svg";

import { useAtomValue } from "jotai";
import { userAtom } from "../../utils/store";
import { useSetAtom } from "jotai/react";

const Header = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom); // To update the user state

  console.log(user?.data?.email, "emd");

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToSell = () => {
    navigate("/sell");
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    // Clear user state and localStorage on logout
    localStorage.removeItem("blinkers-web&site#");
    setUser(null); // Reset the user state
    navigate("/");
  };
  const handleCategoryClick = () => {
    setIsCardVisible(!isCardVisible);
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="1" onClick={handleNavigateToProfile}>
        View Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className={styles.container}>
      <Image src={BlinkersLogo} className={styles.logo} preview={false} />

      {/* Menu Button for Mobile */}
      <button className={styles.menuButton} onClick={toggleMenu}>
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Navigation Links */}
      <div
        className={`${styles.middleNav} ${isMenuOpen ? styles.showMenu : ""}`}
      >
        <NavLink
          onClick={() => {
            setIsMenuOpen(false);
          }}
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
            onClick={() => {
              setIsMenuOpen(false);
            }}
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
        {user?.data?.email !== undefined && isMenuOpen && (
          <>
            <div className={styles.loggedInIcons}>
              <img
                src={NotyIcon}
                alt="Notifications"
                className={styles.chatIcon}
              />
              <img src={ChatIcon} alt="Messages" className={styles.chatIcon} />
              <Dropdown overlay={profileMenu} trigger={["click"]}>
                <img
                  src={ProfileIcon}
                  alt="Profile"
                  className={styles.profileIcon}
                  style={{ cursor: "pointer" }}
                />
              </Dropdown>
            </div>
            <div className={styles.mobileButtonWrapper}>
              <Button
                onClick={() => {
                  handleNavigateToSell();
                }}
                className={styles.btn}
              >
                Sell
              </Button>
            </div>
          </>
        )}
        {user?.data?.email === undefined && isMenuOpen && (
          <div className={styles.mobileButtonWrapper}>
            <Button
              onClick={() => {
                handleNavigateToLogin();
              }}
              className={styles.btn}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>

      {/* Right Nav - Shown only on large screens */}
      <div className={styles.rightNav}>
        {user?.data?.email !== undefined  && (
          <div className={styles.loggedInIcons}>
            <img
              src={NotyIcon}
              alt="Notifications"
              className={styles.chatIcon}
            />
            <img src={ChatIcon} alt="Messages" className={styles.chatIcon} />
            <Dropdown overlay={profileMenu} trigger={["click"]}>
              <img
                src={ProfileIcon}
                alt="Profile"
                className={styles.profileIcon}
                style={{ cursor: "pointer" }}
              />
            </Dropdown>
            <Button
              onClick={handleNavigateToSell}
              className={`${styles.btn} ${styles.sellButton}`}
            >
              Sell
            </Button>
          </div>
        )}
        {user?.data?.email === undefined  && (
          <Button onClick={handleNavigateToLogin} className={styles.btn}>
            Get Started
          </Button>
        )}
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
        <CategoriesCard handleClose={() => setIsCardVisible(false)} />
      </Modal>
    </nav>
  );
};

const navItems = [
  { id: 1, name: "Market", route: "/market" },
  { id: 2, name: "Directory", route: "/directory" },
  { id: 3, name: "Jobs", route: "/jobs" },
  { id: 4, name: "About Us", route: "/about-us" },
  { id: 5, name: "Contact Us", route: "/contact-us" },
  { id: 6, name: "FAQ", route: "/faq" },
];

export default Header;
