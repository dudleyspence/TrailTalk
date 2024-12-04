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
    <Card className="w-full h-full overflow-hidden flex flex-col justify-between">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img
          src={article.article_img_url}
          alt="image relating to the article"
          className="w-full"
        />
      </CardHeader>
      <CardBody>
        <div className="flex flex-row justify-start items-center gap-4">
          <Tooltip content="Tania Andrew">
            <Avatar
              size="sm"
              variant="circular"
              alt="tania andrew"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Link to={`/article/${article.article_id}`}>
            <Typography variant="h4" color="blue-gray">
              {article.title}
            </Typography>
          </Link>
        </div>
      </CardBody>
      <CardFooter className="flex justify-self-end flex-row items-end justify-between">
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
            <p>Comments: {article.comment_count}</p>
          </Link>
        </div>
        <Typography className="font-normal">
          <CreatedTime timeString={article.created_at} />
        </Typography>
      </CardFooter>
    </Card>
  );
}
