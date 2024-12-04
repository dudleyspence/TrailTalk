import { useState, useEffect } from "react";

const useComments = ({
  article_id,
  pageNo,
  commentsPerPage,
  sortBy,
  order,
}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments(article_id, pageNo, commentsPerPage, sortBy, order)
      .then(({ comments }) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return { comments, loading, error };
};

export default useComments;
