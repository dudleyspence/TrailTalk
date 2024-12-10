import React from "react";
import Article from "../../components/article/Article";
import CommentSection from "../../components/commentSection/CommentSection";

export default function ArticlePage() {
  return (
    <div className="flex flex-col items-center">
      <Article />
      <CommentSection />
    </div>
  );
}
