import { UserContext } from "../../context/UserContext";
import { useContext, useState } from "react";
import { addArticleCommentByUsername } from "../../../api";

export default function AddComment({ article_id, comments, setComments }) {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  function handleCommentChange(event) {
    setComment(event.target.value);
    setPostSuccess(false);
  }

  function handleCommentPost(event) {
    event.preventDefault();
    setIsLoading(true);
    const body = comment;
    const username = userLoggedIn.username;
    addArticleCommentByUsername(article_id, username, body)
      .then(({ data: { comment } }) => {
        setPostSuccess(true);
        setIsLoading(false);
        setComments([comment, ...comments]);
        setComment("");
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }

  return isError ? (
    "Error posting comment"
  ) : (
    <div className="addComment-container">
      {postSuccess && (
        <p className="commentSuccess">Comment succesfully posted!</p>
      )}
      <form>
        <label htmlFor="comment">Type your comment below:</label>
        <textarea
          name="comment"
          id="comment"
          onChange={handleCommentChange}
          placeholder="Comment"
          value={comment}
          disabled={isLoading}
          required
        />
        <button
          className="styled-button"
          onClick={handleCommentPost}
          disabled={comment === ""}
        >
          Post
        </button>
      </form>
    </div>
  );
}
