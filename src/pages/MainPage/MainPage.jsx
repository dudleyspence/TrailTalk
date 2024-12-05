import React from "react";
import ArticleList from "../../components/ArticleList/ArticleList";
import TopicSorting from "../../components/SortingControls/TopicSorting";

export default function MainPage() {
  return (
    <div>
      <TopicSorting />
      <ArticleList />
    </div>
  );
}
