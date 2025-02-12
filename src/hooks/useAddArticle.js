import { useState, useEffect } from "react";
import { addComment } from "../../api";

const useAddArticle = ({
  article_id,
  username,
  body,
  setComments,
  comments,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function addNewComment() {
    setLoading(true);
    setError(false);
    setSuccess(false);
    addComment(article_id, username, body)
      .then(({ comment }) => {
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

export default useAddArticle;
