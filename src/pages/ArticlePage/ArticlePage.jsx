import React from "react";
import Article from "../../components/Article/Article";
import CommentSection from "../../components/CommentSection/CommentSection";

export default function ArticlePage() {
  return (
    <div className="flex flex-col items-center">
      <Article />
      <CommentSection />
    </div>
  );
}
