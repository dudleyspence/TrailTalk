import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import CreatedTime from "../Utils/CreatedTime";
import ArticleVotesControl from "../VotesControl/ArticleVotesControl";
import DeleteArticle from "../Profile/DeleteArticle";

export default function ArticleCard({
  article,
  deleteComponent,
  setArticles,
  articles,
  index,
}) {
  return (
    <Card className="h-full w-full shadow-lg hover:shadow-2xl flex flex-col overflow-hidden relative cursor-pointer">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex-shrink-0 h-[60%] xl:h-[50%] m-0 relative rounded-none overflow-hidden aspect-[3/2]"
      >
        <Link to={`/article/${article.article_id}`} className="block h-full">
          <img
            src={article.article_img_url}
            alt="image relating to the article"
            className="w-full h-full object-cover object-center"
          />
        </Link>
      </CardHeader>
      <CardBody className=" h-[40%] xl:h-[50%] flex flex-col justify-between p-4 md:p-6">
        <div className="flex flex-row justify-between gap-3 items-start">
          <Link to={`/article/${article.article_id}`}>
            <Typography className="hover:underline underline-offset-8 text-md sm:text-2xl font-bold">
              {article.title}
            </Typography>
          </Link>
          {article.votes > 15 && (
            <div className="mb-2 rounded-full bg-cyan-600 py-1 px-3 border border-transparent text-xs text-white shadow-sm">
              POPULAR
            </div>
          )}
          {deleteComponent && (
            <DeleteArticle
              article_id={article.article_id}
              articles={articles}
              setArticles={setArticles}
            />
          )}
        </div>
        <div className="flex justify-between items-start w-full gap-4">
          <div className="flex gap-2 items-center">
            <Avatar
              variant="circular"
              alt={article.author}
              src={article.author_avatar_url}
              className="h-[38px] w-[38px] sm:h-[58px] sm:w-[58px] border-2 border-white hover:z-10"
            />
            <div>
              <Typography className="text-slate-800 text-md font-semibold">
                {article.author}
              </Typography>
              <CreatedTime timeString={article.created_at} />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <ArticleVotesControl
              id={article.article_id}
              currVotes={article.votes}
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
