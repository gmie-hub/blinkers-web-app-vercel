// import { useEffect, useState } from "react";
// import { Image, Modal, Dropdown, Menu } from "antd";
// import BlinkersLogo from "../../assets/Logo.svg";
// import { NavLink, useNavigate } from "react-router-dom";
// import styles from "./styles.module.scss";
// import Button from "../../customs/button/button";
// import CategoriesCard from "../../screens/home/category";
// import Image8 from "../../assets/cat1.svg";
// import NotyIcon from "../../assets/notyIcon.svg";
// import ChatIcon from "../../assets/chatyicon.svg";
// import ProfileIcon from "../../assets/Avatarprofile.svg";
// import { userAtom } from "../../utils/store";
// import { useAtom } from "jotai";
// import { logout } from "../../utils/logout";
// import { isCurrentDateGreaterThan } from "../../utils";
// import { jwtDecode } from "jwt-decode";
// import { getUserNotifications, ReadNotification } from "../../screens/request";
// import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

// const Header = () => {
//   const [isCardVisible, setIsCardVisible] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(true);
//   const [user] = useAtom(userAtom);
//   const queryClient = useQueryClient();

//   const token = user?.security_token;

//   const [getAllUserNotificationQuery] = useQueries({
//     queries: [
//       {
//         queryKey: ["get-all-notification"],
//         queryFn: () => getUserNotifications(user?.id, 0),
//         retry: 0,
//         refetchOnWindowFocus: false,
//       },
//     ],
//   });

//   const notifyData = getAllUserNotificationQuery?.data?.data?.data;
//   const notifyTotal = getAllUserNotificationQuery?.data?.data?.total;

//   useEffect(() => {
//     try {
//       const decoded: any = jwtDecode(token!);
//       const date = new Date(decoded.exp * 1000);
//       const expDate = date?.toUTCString();
//       if (isCurrentDateGreaterThan(expDate)) {
//         logout();
//         console.log("jummy");
//       }
//     } catch (error) {
//       console.error("Invalid token", error);
//     }
//   }, [token]);

//   const handleNavigateToLogin = () => {
//     navigate("/login");
//   };

//   const handleNavigateToSell = () => {
//     if (user?.role === "2" || user?.business !== null) {
//       navigate("/create-ad");
//     } else {
//       // navigate("/seller-signUp");
//       navigate("/seller-verification");
//     }
//   };

//   const handleNavigateToProfile = () => {
//     // if(user?.business === null)
//     navigate("/profile");
//   };

