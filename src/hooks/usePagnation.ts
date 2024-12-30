import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNum = parseInt(searchParams.get("pageNum") || "1", 10);

  // const onChange = (page: number) => {
  //   setCurrentPage(page);
  //   window.scrollTo(0, 0);
  // };

  const onChange = (pageNum: number) => {
    
    setSearchParams({ pageNum: pageNum?.toString() }); // Update the URL with the new page number
    setCurrentPage(pageNum); // Update the state
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return { currentPage, setCurrentPage, onChange,pageNum };
};

export default usePagination;
