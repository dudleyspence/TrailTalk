import React from "react";
import DeleteComment from "./DeleteComment";
import CreatedTime from "../Articles/CreatedTime";
import VotesControl from "../Controls/VotesControl";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { updateCommentVotes } from "../../../api";

export default function SingleComment({ comment, comments, setComments }) {
  const { userLoggedIn } = useContext(UserContext);
  return (
    <div className="singleComment">
      <div className="authorControls">
        <p className="comment-author">{comment.author}: </p>
        {comment.author === userLoggedIn.username && (
          <DeleteComment
            comment_id={comment.comment_id}
            comments={comments}
            setComments={setComments}
          />
        )}
      </div>
      <CreatedTime timeString={comment.created_at} />
      <p className="comment-content">{comment.body}</p>
      <VotesControl
        id={comment.comment_id}
        updateVotes={updateCommentVotes}
        currVotes={comment.votes}
        isArticle={false}
      />
    </div>
  );
}