//   const handleCategoryClick = () => {
//     setIsCardVisible(!isCardVisible);
//     setIsOpen(!isOpen);
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const profileMenu = (
//     <Menu>
//       <Menu.Item key="1" onClick={handleNavigateToProfile}>
//         View Profile
//       </Menu.Item>
//       <Menu.Item key="2" onClick={logout}>
//         Logout
//       </Menu.Item>
//     </Menu>
//   );

//   const notificationMenu = (
//     <Menu style={{ maxHeight: 250, overflowY: "auto", width: 300 }}>
//       {notifyData && notifyData.length > 0 ? (
//         <>
//           {notifyData
//             .slice(0, 5)
//             .map((noty: NotificationDatum, index: number) => (
//               //   <Menu.Item key={index} onClick={()=>{navigate(`/notifications/${noty?.id}`)
//               //   readNotificationHandler(noty?.id)
//               // }}>{noty.title}</Menu.Item>

//               <Menu.Item
//                 key={index}
//                 onClick={() => {
//                   navigate(`/notifications/${noty?.id}`);
//                   readNotificationHandler(noty?.id);
//                 }}
//               >
//                 {noty.title.length > 40
//                   ? noty.title.slice(0, 40) + "..."
//                   : noty.title}
//               </Menu.Item>
//             ))}
//           {notifyData.length > 0 && (
//             <Menu.Item
//               key="footer"
//               disabled
//               style={{ cursor: "default", padding: "8px 12px" }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   fontWeight: 500,
//                 }}
//               >
//                 <span>Total: {notifyTotal}</span>
//                 <span
//                   style={{ color: "#1890ff", cursor: "pointer" }}
//                   onClick={() => navigate(`/notifications`)}
//                 >
//                   View All
//                 </span>
//               </div>
//             </Menu.Item>
//           )}
//         </>
//       ) : (
//         <>
//           <Menu.Item disabled>No new notifications</Menu.Item>
//           <Menu.Item>
//             {" "}
//             <span
//               style={{ color: "#1890ff", cursor: "pointer" }}
//               onClick={() => navigate(`/notifications`)}
//             >
//               View previous Notificatons
//             </span>
//           </Menu.Item>
//         </>
//       )}
//     </Menu>
//   );

//   const readNotificationMutation = useMutation({
//     mutationFn: ReadNotification,
//     mutationKey: ["read-notification"],
//   });
//   const readNotificationHandler = async (id: number) => {
//     const payload = {
//       ids: [id],
//     };

//     try {
//       await readNotificationMutation.mutateAsync(payload, {
//         onSuccess: () => {
//           console.log("Notification marked as read");
//           // Maybe refetch notifications or show a success message
//           queryClient.refetchQueries({
//             queryKey: ["get-all-notification"],
//           });
//         },
//         onError: (error) => {
//           console.error("Error reading notification", error);
//         },
//       });
//     } catch (error) {
//       console.error("Unexpected error", error);
//     }
//   };

//   return (
//     <nav className={styles.container}>
//       <Image src={BlinkersLogo} className={styles.logo} preview={false} />

//       {/* Menu Button for Mobile */}
//       <button className={styles.menuButton} onClick={toggleMenu}>
//         {isMenuOpen ? "✖" : "☰"}
//       </button>

//       {/* Navigation Links */}
//       <div
//         className={`${styles.middleNav} ${isMenuOpen ? styles.showMenu : ""}`}
//       >
//         <NavLink
//           onClick={() => {
//             setIsMenuOpen(false);
//           }}
//           to=""
//           className={({ isActive }) =>
//             isActive ? styles.activeNavLink : styles.navLink
//           }
//         >
//           Home
//         </NavLink>

//         <span className={styles.navLink} onClick={handleCategoryClick}>
//           Categories
//           <Image
//             src={Image8}
//             alt="Toggle Icon"
//             className={`${styles.icon} ${isOpen ? styles.rotate : ""}`}
//             preview={false}
//           />
//         </span>

//         {navItems.map((item) => (
//           <NavLink
//             onClick={() => {
//               setIsMenuOpen(false);
//             }}
//             key={item.id}
//             to={item.route}
//             className={({ isActive }) =>
//               isActive ? styles.activeNavLink : styles.navLink
//             }
//           >
//             {item.name}
//           </NavLink>
//         ))}

//         {/* Get Started button - Displayed under nav items on small screens */}
//         {user?.email !== undefined && isMenuOpen && (
//           <>
//             <div className={styles.loggedInIcons}>
//               <Dropdown overlay={notificationMenu} trigger={["click"]}>
//                 <div
//                   className={styles.notificationWrapper}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <img
//                     src={NotyIcon}
//                     alt="Notifications"
//                     className={styles.chatIcon}
//                   />
//                   {notifyTotal > 0 && (
//                     <span className={styles.notifyBadge}>
//                       {notifyTotal > 10 ? "9+" : notifyTotal}
//                     </span>
//                   )}
//                 </div>
//               </Dropdown>
//               <img src={ChatIcon} alt="Messages" className={styles.chatIcon} />
//             </div>
//             <div className={styles.mobileButtonWrapper}>
//               <Button onClick={handleNavigateToSell} className={styles.btn}>
//                 Sell
//               </Button>
//             </div>
//           </>
//         )}
//         {user?.email === undefined && isMenuOpen && (
//           <div className={styles.mobileButtonWrapper}>
//             <Button
//               onClick={() => {
//                 handleNavigateToLogin();
//               }}
//               className={styles.btn}
//             >
//               Get Started
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Right Nav - Shown only on large screens */}
//       <div className={styles.rightNav}>
//         {user?.email !== undefined && (
//           <div className={styles.loggedInIcons}>
//             <div className={styles.notificationWrapper}>
//               <Dropdown overlay={notificationMenu} trigger={["click"]}>
//                 <div
//                   className={styles.notificationWrapper}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <img
//                     src={NotyIcon}
//                     alt="Notifications"
//                     className={styles.chatIcon}
//                   />
//                   {notifyTotal > 0 && (
//                     <span className={styles.notifyBadge}>
//                       {notifyTotal > 10 ? "9+" : notifyTotal}
//                     </span>
//                   )}
//                 </div>
//               </Dropdown>
//             </div>
//             <img src={ChatIcon} alt="Messages" className={styles.chatIcon} />
//             <Dropdown overlay={profileMenu} trigger={["click"]}>
//               <img
//                 src={ProfileIcon}
//                 alt="Profile"
//                 className={styles.profileIcon}
//                 style={{ cursor: "pointer" }}
//               />
//             </Dropdown>
//             <Button
//               onClick={handleNavigateToSell}
//               className={`${styles.btn} ${styles.sellButton}`}
//             >
//               Sell
//             </Button>
//           </div>
//         )}
//         {user?.email === undefined && (
//           <Button onClick={handleNavigateToLogin} className={styles.btn}>
//             Get Started
//           </Button>
//         )}
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
//         <CategoriesCard handleClose={() => setIsCardVisible(false)} />
//       </Modal>
//     </nav>
//   );
// };

