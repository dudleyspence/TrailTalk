import { useState } from "react";
import { addComment } from "../../api";
import { useAuth } from "../context/AuthContext";

const useAddComment = ({
  article_id,
  firebase_uid,
  body,
  setComments,
  comments,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { userLoggedIn } = useAuth();

  function addNewComment() {
    setLoading(true);
    setError(false);
    setSuccess(false);
    addComment(article_id, firebase_uid, body)
      .then(({ data }) => {
        const comment = data.comment;
        comment.author_avatar_url = userLoggedIn.avatar_url;
        comment.author = userLoggedIn.username;
        setLoading(false);
        setSuccess(true);
        setComments([comment, ...comments]);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }

  return { loading, error, success, addNewComment };
};

export default useAddComment;
