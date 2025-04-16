import { useEffect, useState } from "react";
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
import { userAtom } from "../../utils/store";
import { useAtom } from "jotai";
import { logout } from "../../utils/logout";
import { isCurrentDateGreaterThan } from "../../utils";
import { jwtDecode } from "jwt-decode";
import { getUserNotifications, ReadNotification } from "../../screens/request";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAtom(userAtom);
  const queryClient = useQueryClient();

  const token = user?.security_token;

  const [getAllUserNotificationQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-notification"],
        queryFn: () => getUserNotifications(user?.id, 0),
        retry: 0,
        refetchOnWindowFocus: false,
      },
    ],
  });
  
  const notifyData = getAllUserNotificationQuery?.data?.data?.data;
const  notifyTotal = getAllUserNotificationQuery?.data?.data?.total;


  useEffect(() => {
    try {
      const decoded: any = jwtDecode(token!);
      const date = new Date(decoded.exp * 1000);
      const expDate = date?.toUTCString();
      if (isCurrentDateGreaterThan(expDate)) {
        logout();
        console.log("jummy");
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }, [token]);

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToSell = () => {
    if (user?.role === "2" || user?.business !== null) {
      navigate("/create-ad");
    } else {
      // navigate("/seller-signUp");
      navigate("/seller-verification");
    }
  };

  const handleNavigateToProfile = () => {
    // if(user?.business === null)
    navigate("/profile");
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
      <Menu.Item key="2" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );


    const notificationMenu = (
      <Menu style={{ maxHeight: 250, overflowY: "auto", width: 300 }}>
        {notifyData && notifyData.length > 0 ? (
          <>
            {notifyData.slice(0, 5).map((noty: NotificationDatum, index: number) => (
              <Menu.Item key={index} onClick={()=>{navigate(`/notifications/${noty?.id}`)
              readNotificationHandler(noty?.id)
            }}>{noty.title}</Menu.Item>
            ))}
            {notifyData.length > 0 && (
              <Menu.Item key="footer" disabled style={{ cursor: "default", padding: "8px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 500 }}>
                  <span>Total: {notifyTotal}</span>
                  <span
                    style={{ color: "#1890ff", cursor: "pointer" }}
                    onClick={() => navigate(`/notifications`)}
                  >
                    View All
                  </span>
                </div>
              </Menu.Item>
            )}
          </>
        ) : (
          <>
          <Menu.Item disabled>No new notifications</Menu.Item>
          <Menu.Item > <span
          style={{ color: "#1890ff", cursor: "pointer" }}
          onClick={() => navigate(`/notifications`)}
        >
          View  previous Notificatons
        </span></Menu.Item>
        </>
        )}
      </Menu>
    );
    

    const readNotificationMutation = useMutation({
      mutationFn: ReadNotification,
      mutationKey: ["read-notification"],
    });
    const readNotificationHandler = async (id:number) => {
      const payload = {
        ids: [id],
      };
    
      try {
        await readNotificationMutation.mutateAsync(payload, {
          onSuccess: () => {
            console.log("Notification marked as read");
            // Maybe refetch notifications or show a success message
            queryClient.refetchQueries({
              queryKey: ["get-all-notification"],
            });
          },
          onError: (error) => {
            console.error("Error reading notification", error);
          },
        });
      } catch (error) {
        console.error("Unexpected error", error);
      }
    };
    

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
        {user?.email !== undefined && isMenuOpen && (
          <>
            <div className={styles.loggedInIcons}>
            <Dropdown overlay={notificationMenu} trigger={["click"]}>
                <div className={styles.notificationWrapper} style={{ cursor: "pointer" }}>
                  <img
                    src={NotyIcon}
                    alt="Notifications"
                    className={styles.chatIcon}
                  />
                  {notifyTotal > 0 &&<span className={styles.notifyBadge}>{notifyTotal > 10 ? '9+' : notifyTotal }</span>}
                  </div>
              </Dropdown>
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
              <Button onClick={handleNavigateToSell} className={styles.btn}>
                Sell
              </Button>
            </div>
          </>
        )}
        {user?.email === undefined && isMenuOpen && (
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
        {user?.email !== undefined && (
          <div className={styles.loggedInIcons}>
         {/* <Dropdown overlay={notificationMenu} trigger={["click"]}>
                <div className={styles.notificationWrapper} style={{ cursor: "pointer" }}>
                  <img
                    src={NotyIcon}
                    alt="Notifications"
                    className={styles.chatIcon}
                  />
                  <span className={styles.notifyBadge}>{notifyTotal}</span>
                </div>
              </Dropdown> */}
            <div className={styles.notificationWrapper}>
            <Dropdown overlay={notificationMenu} trigger={["click"]}>
                <div className={styles.notificationWrapper} style={{ cursor: "pointer" }}>
                  <img
                    src={NotyIcon}
                    alt="Notifications"
                    className={styles.chatIcon}
                  />
                  {notifyTotal > 0 &&<span className={styles.notifyBadge}>{notifyTotal > 10 ? '9+' : notifyTotal }</span>}
                </div>
              </Dropdown>
              {/* <img
                src={NotyIcon}
                alt="Notifications"
                className={styles.chatIcon}
              /> */}
            </div>
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
        {user?.email === undefined && (
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
