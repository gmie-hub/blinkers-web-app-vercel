// import Icon from "/Container.svg";
// import styles from "./styles.module.scss";
// import { useState } from "react";
// import { Tabs, TabsProps } from "antd";
// import MyBusinesses from "./myBusinesses";

// const Profile = () => {
//   const [activeKey, setActiveKey] = useState("1");

// console.log(activeKey)
//   const items: TabsProps["items"] = [
//     {
//       key: "1",
//       label: "Profile Details",
//       // children: <Details productDetailsData={productDetailsData} />,
//     },
//     {
//       key: "2",
//       label: "My Businesses",
//       children: <MyBusinesses />,
//     },
//     {
//       key: "3",
//       label: "My Subscription",
//     //   children: <BasicInformation />,
//     },
//     {
//       key: "4",
//       label: "My Applications",
//       // children: <Reviews limit={3} />,
//     },
//     {
//       key: "5",
//       label: "Favorites",
//       // children: <Reviews limit={3} />,
//     },
//     {
//       key: "6",
//       label: "Settings",
//       // children: <Reviews limit={3} />,
//     },
//   ];
//   const handleTabChange = (key: string) => {
//     setActiveKey(key);
//   };
//   return (
//     <>
//       <div className="wrapper">
//         <div className={styles.container}>
//           <div
//             className={styles.image}
//             style={{
//               backgroundImage: `url(${Icon})`, // Ensure you use the correct image reference
//             }}
//           >
//             <div className={styles.home}>
//               <p className={styles.picHead}>Profile</p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <Tabs
//             className={styles.tabs}
//             defaultActiveKey="1"
//             onChange={handleTabChange}
//             items={items}
//           />
//         </div>

//       </div>
//     </>
//   );
// };
// export default Profile;

import Icon from "/Container.svg";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";
import { Tabs, TabsProps } from "antd";
import MyBusinesses from "./myBusinesses";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [activeKey, setActiveKey] = useState(() => {
    // If id is available, use it; otherwise, fallback to localStorage or "1"
    return id || localStorage.getItem("activeTabKeyProfile") || "1";
  });


  // Update localStorage whenever the active key changes
//   useEffect(() => {
//     localStorage.setItem("activeTabKeyProfile", activeKey);
//   }, [activeKey]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Profile Details",
      // children: <Details productDetailsData={productDetailsData} />,
    },
    {
      key: "2",
      label: "My Businesses",
      children: <MyBusinesses />,
    },
    {
      key: "3",
      label: "My Subscription",
      // children: <BasicInformation />,
    },
    {
      key: "4",
      label: "My Applications",
      // children: <Reviews limit={3} />,
    },
    {
      key: "5",
      label: "Favorites",
      // children: <Reviews limit={3} />,
    },
    {
      key: "6",
      label: "Settings",
      // children: <Reviews limit={3} />,
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    localStorage.setItem("activeTabKeyProfile", key);


  };

  return (
    <>
      <div className="wrapper">
        <div className={styles.container}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${Icon})`, // Ensure you use the correct image reference
            }}
          >
            <div className={styles.home}>
              <p className={styles.picHead}>Profile</p>
            </div>
          </div>
        </div>

        <div>
          <Tabs
            className={styles.tabs}
            activeKey={activeKey} // Use the activeKey from state
            onChange={handleTabChange}
            items={items}
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
