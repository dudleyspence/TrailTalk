import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useComments from "../../hooks/useComments";
import CommentList from "./CommentList";
import { PostComment } from "./PostComment";

export default function CommentSection() {
  const { article_id } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const { comments, setComments, loading, error } = useComments({
    article_id,
    pageNo,
    commentsPerPage,
    sortBy,
    order,
  });

  if (error) {
    return <p>Error fetching comments</p>;
  }

  return (
    <div className="w-full md:w-[80%] flex flex-col justify-center items-center">
      <CommentList
        comments={comments}
        setComments={setComments}
        loading={loading}
        error={error}
        pageNo={pageNo}
        setPageNo={setPageNo}
        commentsPerPage={commentsPerPage}
        setCommentsPerPage={setCommentsPerPage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
      />
      <PostComment
        article_id={article_id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}
