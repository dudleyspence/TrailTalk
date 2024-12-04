import { useState, useEffect } from "react";

const useArticles = ({
  topic,
  sortBy,
  order,
  pageNo,
  articlesPerPage,
  username,
}) => {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles(
      topic,
      sortBy,
      order,
      pageNo,
      articlesPerPage,
      (username = null)
    )
      .then(({ total, articles }) => {
        setTotal(total);
        setArticles(articles);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return { articles, total, loading, error };
};

export default useArticles;
