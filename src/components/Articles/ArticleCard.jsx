import VotesControl from "../Controls/VotesControl";
import CreatedTime from "./CreatedTime";
import { Link } from "react-router-dom";
import { updateArticleVotes } from "../../../api";

export default function ArticleCard({ article, deleteComponent = undefined }) {
  return (
    <div className="article-card">
      <Link to={`/article/${article.article_id}`}>
        <h3>{article.title}</h3>
      </Link>
      <div className="topicAndDelete">
        <Link to={`/topics/${article.topic}`}>
          <p className="article-topic">{article.topic}</p>
        </Link>
        {deleteComponent && deleteComponent}
      </div>
      <CreatedTime timeString={article.created_at} />
      <Link to={`/article/${article.article_id}`}>
        <img
          className="article-list-img"
          src={article.article_img_url}
          alt="image relating to the article"
        />
      </Link>
      <div className="article-stats">
        <Link to={`/article/${article.article_id}#commentSection`}>
          <p>Comments: {article.comment_count}</p>
        </Link>
        <VotesControl
          id={article.article_id}
          currVotes={article.votes}
          updateVotes={updateArticleVotes}
        />
      </div>
    </div>
  );
}
