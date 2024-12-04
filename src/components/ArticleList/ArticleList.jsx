import React from "react";
import useArticles from "../../hooks/useArticles";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ArticleList() {
  const { topic } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  //   const username = "hikeguru";
  const { articles, total, loading, error } = useArticles({
    topic,
    pageNo,
    articlesPerPage,
    sortBy,
    order,
  });

  return (
    <div>
      <div className="grid grid-col-1 lg:grid-cols-2">
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching articles</p>}
        {articles.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>
    </div>
  );
}
