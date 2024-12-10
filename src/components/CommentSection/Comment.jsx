import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import CommentVotesControl from "../votesControl/CommentVotesControl";
import CreatedTime from "../utils/CreatedTime";
console.log();

export function Comment({ comment }) {
  console.log(comment);
  return (
    <Card shadow={false} className="w-full bg-light-green-50 px-4">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-4"
      >
        <Avatar
          size="sm"
          variant="circular"
          src={comment.author_avatar_url}
          alt="tania andrew"
          className="md:h-10 md:w-10 lg:md:h-12 lg:w-12"
        />
        <div className="flex w-full flex-row gap-0.5 justify-between">
          <div>
            <Typography
              className="mb-1 text-sm md:text-md lg:text-lg font-bold"
              color="blue-gray"
            >
              {comment.author}
            </Typography>
            <Typography color="blue-gray">
              <CreatedTime timeString={comment.created_at} />
            </Typography>
          </div>
          <CommentVotesControl
            id={comment.comment_id}
            currVotes={comment.votes}
          />
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>{comment.body}</Typography>
      </CardBody>
    </Card>
  );
}
