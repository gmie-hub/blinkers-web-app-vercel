import { Image, Popover } from "antd";

import BlinkersLogo from "../../assets/Logo.svg";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import Button from "../../customs/button/button";

const Header = () => {
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

        <Popover>
          <Button variant="transparent">Categories</Button>
        </Popover>

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
