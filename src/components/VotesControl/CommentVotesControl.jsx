import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLoginModal } from "../../context/LoginModelContext";
import { updateCommentVotes } from "../../../api";

export default function CommentVotesControl({ id, currVotes }) {
  const [votes, setVotes] = useState(currVotes);
  const [userVote, setUserVote] = useState(0);

  const { userLoggedIn } = useAuth();
  const { openLoginModal } = useLoginModal();

  const handleVote = (voteChange) => {
    if (!userLoggedIn) {
      openLoginModal();
      return;
    }

    const initialVotes = votes;
    const initialUserVote = userVote;

    const newVotes = votes + voteChange;
    const newUserVote = userVote + voteChange;

    setVotes(newVotes);
    setUserVote(newUserVote);
    updateCommentVotes(id, voteChange)
      .then(() => {
        console.log("Vote successfully updated!");
      })
      .catch((error) => {
        console.error("Failed to update votes:", error);
        setVotes(initialVotes);
        setUserVote(initialUserVote);
      });
  };

  const handleUpvote = () => {
    if (userVote === 1) {
      handleVote(-1);
    } else if (userVote === -1) {
      handleVote(2);
    } else {
      handleVote(1);
    }
  };

  const handleDownvote = () => {
    if (userVote === -1) {
      handleVote(1);
    } else if (userVote === 1) {
      handleVote(-2);
    } else {
      handleVote(-1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xs md:text-[14px] mb-1">Altitude Points: {votes}m</p>
      <div className="flex flex-row gap-2">
        <button
          onClick={handleUpvote}
          className="h-6 w-9 md:h-8 md:w-12 lg:h-10 lg:w-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`h-full w-full p-0.5 md:p-1 rounded-lg ${
              userVote === 1 ? "bg-green-200" : "bg-white"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={handleDownvote}
          className="h-6 w-9 md:h-8 md:w-12 lg:h-10 lg:w-14"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`h-full w-full p-0.5 md:p-1 rounded-lg ${
              userVote === -1 ? "bg-green-200" : "bg-white"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
