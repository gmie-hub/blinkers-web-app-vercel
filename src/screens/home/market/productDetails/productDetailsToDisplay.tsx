import { useEffect, useState } from "react";
import SmallScreen from "./smallScreenSellerDetails";
import BigScreen from "./productDetails";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getProductDetails } from "../../../request";
import { Spin } from "antd";
import RouteIndicator from "../../../../customs/routeIndicator";

const Main = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width
  const { id } = useParams();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures it only runs once on mount

  const [getProductDetailsQuery] = useQueries({
    queries: [
      {
        queryKey: ["get-product-details", id],
        queryFn: () => getProductDetails(parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!id,
      },
    ],
  });

  const productDetailsData = getProductDetailsQuery?.data?.data;
  const productDetailsError = getProductDetailsQuery?.error as AxiosError;
  const productDetailsErrorMessage =
    productDetailsError?.message ||
    "An error occurred. Please try again later.";

  return (
    <>
      <div className="wrapper">
        <RouteIndicator showBack />
      </div>

      {getProductDetailsQuery?.isLoading ? (
        <Spin style={{ display: "flex", justifyContent: "center" }} />
      ) : getProductDetailsQuery?.isError ? (
        <h1 style={{ textAlign: "center" }} className="error">
          {productDetailsErrorMessage}
        </h1>
      ) : (
        <div>
          {windowWidth < 1024 ? (
            <SmallScreen   productDetailsData={productDetailsData}/> // Render SmallScreen on small screens
          ) : (
            <BigScreen productDetailsData={productDetailsData} /> // Render BigScreen on larger screens
          )}
        </div>
      )}
    </>
  );
};

export default Main;