// const navItems = [
//   { id: 1, name: "Market", route: "/market" },
//   { id: 2, name: "Directory", route: "/directory" },
//   { id: 3, name: "Jobs", route: "/jobs" },
//   { id: 4, name: "About Us", route: "/about-us" },
//   { id: 5, name: "Contact Us", route: "/contact-us" },
//   { id: 6, name: "FAQ", route: "/faq" },
// ];

// export default Header;

const routeData = [
  { name: "HOME PAGE", value: "home_page", route: "/" },
  { name: "ALL ADS", value: "all_ads", route: "/market" },
  { name: "POST ADS", value: "post_ads", route: "/create-ad" },
  { name: "REGISTER AS SELLER", value: "register_as_seller", route: "/seller-signUp" },

  // Profile Tabs
  { name: "MY ADS", value: "my_ads", route: "/profile", tabKey: "7" },
  { name: "MY FAVORITE", value: "my_favorite", route: "/profile", tabKey: "8" },
  { name: "MY APPLICANT PROFILE", value: "my_applicant_profile", route: "/profile", tabKey: "1" },
  { name: "MY JOBS SELLER", value: "my_jobs_seller", route: "/profile", tabKey: "6" },
  { name: "MY JOBS BUSINESS OWNER", value: "my_jobs_business_owner", route: "/profile", tabKey: "6" },
  { name: "MY BUSINESS PROFILE", value: "my_business_profile", route: "/profile", tabKey: "2" },
  { name: "MY PROFILE", value: "my_profile", route: "/profile", tabKey: "1" },
  { name: "EDIT JOB", value: "edit_job", route: "/profile", tabKey: "6"  },

  // Others
  { name: "REVIEWS", value: "reviews", route: "/reviews" },
  { name: "AUDIENCE", value: "audience", route: "/audience" },
  { name: "MY PLAN", value: "my_plan", route: "/plans" },
  { name: "CHAT", value: "chat", route: "/chat" },
  { name: "VIEW APPLICANTS", value: "view_applicants", route: "/jobs/applicants" },
  { name: "CATEGORIES PAGE", value: "categories_page", route: "/categories" },

  { name: "POST A JOB", value: "post_a_job", route: "/post-job" },
  { name: "REGISTER AS APPLICANT", value: "register_as_applicant", route: "/job/register-as-applicant" },
  { name: "CREATE BUSINESS", value: "create_business", route: "/job/add-business" },
  { name: "DIRECTORY HOMEPAGE", value: "directory_homepage", route: "/directory" },
  { name: "JOB HOMEPAGE", value: "job_homepage", route: "/jobs" },
  { name: "HELP", value: "help", route: "/contact-us" },
];

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
import { getApplicantsbyId, getUserNotifications, ReadNotification } from "../../screens/request";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [user] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const token = user?.security_token;

  // const getRouteFromNotification = (value: string) => {
  //   const match = routeData.find((item) => item.value === value);
  //   return match?.route || "/"; // default to home if not matched
  // };

  const getRouteFromNotification = (notificationValue: string) => {
  const match = routeData.find(item => item.value === notificationValue);

  if (match) {
    if (match.route === "/profile" && match.tabKey) {
      localStorage.setItem("activeTabKeyProfile", match.tabKey);
    }

    navigate(match.route);
  } else {
    console.warn("No matching route for notification:", notificationValue);
  }
};

  const [getAllUserNotificationQuery,getProfileQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-all-notification"],
        queryFn: () => getUserNotifications(user?.id, 0),
        retry: 0,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["get-profile"],
        queryFn: () => getApplicantsbyId(user?.id!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?.id,
      },
    ],
  });

  const profileData = getProfileQuery?.data?.data;


  const notifyData = getAllUserNotificationQuery?.data?.data?.data;
  const notifyTotal = getAllUserNotificationQuery?.data?.data?.total;

  useEffect(() => {
    try {
      const decoded: any = jwtDecode(token!);
      const date = new Date(decoded.exp * 1000);
      const expDate = date?.toUTCString();
      if (isCurrentDateGreaterThan(expDate)) {
        logout();
      }
    } catch (error) {
      console.error("Invalid token", error);
    }
  }, [token]);

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToSell = () => {

    if(user?.role !=='2' &&  user?.business === null){
      navigate("/seller-verification");
    }
    else if(profileData?.subscription?.pricing?.plan?.name?.toLowerCase() === 'free' || profileData?.subscription?.is_active === 0)  {
      navigate('/pricing')
    }
    else{
    //  if (user?.role === "2" || user?.business !== null) {
      navigate("/create-ad");
     }
    // } else {
    //   navigate("/seller-verification");
    // }
  };

  const handleNavigateToProfile = () => {
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
          {notifyData
            .slice(0, 5)
            .map((noty: NotificationDatum, index: number) => (
              <Menu.Item
                key={index}
                onClick={() => {
                  // navigate(`/notifications/${noty?.id}`);
                  // const route = getRouteFromNotification(noty?.notification?.route);
                  getRouteFromNotification(noty?.notification?.route)
                  readNotificationHandler(noty?.id);
                  setNotificationDropdownOpen(false);
                
                }}
              >
                {noty.title.length > 40
                  ? noty.title.slice(0, 40) + "..."
                  : noty.title}
              </Menu.Item>
            ))}
          {notifyData.length > 0 && (
            <Menu.Item
              key="footer"
              disabled
              style={{ cursor: "default", padding: "8px 12px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 500,
                }}
              >
                <span>Total: {notifyTotal}</span>
                <span
                  style={{ color: "#1890ff", cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/notifications`);
                    setNotificationDropdownOpen(false); // ✅ Close on "View All"
                  }}
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
          <Menu.Item>
            <span
              style={{ color: "#1890ff", cursor: "pointer" }}
              onClick={() => {
                navigate(`/notifications`);
                setNotificationDropdownOpen(false); // ✅ Close on fallback
              }}
            >
              View previous Notifications
            </span>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  const readNotificationMutation = useMutation({
    mutationFn: ReadNotification,
    mutationKey: ["read-notification"],
  });

  const readNotificationHandler = async (id: number) => {
    const payload = { ids: [id] , user_id:user?.id };

    try {
      await readNotificationMutation.mutateAsync(payload, {
        onSuccess: () => {
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
      <button className={styles.menuButton} onClick={toggleMenu}>
        {isMenuOpen ? "✖" : "☰"}
      </button>

      <div
        className={`${styles.middleNav} ${isMenuOpen ? styles.showMenu : ""}`}
      >
        <NavLink
          onClick={() => setIsMenuOpen(false)}
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
            onClick={() => setIsMenuOpen(false)}
            key={item.id}
            to={item.route}
            className={({ isActive }) =>
              isActive ? styles.activeNavLink : styles.navLink
            }
          >
            {item.name}
          </NavLink>
        ))}

        {user?.email !== undefined && isMenuOpen && (
          <>
            <div className={styles.loggedInIcons}>
              <Dropdown
                overlay={notificationMenu}
                trigger={["click"]}
                open={notificationDropdownOpen}
                onOpenChange={(flag) => setNotificationDropdownOpen(flag)}
              >
                <div
                  className={styles.notificationWrapper}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={NotyIcon}
                    alt="Notifications"
                    className={styles.chatIcon}
                  />
                  {notifyTotal > 0 && (
                    <span className={styles.notifyBadge}>
                      {notifyTotal > 10 ? "9+" : notifyTotal}
                    </span>
                  )}
                </div>
              </Dropdown>
              <img src={ChatIcon} alt="Messages" className={styles.chatIcon} />
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
            <Button onClick={handleNavigateToLogin} className={styles.btn}>
              Get Started
            </Button>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {user?.email !== undefined ? (
          <div className={styles.loggedInIcons}>
            <Dropdown
              overlay={notificationMenu}
              trigger={["click"]}
              open={notificationDropdownOpen}
              onOpenChange={(flag) => setNotificationDropdownOpen(flag)}
            >
              <div
                className={styles.notificationWrapper}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={NotyIcon}
                  alt="Notifications"
                  className={styles.chatIcon}
                />
                {notifyTotal > 0 && (
                  <span className={styles.notifyBadge}>
                    {notifyTotal > 10 ? "9+" : notifyTotal}
                  </span>
                )}
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
            <Button
              onClick={handleNavigateToSell}
              className={`${styles.btn} ${styles.sellButton}`}
            >
              Sell
            </Button>
          </div>
        ) : (
          <Button onClick={handleNavigateToLogin} className={styles.btn}>
            Get Started
          </Button>
        )}
      </div>

      <Modal
        open={isCardVisible}
        onCancel={handleCategoryClick}
        footer={null}
        closable={false}
        centered
        width={1300}
        style={{ top: "40px" }}
        bodyStyle={{ paddingBlockStart: "5px" }}
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
  { id: 4, name: "Pricing", route: "/pricing" },
  { id: 5, name: "About Us", route: "/about-us" },
  { id: 6, name: "Contact Us", route: "/contact-us" },
  { id: 7, name: "FAQ", route: "/faq" },
];

export default Header;
