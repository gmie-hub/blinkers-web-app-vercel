import styles from "./index.module.scss";
import { Image, Pagination } from "antd";
import Star from "../../../../assets/Vector.svg";
import StarYellow from "../../../../assets/staryellow.svg";
import Product3 from "../../../../assets/Image (1).svg";
import favorite from "../../../../assets/Icon + container.svg";
import { useNavigate, useParams } from "react-router-dom";
import { countUpTo } from "../../trend";
import { useQueries } from "@tanstack/react-query";
// import { getAllMarket } from "../../../request";
import axios, { AxiosError } from "axios";
import LocationIcon from "../../../../assets/locationrelated.svg";
import FaArrowLeft from "../../../../assets/backArrow.svg"; // Assuming you use react-icons for the back icon
import Button from "../../../../customs/button/button";
import CustomSpin from "../../../../customs/spin";
import usePagination from "../../../../hooks/usePagnation";
import { useEffect } from "react";

interface ProductListProps {
  appliedSearchTerm: string;
  setAppliedSearchTerm: any;
  selectedItems: number[];
  stateId: number;
  lgaId: number;
  setLgaId: any;
  setStateId: any;
  setSelectedItems:any
}

const ProductList: React.FC<ProductListProps> = ({
  appliedSearchTerm,
  setAppliedSearchTerm,
  stateId,
  lgaId,
  setLgaId,
  setStateId,
  selectedItems,
  setSelectedItems
}) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { currentPage, setCurrentPage, onChange, pageNum } = usePagination();
  const { search } = useParams();

  useEffect(() => {
    if (currentPage !== pageNum) {
      setCurrentPage(pageNum);
    }
  }, [pageNum, currentPage, setCurrentPage]);

  const data = {
    sub_category_id: selectedItems
  };

  const api = axios.create({
    baseURL: import.meta.env.VITE_GATEWAY_URL,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
      Pragma: "no-cache",
      Expires: "0",
    },
    params: data,
  });

  const getAllMarket = async (
    page?: number,
    search?: string | number,
    state_id?: number,
    local_government_area_id?: number
  ) => {
    let url = `/ads?per_page=${50}`;

    const queryParams: string[] = [];

    if (page !== undefined) {
      queryParams.push(`page=${page}`);
    }

    if (search !== undefined && search !== "") {
      queryParams.push(`search=${search}`);
    }

    if (state_id !== undefined && state_id !== 0) {
      queryParams.push(`state_id=${state_id}`);
    }

    if (
      local_government_area_id !== undefined &&
      local_government_area_id !== 0
    ) {
      queryParams.push(`local_government_area_id=${local_government_area_id}`);
    }

    // if(sub_category_id !==undefined && sub_category_id.length !== 0){
    //   queryParams.push(`sub_category_id=${sub_category_id}`);
    // }

    if (queryParams.length > 0) {
      url += `&${queryParams.join("&")}`;
    }

    return (await api.get(url))?.data as AllProductaResponse;
  };

  const [getAllMarketQuery] = useQueries({
    queries: [
      {
        queryKey: [
          "get-all-market",
          currentPage,
          appliedSearchTerm,
          stateId,
          lgaId,
          selectedItems,
        ],
        queryFn: () =>
          getAllMarket(currentPage, appliedSearchTerm, stateId, lgaId),
        // retry: 0,
        refetchOnWindowFocus: true,
        // enabled: Boolean(currentPage && appliedSearchTerm),
      },
    ],
  });
  useEffect(() => {
    if (search) {
      setAppliedSearchTerm(search);
    }
  }, [search]);

  const marketData = getAllMarketQuery?.data?.data?.data || [];
  const marketError = getAllMarketQuery?.error as AxiosError;
  const marketErrorMessage =
    marketError?.message || "An error occurred. Please try again later.";

  const handleNavigateToProductDetails = (id: number) => {
    navigate(`/product-details/${id}`);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    appliedSearchTerm = "";
    setAppliedSearchTerm("");
    // search = "";
    setCurrentPage(1);
    navigate("/market");
    getAllMarketQuery?.refetch();
    setStateId(0);
    setLgaId(0);
    setSelectedItems([])
    
  };

  // const handlePageChange = (pageNum: number) => {
  //   setSearchParams({ pageNum: pageNum?.toString() }); // Update the URL with the new page number
  //   setCurrentPage(pageNum); // Update the state
  //   window.scrollTo(0, 0); // Scroll to the top of the page
  // };

  return (
    <>
      {getAllMarketQuery?.isLoading ? (
        <CustomSpin />
      ) : getAllMarketQuery?.isError ? (
        <h1 className="error">{marketErrorMessage}</h1>
      ) : (
        <div>
          {appliedSearchTerm?.length > 0 && marketData?.length > 0 && (
            <div>
              <Button
                type="button"
                className="buttonStyle"
                onClick={handleBack}
                text="view all"
                icon={<img src={FaArrowLeft} alt="FaArrowLeft" />}
              />
              <br />
              <br />
            </div>
          )}
          <section className={styles.promoImageContainer}>
            {marketData && marketData?.length > 0 ? (
              marketData?.map((item, index) => (
                <div
                  className={styles.promoImage}
                  key={index}
                  onClick={() => handleNavigateToProductDetails(item?.id)}
                >
                  <div className={styles.favoriteIcon}>
                    <img width={30} src={favorite} alt="Favorite" />
                  </div>
                  {/* Image for the product */}
                  <img
                    className={styles.proImage}
                    src={item?.add_images[0]?.add_image || Product3}
                    alt="Product"
                  />
                  <div className={styles.productList}>
                    <p style={{ color: "#4F4F4F" }}>
                      {item?.title && item?.title?.length > 20
                        ? `${item?.title?.slice(0, 20)}...`
                        : item?.title}
                    </p>
                    <div className={styles.info}>
                      <Image src={LocationIcon} alt="LocationIcon" />
                      <p>
                        <span>
                          {item?.local_govt?.local_government_area &&
                            item?.local_govt?.local_government_area + ", "}
                        </span>
                        <span>{item?.state?.state_name}</span>
                      </p>
                    </div>
                    {/* <span className={styles.trendingdiscount}>
                      {item?.discount_price &&
                        `₦${item?.discount_price} `}
                    </span> */}
                    <span style={{ color: "#222222", fontWeight: "600" }}>
                      {/* ₦{item?.price} */}
                      {item?.discount_price === "" ? (
                        <span>{`₦${item?.price}`}</span>
                      ) : (
                        <span className={styles.canceledText}>
                          {`₦${item?.price}`}{" "}
                        </span>
                      )}
                      <span>
                        {" "}
                        {item?.discount_price && `₦${item?.discount_price} `}
                      </span>
                    </span>

                    <div className={styles.starWrapper}>
                      {countUpTo(
                        parseInt(item?.averageRating),
                        <Image
                          width={20}
                          src={StarYellow}
                          alt="StarYellow"
                          preview={false}
                        />,
                        <Image
                          width={20}
                          src={Star}
                          alt="Star"
                          preview={false}
                        />
                      )}
                      <span>({item?.averageRating})</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <section style={{ width: "100%" }}>
                <div className={styles.noDataContainer}>
                  <p>No data available</p>
                  <Button
                    type="button"
                    className="buttonStyle"
                    onClick={handleBack}
                    text="view all Markets"
                    icon={<img src={FaArrowLeft} alt="FaArrowLeft" />}
                  />
                </div>
              </section>
            )}
          </section>

          <Pagination
            current={currentPage}
            total={getAllMarketQuery?.data?.data?.total} // Total number of items
            pageSize={50} // Number of items per page
            onChange={onChange} // Handle page change
            showSizeChanger={false} // Hide the option to change the page size
            style={{
              marginTop: "20px",
              textAlign: "center", // Center the pagination
              display: "flex",
              justifyContent: "center", // Ensure the pagination is centered
            }}
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
