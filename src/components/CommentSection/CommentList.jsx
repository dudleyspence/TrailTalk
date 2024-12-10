import React from "react";
import PaginationControls from "../Pagination/PaginationControls";
import { Comment } from "./Comment";
import ListControls from "../SortingControls/ListControls";

export default function CommentList({
  comments,
  setComments,
  loading,
  error,
  pageNo,
  setPageNo,
  commentsPerPage,
  setCommentsPerPage,
  sortBy,
  setSortBy,
  order,
  setOrder,
}) {
  if (error) {
    return <p>Error fetching comments</p>;
  }

  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center">
      <ListControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
        pageNo={pageNo}
        setPageNo={setPageNo}
        elementsPerPage={commentsPerPage}
        setElementsPerPage={setCommentsPerPage}
        canSortByComments={false}
      />
      <div className="flex flex-col gap-3 w-full">
        {comments.map((comment) => (
          <Comment key={comment?.comment_id} comment={comment} />
        ))}
      </div>
      <PaginationControls
        pageNo={pageNo}
        setPageNo={setPageNo}
        elementsPerPage={commentsPerPage}
        element_count={comments.length}
      />
    </div>
  );
}
