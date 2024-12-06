import { useState, useEffect } from "react";
import { fetchArticleById } from "../../api";

const useArticle = (article_id) => {
  const [article, setArticle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  console.log(article_id);

  useEffect(() => {
    fetchArticleById(article_id)
      .then(({ data: { article } }) => {
        console.log(article);
        setArticle(article);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [article_id]);

  console.log(article);
  return { article, loading, error };
};

export default useArticle;
