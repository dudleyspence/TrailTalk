import React, { useState, useEffect } from "react";
import useArticles from "../../hooks/useArticles";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import { useParams } from "react-router-dom";
import PaginationControls from "../Pagination/PaginationControls";
import ListControls from "../SortingControls/ListControls";
import ArticleListSkeleton from "./ArticleListSkeleton";

export default function ArticleList({ firebaseUID }) {
  const { topic } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const { articles, setArticles, total, loading, error } = useArticles({
    topic,
    pageNo,
    setPageNo,
    articlesPerPage,
    sortBy,
    order,
    firebaseUID,
  });

  if (error) {
    return <p>Error fetching articles</p>;
  }

  return (
    <div className="w-full flex flex-col items-center gap-5 py-8">
      {loading ? (
        <ArticleListSkeleton />
      ) : (
        <>
          <ListControls
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
            pageNo={pageNo}
            setPageNo={setPageNo}
            elementsPerPage={articlesPerPage}
            setElementsPerPage={setArticlesPerPage}
            canSortByComments={true}
          />
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 items-stretch gap-10">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.article_id}
                index={index}
                article={article}
                deleteComponent={firebaseUID}
                articles={articles}
                setArticles={setArticles}
              />
            ))}
          </div>
          <PaginationControls
            pageNo={pageNo}
            setPageNo={setPageNo}
            elementsPerPage={articlesPerPage}
            element_count={total}
          />
        </>
      )}
    </div>
  );
}
