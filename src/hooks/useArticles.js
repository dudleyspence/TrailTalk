import { useState, useEffect } from "react";
import { fetchArticles } from "../../api";

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
      .then(({ data }) => {
        setTotal(data.total);
        setArticles(data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [topic, pageNo, articlesPerPage, sortBy, order, username]);

  return { articles, total, loading, error };
};

export default useArticles;
