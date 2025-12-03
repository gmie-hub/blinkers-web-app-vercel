// import styles from "./index.module.scss";
// import { Image, Modal, Pagination } from "antd";
// import Star from "../../../../assets/Vector.svg";
// import StarYellow from "../../../../assets/staryellow.svg";
// import Product3 from "../../../../assets/Image (1).svg";
// import favorite from "../../../../assets/Icon + container.svg";
// import redFavorite from "../../../../assets/redfav.svg";
// import { useNavigate } from "react-router-dom";
// import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
// import axios, { AxiosError } from "axios";
// import LocationIcon from "../../../../assets/locationrelated.svg";
// import CustomSpin from "../../../../customs/spin";
// import usePagination from "../../../../hooks/usePagnation";
// import { useEffect, useState } from "react";
// import { countUpTo } from "../../../../utils";
// import { AddToFav, getAllPopularMarket } from "../../../request";
// import { userAtom } from "../../../../utils/store";
// import { useAtomValue } from "jotai";
// import GeneralWelcome from "../marketLogin/marketLogin";



// const ProductList=() => {
//   // const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();
//   const { currentPage, setCurrentPage, onChange, pageNum } = usePagination();
//   // const { notification } = App.useApp();
//   const queryClient = useQueryClient();
//   const user = useAtomValue(userAtom);
//   // const currentPath = location.pathname;
//   const [openLoginModal, setOpenLoginModal] = useState(false);

//   useEffect(() => {
//     if (currentPage !== pageNum) {
//       setCurrentPage(pageNum);
//     }
//   }, [pageNum, currentPage, setCurrentPage]);



//   const favData = {
//     user_id: user?.id,
//   };

//   const getFavapi = axios.create({
//     baseURL: import.meta.env.VITE_GATEWAY_URL,
//     headers: {
//       "Cache-Control": "no-cache",
//       "Content-Type": "application/json",
//       Pragma: "no-cache",
//       Expires: "0",
//       Authorization: `Bearer ${user?.security_token}`, // Get token from localStorage
//     },
//     params: favData,
//   });

//   const getAllFav = async () => {
//     const url = `/ads/fav`;

//     return (await getFavapi.get(url))?.data;
//   };

  
//   const [getAllPopularMarketQuery, getAllFavAds] = useQueries({
//     queries: [
  
//         {
//               queryKey: ["get-popular-ads",currentPage ],
//               queryFn:()=> getAllPopularMarket(currentPage ,50),
//               retry: 0,
//               refetchOnWindowFocus: true,
//             },
//       {
//         queryKey: ["get-al-fav", user?.id],
//         queryFn: getAllFav,
//         retry: 0,
//         refetchOnWindowFocus: true,
//         enabled: !!user?.id,
//       },
//     ],
//   });

//   const favAdvList = getAllFavAds?.data?.data;



//   const marketData = getAllPopularMarketQuery?.data?.data?.data || [];
//   const marketError = getAllPopularMarketQuery?.error as AxiosError;
//   const marketErrorMessage =
//     marketError?.message || "An error occurred. Please try again later.";



//   const handleNavigateToProductDetails = (id: string) => {
//     navigate(`/product-details/${id}`);
//     window.scrollTo(0, 0);
//   };

  
//   const addToFavMutation = useMutation({
//     mutationFn: AddToFav,
//     mutationKey: ["add-fav"],
//   });
//   const favIcons = favAdvList?.map((fav: AddToFav) => fav.id) || [];

//   const addToFavHandler = async (id?: string) => {
//     if (!id) return;
//     const isFav = favIcons.includes(parseInt(id));

//     const payload: Partial<AddToFav> = {
//       add_id: id,
//       status: isFav ? 0 : 1,
//     };

//     try {
//       await addToFavMutation.mutateAsync(payload, {
//         onSuccess: () => {
//           // notification.success({
//           //   message: "Success",
//           //   description: data?.message,
//           // });
//           queryClient.refetchQueries({
//             queryKey: ["get-al-fav"],
//           });
//         },
//       });
//     } catch {
//       setOpenLoginModal(true);
   
//   };

//   return (
//     <>
//       {getAllPopularMarketQuery?.isLoading ? (
//         <CustomSpin />
//       ) : getAllPopularMarketQuery?.isError ? (
//         <h1 className="error">{marketErrorMessage}</h1>
//       ) : (
//         <div>
      
//           <section className={styles.promoImageContainer}>
//             {marketData && marketData?.length > 0 &&(
//               marketData?.map((item, index) => (
//                 <div
//                   className={styles.promoImage}
//                   key={index}
                
//                   onClick={() => handleNavigateToProductDetails(item?.slug)}
//                 >
//                   <div
//                     className={styles.favoriteIcon}
//                     onClick={(event) => {
//                       event.stopPropagation(); // Prevents click from bubbling to parent div
//                       addToFavHandler(item?.id?.toString());
//                     }}
//                   >
//                     <img
//                       width={30}
//                       src={favIcons.includes(item?.id) ? redFavorite : favorite}
//                       alt="Favorite"
//                     />
//                   </div>

