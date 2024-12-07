import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import CreatedTime from "../Utils/CreatedTime";
import { updateArticleVotes } from "../../../api";
import ArticleVotesControl from "../VotesControl/ArticleVotesControl";

export function ArticleCard({ article, deleteComponent = undefined }) {
  return (
    <Card className="w-full h-full min-h-[500px] lg:min-h-[600px] shadow-lg hover:shadow-2xl overflow-hidden relative flex flex-col justify-between cursor-pointer">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="h-3/5 md:h-2/3 m-0 relative shrink-0 rounded-none overflow-hidden"
      >
        <Link to={`/article/${article.article_id}`}>
          <img
            src={article.article_img_url}
            alt="image relating to the article"
            className="w-full h-full object-cover overflow-hidden"
          />
        </Link>
      </CardHeader>
      <CardBody className="p-4 md:p-6 flex flex-col justify-between items-start h-2/5 md:h-1/3 gap-4">
        <div className="flex flex-row gap-3 w-full justify-between">
          <Link to={`/article/${article.article_id}`}>
            <Typography className="hover:underline underline-offset-8 text-md sm:text-2xl font-bold">
              {article.title}
            </Typography>
          </Link>
          {article.votes > 15 && (
            <div className="mb-2 rounded-full bg-cyan-600 py-1 h-fit px-3 border border-transparent text-xs text-white transition-all shadow-sm w-fit text-center">
              POPULAR
            </div>
          )}
        </div>
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <Avatar
              variant="circular"
              alt={article.author}
              src={article.author_avatar_url}
              className="h-[38px] w-[38px] sm:h-[58px] sm:w-[58px] border-2 border-white hover:z-10"
            />
            <div className="flex flex-col text-sm">
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

            <Typography className="text-sm sm:text-md lg:text-lg">
              Comments: {article.comment_count}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
