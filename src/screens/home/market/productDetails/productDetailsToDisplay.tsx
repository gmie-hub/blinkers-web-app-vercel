import { useEffect, useState } from "react";
import SmallScreen from "./smallScreenSellerDetails";
import BigScreen from "./productDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  FollowBusiness,
  getBusinessById,
  getFollowersByUser_id,
  getProductDetails,
} from "../../../request";
import { App, Spin } from "antd";
import RouteIndicator from "../../../../customs/routeIndicator";
import { userAtom } from "../../../../utils/store";
import { useAtomValue } from "jotai";

const Main = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width
  const { id } = useParams();
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [businessId, setBusinessId] = useState(14);
  const [sellerId, setSellerId] = useState<null | number>();

  console.log(sellerId,businessId, "sellerId");
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures it only runs once on mount

  const [
    getProductDetailsQuery,
    getBusinessFollowersQuery,
    getBusinessDetailsQuery,
  ] = useQueries({
    queries: [
      {
        queryKey: ["get-product-details", id],
        queryFn: () => getProductDetails(parseInt(id!)),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!id,
      },
      {
        queryKey: ["get-business-followers", sellerId],
        queryFn: () => getFollowersByUser_id(sellerId!),
        retry: 0,
        refetchOnWindowFocus: true,
        // enabled: !!sellerId,
      },
      {
        queryKey: ["get-business-details",],
        queryFn: () => getBusinessById(14),
        retry: 0,
        refetchOnWindowFocus: true,
        // enabled: !!businessId,
      },
      // {
      //   queryKey: ["get-sellers-details", sellerId],
      //   queryFn: () => getApplicantsbyId(sellerId!),
      //   retry: 0,
      //   refetchOnWindowFocus: true,
      //   enabled: !!sellerId,
      // },
    ],
  });
  const userExists = getBusinessFollowersQuery?.data?.data?.data?.some(
    (item) => item?.user_id === user?.id
  );

  const productDetailsData = getProductDetailsQuery?.data?.data;
  const productDetailsError = getProductDetailsQuery?.error as AxiosError;
  const productDetailsErrorMessage =
    productDetailsError?.message ||
    "An error occurred. Please try again later.";

  const businessDetailsData = getBusinessDetailsQuery?.data?.data;

  console.log(getBusinessDetailsQuery,'jum')
  useEffect(() => {
    if (getProductDetailsQuery) {
      setBusinessId(productDetailsData?.business_id!);
      setSellerId(productDetailsData?.user_id!);
    }
  }, [
    getProductDetailsQuery,
    getProductDetailsQuery?.refetch,
    getProductDetailsQuery?.isSuccess,
    productDetailsData,
  ]);

  const followBusinessMutation = useMutation({
    mutationFn: FollowBusiness,
    mutationKey: ["follow-business"],
  });

  const followBusinessHandler = async () => {
    const payload: Partial<FollowBusiness> = {
      business_id: productDetailsData?.business_id || 0,
      user_id: user?.id,
      action: "follow",
    };

    try {
      await followBusinessMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-business-followers"],
          });
        },
      });
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: "An error occur",
        // errorMessage(error) ,
      });
    }
  };
  const handleFollowBusiness = () => {
    if (!user) {
      notification.error({
        message: "Log in required",
        description: "You need to log in to access this page!",
        placement: "top",
        duration: 4,
        onClose: () => {
          navigate(`/login?redirect=${currentPath}`);
        },
      });
    } else {
      followBusinessHandler();
    }
  };

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
            <SmallScreen
              handleFollowBusiness={handleFollowBusiness}
              productDetailsData={productDetailsData}
              followBusinessMutation={followBusinessMutation?.isPending}
              userExists={userExists}
              businessDetailsData={businessDetailsData}
            /> // Render SmallScreen on small screens
          ) : (
            <BigScreen
              handleFollowBusiness={handleFollowBusiness}
              productDetailsData={productDetailsData}
              followBusinessMutation={followBusinessMutation?.isPending}
              userExists={userExists}
              businessDetailsData={businessDetailsData}
            /> // Render BigScreen on larger screens
          )}
        </div>
      )}
    </>
  );
};

export default Main;
