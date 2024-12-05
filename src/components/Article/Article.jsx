import React from "react";
import { useParams } from "react-router-dom";
import useArticle from "../../hooks/useArticle";
import LoadingAnimation from "../UI/Lotties/Loading/LoadingAnimation";
import { Avatar } from "@material-tailwind/react";
import CreatedTime from "../Utils/CreatedTime";

export default function Article() {
  const { article_id } = useParams();
  console.log(article_id);

  const { article, loading, error } = useArticle(article_id);
  console.log(article);

  return (
    <div className="w-full flex flex-col items-center gap-5 py-8">
      {loading && <LoadingAnimation />}
      {error && <p>Error fetching articles</p>}
      <div>
        <div>
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <Avatar
              variant="circular"
              alt={article.author}
              src={article.author_avatar_url}
              className="h-[38px] w-[38px] sm:h-[58px] sm:w-[58px] border-2 border-white hover:z-10"
            />
            <div className="flex flex-col ml-3 text-sm">
              <span className="text-slate-800 text-md font-semibold">
                {article.author}
              </span>
              <CreatedTime timeString={article.created_at} />
            </div>
          </div>
        </div>
        <img
          className="h-auto w-full rounded-lg object-cover object-center"
          src={article.article_img_url}
        />
      </div>
    </div>
  );
}
