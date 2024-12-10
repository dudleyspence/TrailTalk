import React from "react";
import Article from "../../components/Article/Article";
import CommentSection from "../../components/CommentSection/CommentSection";
import { useEffect } from "react";

export default function ArticlePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <Article />
      <CommentSection />
    </div>
  );
}
