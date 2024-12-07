import { useState, useEffect } from "react";
import { fetchComments } from "../../api";

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
    setLoading(true);
    fetchComments(article_id, pageNo, commentsPerPage, sortBy, order)
      .then(({ data }) => {
        setComments(data.comments);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [article_id, pageNo, commentsPerPage, sortBy, order]);

  return { comments, setComments, loading, error };
};

export default useComments;
