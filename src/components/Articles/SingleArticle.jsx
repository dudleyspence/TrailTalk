import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../../../api";
import VotesControl from "../Controls/VotesControl";
import CommentSection from "../Comments/CommentSection";
import { updateArticleVotes } from "../../../api";
import CreatedTime from "./CreatedTime";

export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(article_id)
      .then(({ data: { article } }) => {
        console.log(article);

        setArticle(article);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
      });
  }, [article_id]);

  return isError ? (
    "Error"
  ) : isLoading ? (
    "Page Loading"
  ) : (
    <section className="section-container">
      <article className="singleArticle">
        <h1>{article.title}</h1>
        <div className="aboveSingleArticle">
          <div className="singleArticleInfo">
            <h2>{article.author}</h2>
            <p className="singleArticleTopic">{article.topic}</p>
            <CreatedTime
              className="articleDateTime"
              timeString={article.created_at}
              isTimeFromNow={false}
            />
          </div>
          <VotesControl
            id={article.article_id}
            currVotes={article.votes}
            updateVotes={updateArticleVotes}
          />
        </div>
        <div className="singleArticleContent">
          <img src={article.article_img_url} alt="article_img" />
          <div className="ArticleBody">{article.body}</div>
        </div>
      </article>
      <div className="comment-section" id="commentSection">
        <CommentSection
          article_id={article_id}
          comment_count={article.comment_count}
        />
      </div>
    </section>
  );
}
