import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import CreatedTime from "../Utils/CreatedTime";
import { updateArticleVotes } from "../../../api";
import ArticleVotesControl from "../VotesControl/ArticleVotesControl";

export function ArticleCard({ article, deleteComponent = undefined }) {
  return (
    <Card className="w-full overflow-hidden relative flex flex-col justify-between">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="h-2/3 m-0 relative shrink-0 rounded-none overflow-hidden"
      >
        <img
          src={article.article_img_url}
          alt="image relating to the article"
          className="w-full h-full object-cover overflow-hidden"
        />
      </CardHeader>
      <CardBody className="flex flex-col justify-between items-start h-1/3 gap-4">
        <div className="flex flex-row gap-3 w-full justify-between">
          <Link to={`/article/${article.article_id}`}>
            <Typography variant="h4" color="blue-gray">
              {article.title}
            </Typography>
          </Link>
          {article.votes > 15 && (
            <div class="mb-4 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-20 text-center">
              POPULAR
            </div>
          )}
        </div>
        <div className="flex flex-row w-full justify-between">
          <div class="flex items-center">
            <Avatar
              size="lg"
              variant="circular"
              alt={article.author}
              src={article.author_avatar_url}
              className="border-2 border-white hover:z-10"
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
              updateVotes={updateArticleVotes}
            />
            <Link
              className="hover:underline"
              to={`/article/${article.article_id}#commentSection`}
            >
              <Typography>Comments: {article.comment_count}</Typography>
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
