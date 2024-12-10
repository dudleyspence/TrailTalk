import React from "react";
import ArticleList from "../../components/articleList/ArticleList";
import TopicSorting from "../../components/sortingControls/TopicSorting";

export default function MainPage() {
  return (
    <div className="w-full">
      <TopicSorting />
      <ArticleList />
    </div>
  );
}
