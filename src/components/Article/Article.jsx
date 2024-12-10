import React from "react";
import { useParams } from "react-router-dom";
import useArticle from "../../hooks/useArticle";
import LoadingAnimation from "../UI/Lotties/Loading/LoadingAnimation";
import { Avatar, Typography } from "@material-tailwind/react";
import CreatedTime from "../Utils/CreatedTime";
import DOMPurify from "dompurify";
import ArticleVotesControl from "../VotesControl/ArticleVotesControl";
import { Link } from "react-router-dom";

export default function Article() {
  const { article_id } = useParams();

  const { article, loading, error } = useArticle(article_id);

  if (error) {
    return <p>Error fetching articles</p>;
  }

  return (
    <div className="w-full max-w-[1200px] flex flex-col items-center gap-5 py-5 md:py-10">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="w-full flex flex-col items-center gap-10">
          <div id="article_header" className="w-full">
            <h1 className="text-2xl font-bold mb-5">{article.title}</h1>
            <div
              id="article_header_line2"
              className="flex flex-row justify-between items-end"
            >
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
              <div className="flex flex-col items-center gap-4">
                <ArticleVotesControl
                  id={article.article_id}
                  currVotes={article.votes}
                />
                <Link
                  className="hover:underline"
                  to={`/article/${article.article_id}#commentSection`}
                >
                  <Typography className="text-sm sm:text-md lg:text-lg">
                    Comments: {article.comment_count}
                  </Typography>
                </Link>
              </div>
            </div>
          </div>
          <div id="article_body">
            <img
              className="h-auto w-full rounded-lg object-cover object-center"
              src={article.article_img_url}
            />
          </div>
          <div
            id="article-content"
            className="prose prose-md max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(article.body),
            }}
          />
        </div>
      )}
    </div>
  );
}