//                   <img
//                     className={styles.proImage}
//                     src={item?.cover_image_url || Product3}
//                     alt="Product"
//                   />

//                   <div className={styles.productList}>
//                     <p style={{ color: "#4F4F4F" }}>
//                       {item?.title && item?.title?.length > 20
//                         ? `${item?.title?.slice(0, 20)}...`
//                         : item?.title}
//                     </p>
//                     <div className={styles.info}>
//                       <Image src={LocationIcon} alt="LocationIcon" />
//                       <p>
//                         <span>
//                           {item?.local_govt?.local_government_area &&
//                             item?.local_govt?.local_government_area + ", "}
//                         </span>
//                         <span>{item?.state?.state_name}</span>
//                         {/* <span>
//                         {item?.pickup_address && item?.pickup_address?.length > 32
//                         ? `${item?.pickup_address?.slice(0, 32)}...`
//                         : item?.pickup_address}
//                         </span> */}
//                       </p>
//                     </div>
//                     {/* <span className={styles.trendingdiscount}>
//                       {item?.discount_price &&
//                         `₦${item?.discount_price} `}
//                     </span> */}
//                     <span style={{ color: "#222222", fontWeight: "600" }}>
//                       {/* ₦{item?.price} */}
//                       {item?.discount_price === "" ? (
//                         <span>{`₦${item?.price}`}</span>
//                       ) : (
//                         <span className={styles.canceledText}>
//                           {`₦${item?.price}`}{" "}
//                         </span>
//                       )}
//                       <span>
//                         {" "}
//                         {item?.discount_price && `₦${item?.discount_price} `}
//                       </span>
//                     </span>

//                     <div className={styles.starWrapper}>
//                       {countUpTo(
//                         parseInt(item?.average_rating),
//                         <Image
//                           width={20}
//                           src={StarYellow}
//                           alt="StarYellow"
//                           preview={false}
//                         />,
//                         <Image
//                           width={20}
//                           src={Star}
//                           alt="Star"
//                           preview={false}
//                         />
//                       )}
//                       <span>({item?.total_rating})</span>
//                     </div>
//                   </div>
//                 </div>
//               ))
        
//             )}
//           </section>

//           <Pagination
//             current={currentPage}
//             total={getAllPopularMarketQuery?.data?.data?.total} // Total number of items
//             pageSize={50} // Number of items per page
//             onChange={onChange} // Handle page change
//             showSizeChanger={false} // Hide the option to change the page size
//             style={{
//               marginTop: "20px",
//               textAlign: "center", // Center the pagination
//               display: "flex",
//               justifyContent: "center", // Ensure the pagination is centered
//             }}
//           />
//         </div>
//       )}

//       <Modal
//         open={openLoginModal}
//         onCancel={() => setOpenLoginModal(false)}
//         centered
//         footer={null}
//       >
//         <GeneralWelcome handleCloseModal={() => setOpenLoginModal(false)} />
//       </Modal>
//     </>
//   );
// };

// export default PopularProductList;


