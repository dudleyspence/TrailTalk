import React from "react";
import Pagination from "@mui/material/Pagination";

export default function PaginationControls({
  pageNo,
  setPageNo,
  elementsPerPage,
  element_count,
}) {
  const totalPages = Math.ceil(element_count / elementsPerPage);

  const handleChange = (event, value) => {
    setPageNo(value);
  };

  return (
    <div className="my-4 flex justify-center">
      <Pagination
        count={totalPages}
        page={pageNo}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        color="primary"
        siblingCount={1}
        boundaryCount={1}
      />
    </div>
  );
}
