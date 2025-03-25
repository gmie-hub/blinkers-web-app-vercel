import { useEffect, useState } from "react";
import SmallScreen from "./smallScreenSellerDetails";
import BigScreen from "./productDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  AddToFav,
  FollowBusiness,
  FollowSeller,
  getApplicantsbyId,
  getBusinessById,
  getFlaggedSellerBySeller_idUser_id,
  getFollowersByBusiness_id,
  getFollowersByUser_id,
  getProductDetails,
} from "../../../request";
import { App } from "antd";
import RouteIndicator from "../../../../customs/routeIndicator";
import { userAtom } from "../../../../utils/store";
import { useAtomValue } from "jotai";
import CustomSpin from "../../../../customs/spin";
import { errorMessage } from "../../../../utils/errorMessage";

const Main = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width
  const { id } = useParams();
  const user = useAtomValue(userAtom);
  const queryClient = useQueryClient();
  const { notification } = App.useApp();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [businessId, setBusinessId] = useState<null | number>();
  const [sellerId, setSellerId] = useState<null | number>();

  console.log(sellerId, businessId, "sellerId");
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures it only runs once on mount

  const [
    getProductDetailsQuery,
    getSellersFollowersQuery,
    getBusinessDetailsQuery,
    getBusinessFollowersQuery,
    getUserDetailsQuery,
    getFlaggedSellerQuery,

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
        queryKey: ["get-sellers-followers"],
        queryFn: () => getFollowersByUser_id(user?.id ?? 0, sellerId!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?.id,
      },
      {
        queryKey: ["get-business-details"],
        queryFn: () => getBusinessById(businessId!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!businessId,
      },
      {
        queryKey: ["get-business-followers", businessId],
        queryFn: () => getFollowersByBusiness_id(user?.id ?? 0, businessId!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?.id,
      },
      {
        queryKey: ["get-sellers-details", sellerId],
        queryFn: () => getApplicantsbyId(sellerId!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!sellerId,
      },
      {
        queryKey: ["get-flagged-sellers"],
        queryFn: () =>
          getFlaggedSellerBySeller_idUser_id(user?.id ?? 0, sellerId!),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!sellerId,
      },
   
    ],
  });

  const addToFavMutation = useMutation({
    mutationFn: AddToFav,
    mutationKey: ["add-fav"],
  });
  

  const addToFavHandler = async () => {
    if (!id) return;


    const payload: Partial<AddToFav> = {
      add_id: id,
      status: productDetailsData?.isFavourite ? 0 : 1,
    };

    try {
      await addToFavMutation.mutateAsync(payload, {
        onSuccess: () => {
          // notification.success({
          //   message: "Success",
          //   description: data?.message,
          // });
          queryClient.refetchQueries({
            queryKey: ["get-product-details"],
          });
        },
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occurred",
      });
    }
  };

  const hasUserFlaggedSeller = getFlaggedSellerQuery?.data?.data?.data?.some(
    (item) => item?.user_id === user?.id
  );

  const isUserFollowingBusiness =
    getBusinessFollowersQuery?.data?.data?.data?.some(
      (item) => item?.follower_id === user?.id
    );

  const isUserFollowingSeller =
    getSellersFollowersQuery?.data?.data?.data?.some(
      (item) => item?.follower_id === user?.id
    );
  console.log(isUserFollowingSeller, "isUserFollowingBusiness");

  const productDetailsData = getProductDetailsQuery?.data?.data;
  const productDetailsError = getProductDetailsQuery?.error as AxiosError;
  const productDetailsErrorMessage =
    productDetailsError?.message ||
    "An error occurred. Please try again later.";

  const businessDetailsData = getBusinessDetailsQuery?.data?.data;
  const profileDetailsData = getUserDetailsQuery?.data?.data;

  useEffect(() => {
    if (getProductDetailsQuery) {
      setBusinessId(productDetailsData?.business_id ?? 0);
      setSellerId(productDetailsData?.user_id ?? 0);
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
      action: isUserFollowingBusiness ? "unfollow" : "follow",
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
    } catch (error) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occur",
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

  const followSellersMutation = useMutation({
    mutationFn: FollowSeller,
    mutationKey: ["follow-seller"],
  });

  const followSellerHandler = async () => {
    const payload: Partial<FollowBusiness> = {
      user_id: sellerId!,
      action: isUserFollowingSeller ? "unfollow" : "follow",
    };

    try {
      await followSellersMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          notification.success({
            message: "Success",
            description: data?.message,
          });
          queryClient.refetchQueries({
            queryKey: ["get-sellers-followers"],
          });
        },
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: errorMessage(error) || "An error occur",
      });
    }
  };

  const handleFollowSeller = () => {
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
      followSellerHandler();
    }
  };

  return (
    <>
      <div className="wrapper">
        <RouteIndicator showBack />
      </div>

      {getProductDetailsQuery?.isLoading ? (
        <CustomSpin />
      ) : getProductDetailsQuery?.isError ? (
        <h1 style={{ textAlign: "center" }} className="error">
          {productDetailsErrorMessage}
        </h1>
      ) : (
        <div>
          {windowWidth < 1024 ? (
            <SmallScreen
              handleFollowBusiness={handleFollowBusiness}
              handleFollowSeller={handleFollowSeller}
              productDetailsData={productDetailsData}
              followBusinessMutation={followBusinessMutation?.isPending}
              followSellersMutation={followSellersMutation?.isPending}
              isUserFollowingBusiness={isUserFollowingBusiness}
              isUserFollowingSeller={isUserFollowingSeller}
              businessDetailsData={businessDetailsData}
              profileDetailsData={profileDetailsData}
              hasUserFlaggedSeller={hasUserFlaggedSeller}
              addToFavHandler={addToFavHandler}
            /> // Render SmallScreen on small screens
          ) : (
            <BigScreen
              handleFollowSeller={handleFollowSeller}
              handleFollowBusiness={handleFollowBusiness}
              productDetailsData={productDetailsData}
              followSellersMutation={followSellersMutation?.isPending}
              followBusinessMutation={followBusinessMutation?.isPending}
              isUserFollowingBusiness={isUserFollowingBusiness}
              isUserFollowingSeller={isUserFollowingSeller}
              businessDetailsData={businessDetailsData}
              profileDetailsData={profileDetailsData}
              hasUserFlaggedSeller={hasUserFlaggedSeller}
              addToFavHandler={addToFavHandler}
            /> // Render BigScreen on larger screens
          )}
        </div>
      )}
    </>
  );
};

export default Main;
