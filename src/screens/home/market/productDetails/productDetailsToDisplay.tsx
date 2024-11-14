// import { useEffect, useState } from "react";
// import SmallScreen from "./smallScreenSellerDetails";
// import BigScreen from "./productDetails";

// const Main = () => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     // On small screens, ensure isFilterVisible is false by default
//     if (windowWidth < 1024) {
//       //show <SmallScreen Copmpnent/>
//       <SmallScreen/>
//     } else {
//       //show <big Screen Copmpnent/>
//       <BigScreen/>
//     }

//     return () => window.removeEventListener("resize", handleResize);
//   }, [windowWidth]);

//   return <div className="wrapper">
//  if (windowWidth < 1024) {
//       //show <SmallScreen Copmpnent/>
//       <SmallScreen/>
//     } else {
//       //show <big Screen Copmpnent/>
//       <BigScreen/>
//     }


//   </div>;
// };
// export default Main;


import { useEffect, useState } from "react";
import SmallScreen from "./smallScreenSellerDetails";
import BigScreen from "./productDetails";

const Main = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div>
      {windowWidth < 1024 ? (
        <SmallScreen /> // Render SmallScreen on small screens
      ) : (
        <BigScreen /> // Render BigScreen on larger screens
      )}
    </div>
  );
};

export default Main;
