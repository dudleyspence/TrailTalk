import { Button } from "@material-tailwind/react";
import useAddComment from "../../hooks/useAddComment";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useLoginModal } from "../../context/LoginModelContext";

export function PostComment({ article_id, comments, setComments }) {
  const { userLoggedIn } = useAuth();
  const [body, setBody] = useState("");
  const { openLoginModal } = useLoginModal();

  const { loading, error, success, addNewComment } = useAddComment({
    article_id,
    firebase_uid: userLoggedIn?.firebase_uid,
    body,
    setComments,
    comments,
  });

  function handlePostComment() {
    // check for empty comment or just some whitespace
    if (!userLoggedIn) {
      openLoginModal();
    } else if (body.trim()) {
      addNewComment();
      setBody("");
    }
  }

  return (
    <div className="flex flex-col items-end gap-3 w-full max-w-[600px]">
      <textarea
        className="w-full h-full min-h-[100px] bg-transparent text-blue-gray-700 font-sans font-normal outline-none resize-y border border-blue-gray-200 focus:border-2 focus:border-gray-900 text-sm px-3 py-2.5 rounded-[7px]"
        placeholder="Your Comment"
        rows={4}
        onClick={() => {
          if (!userLoggedIn) {
            openLoginModal();
          }
        }}
        value={body}
        onChange={(event) => {
          if (!userLoggedIn) {
            openLoginModal();
          } else {
            setBody(event.target.value);
          }
        }}
      />
      <Button
        onClick={handlePostComment}
        size="sm"
        className="w-fit h-fit px-4 rounded-md"
        disabled={loading || !userLoggedIn}
      >
        {loading ? "Posting..." : "Post Comment"}
      </Button>
      {error && <p className="text-red-500">Error posting comment</p>}
      {success && <p className="text-green-500">Comment posted!</p>}
    </div>
  );
}
