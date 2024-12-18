import { useState } from "react";

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return { currentPage, setCurrentPage, onChange };
};

export default usePagination;