import styles from "./index.module.scss";
import { App, Image, Modal, Pagination } from "antd";
import Star from "../../../../assets/Vector.svg";
import StarYellow from "../../../../assets/staryellow.svg";
import Product3 from "../../../../assets/Image (1).svg";
import favorite from "../../../../assets/Icon + container.svg";
import redFavorite from "../../../../assets/redfav.svg";
import LocationIcon from "../../../../assets/locationrelated.svg";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import  { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";

import CustomSpin from "../../../../customs/spin";
import usePagination from "../../../../hooks/usePagnation";
import { countUpTo } from "../../../../utils";
import { AddToFav, getAllFav, getAllPopularMarket } from "../../../request";
import { userAtom } from "../../../../utils/store";
import GeneralWelcome from "../marketLogin/marketLogin";

const PopularProducts = () => {
  const navigate = useNavigate();
  const { currentPage, setCurrentPage, onChange, pageNum } = usePagination();
  const queryClient = useQueryClient();
  const user = useAtomValue(userAtom);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const { notification } = App.useApp();

  useEffect(() => {
    if (currentPage !== pageNum) {
      setCurrentPage(pageNum);
    }
  }, [pageNum, currentPage, setCurrentPage]);

  // === Setup axios instance for favorites ===
  // const favData = { user_id: user?.id };

  // const getFavapi = axios.create({
  //   baseURL: import.meta.env.VITE_GATEWAY_URL,
  //   headers: {
  //     "Cache-Control": "no-cache",
  //     "Content-Type": "application/json",
  //     Pragma: "no-cache",
  //     Expires: "0",
  //     Authorization: `Bearer ${user?.security_token}`,
  //   },
  //   params: favData,
  // });

  // === Fetch favorites ===
  // const getAllFavs = async () => {
  //   const url = `/ads/fav`;
  //   const { data } = await getFavapi.get(url);
  //   return data;
  // };

  // === React Query multiple queries ===
  const [getAllPopularMarketQuery, getAllFavAds] = useQueries({
    queries: [
      {
        queryKey: ["get-popular-ads", currentPage],
        queryFn: () => getAllPopularMarket(currentPage, 5),
        retry: 0,
        refetchOnWindowFocus: true,
      },
      {
        queryKey: ["get-all-fav", user?.id],
        queryFn: ()=>getAllFav(user?.id),
        retry: 0,
        refetchOnWindowFocus: true,
        enabled: !!user?.id, // Only fetch favorites if user is logged in
      },
    ],
  });

  const favAdvList = getAllFavAds?.data?.data || [];
  const favIcons = favAdvList.map((fav: AddToFav) => fav.id) || [];

  const marketData = getAllPopularMarketQuery?.data?.data || [];
  const marketError = getAllPopularMarketQuery?.error as AxiosError;
  const marketErrorMessage =
    marketError?.message || "An error occurred. Please try again later.";

    console.log(marketData,'marketData')
  // === Navigation ===
  const handleNavigateToProductDetails = (id: string) => {
    navigate(`/product-details/${id}`);
    window.scrollTo(0, 0);
  };

  // === Add/Remove from Favorites ===
  const addToFavMutation = useMutation({
    mutationFn: AddToFav,
    mutationKey: ["add-fav"],
  });

  const addToFavHandler = async (id?: string) => {
    if (!id) return;

    if (!user?.id) {
      setOpenLoginModal(true);
      return;
    }

    const isFav = favIcons.includes(parseInt(id));

    const payload: Partial<AddToFav> = {
      add_id: id,
      status: isFav ? 0 : 1,
    };

    try {
      await addToFavMutation.mutateAsync(payload, {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: ["get-all-fav"] });
        },
      });
    }catch (err: any) {
      notification.error({
        message: "Error",
        description: err || "failed",
      });
  };

  return (
    <>
      {getAllPopularMarketQuery?.isLoading ? (
        <CustomSpin />
      ) : getAllPopularMarketQuery?.isError ? (
        <h1 className="error">{marketErrorMessage}</h1>
      ) : (
        <div>
          <section className={styles.promoImageContainer}>
            {marketData && marketData?.length > 0 &&
              marketData?.map((item: any, index: number) => (
                <div
                  className={styles.promoImage}
                  key={index}
                  onClick={() => handleNavigateToProductDetails(item?.slug)}
                >
                  <div
                    className={styles.favoriteIcon}
                onClick={(event) => {
  event.stopPropagation(); // Prevent parent click
  if (user) {
    addToFavHandler(item?.id?.toString());
  } else {
    setOpenLoginModal(true);
  }
}}

                    

                    
                  >
                    <img
                      width={30}
                      src={favIcons.includes(item?.id) ? redFavorite : favorite}
                      alt="Favorite"
                    />
                  </div>

                  <img
                    className={styles.proImage}
                    src={item?.cover_image_url || Product3}
                    alt="Product"
                  />

                  <div className={styles.productList}>
                    <p style={{ color: "#4F4F4F" }}>
                      {item?.title?.length > 20
                        ? `${item?.title.slice(0, 20)}...`
                        : item?.title}
                    </p>

                    <div className={styles.info}>
                      <Image src={LocationIcon} alt="LocationIcon" preview={false} />
                      <p>
                        <span>
                          {item?.local_govt?.local_government_area &&
                            item?.local_govt?.local_government_area + ", "}
                        </span>
                        <span>{item?.state?.state_name}</span>
                      </p>
                    </div>

                    <span style={{ color: "#222222", fontWeight: "600" }}>
                      {item?.discount_price === "" ? (
                        <span>{`₦${item?.price}`}</span>
                      ) : (
                        <>
                          <span className={styles.canceledText}>
                            ₦{item?.price}
                          </span>{" "}
                          <span>₦{item?.discount_price}</span>
                        </>
                      )}
                    </span>

                    <div className={styles.starWrapper}>
                      {countUpTo(
                        parseInt(item?.average_rating),
                        <Image
                          width={20}
                          src={StarYellow}
                          alt="StarYellow"
                          preview={false}
                        />,
                        <Image width={20} src={Star} alt="Star" preview={false} />
                      )}
                      <span>({item?.total_rating})</span>
                    </div>
                  </div>
                </div>
              ))}
          </section>

          <Pagination
            current={currentPage}
            total={getAllPopularMarketQuery?.data?.data?.total || 0}
            pageSize={50}
            onChange={onChange}
            showSizeChanger={false}
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </div>
      )}

      <Modal
        open={openLoginModal}
        onCancel={() => setOpenLoginModal(false)}
        centered
        footer={null}
      >
        <GeneralWelcome handleCloseModal={() => setOpenLoginModal(false)} />
      </Modal>
    </>
  );
};

export default PopularProducts;
