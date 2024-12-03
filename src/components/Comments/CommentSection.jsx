import { useEffect, useState } from "react";
import { fetchCommentsByArticleId } from "../../../api";

import AddComment from "./AddComment";
import ListControls from "../Controls/ListControls";

import SingleComment from "../Comments/SingleComment";
import PageControls from "../Controls/PageControls";

export default function CommentSections({ article_id, comment_count }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("votes");
  const [order, setOrder] = useState("desc");

  console.log(comments, "<<<< Comments");

  useEffect(() => {
    setIsLoading(true);
    if (comment_count > 0) {
      fetchCommentsByArticleId(
        article_id,
        pageNo,
        commentsPerPage,
        sortBy,
        order
      )
        .then(({ data: { comments } }) => {
          setComments(comments);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          setIsError(true);
          console.log(err);
        });
    } else {
      setIsLoading(false);
    }
  }, [article_id, pageNo, commentsPerPage, sortBy, order, comment_count]);

  return isError ? (
    "error"
  ) : isLoading ? (
    "Loading comments"
  ) : (
    <div className="comments-container">
      {comment_count === 0 && (
        <p className="noComments">There is no comments yet for this post</p>
      )}
      <AddComment
        article_id={article_id}
        setComments={setComments}
        comments={comments}
      />
      <ListControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
        pageNo={pageNo}
        setPageNo={setPageNo}
        elementsPerPage={commentsPerPage}
        setElementsPerPage={setCommentsPerPage}
      />

      <ul className="listOfComments">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="single-comment">
            <SingleComment
              comment={comment}
              comments={comments}
              setComments={setComments}
            />
          </li>
        ))}
      </ul>

      <PageControls
        pageNo={pageNo}
        setPageNo={setPageNo}
        elementsPerPage={commentsPerPage}
        element_count={comment_count}
      />
    </div>
  );
}
