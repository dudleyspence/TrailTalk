import { useState } from "react";
import { deleteCommentByCommentId } from "../../../api";
import binImg from "../../assets/deletebin.png";

export default function DeleteComment({ comments, setComments, comment_id }) {
  const [isError, setIsError] = useState(false);

  function handleDeleteComment() {
    deleteCommentByCommentId(comment_id)
      .then(() => {
        const refreshedCommentsList = comments.filter(
          (singleComment) => singleComment.comment_id !== comment_id
        );
        setComments(refreshedCommentsList);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }

  return isError ? (
    "Error Deleting"
  ) : (
    <button className="deleteButton" onClick={handleDeleteComment}>
      <img src={binImg} alt="a delete button" />
    </button>
  );
}
