import { useState } from "react";
import mountainUp from "../../assets/Votes/mountain-up.png";
import mountainDown from "../../assets/Votes/mountain-down.png";
import { useAuth } from "../../context/AuthContext";
import { useLoginModal } from "../../context/LoginModelContext";
import { updateArticleVotes } from "../../../api";

export default function ArticleVotesControl({ id, currVotes }) {
  const [votes, setVotes] = useState(currVotes);
  const [userVote, setUserVote] = useState(0);

  const { userLoggedIn } = useAuth();
  const { openLoginModal } = useLoginModal();

  function handleVote(voteChange) {
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

    updateArticleVotes(id, voteChange)
      .then(() => {
        console.log("Vote successfully updated!");
      })
      .catch((error) => {
        console.error("Failed to update votes:", error);
        setVotes(initialVotes);
        setUserVote(initialUserVote);
      });
  }

  const handleUpvote = () => {
    if (userVote === 1) {
      // Undo upvote
      handleVote(-1);
    } else if (userVote === -1) {
      // Reverse downvote to upvote
      handleVote(2);
    } else {
      // Apply upvote
      handleVote(1);
    }
  };

  const handleDownvote = () => {
    if (userVote === -1) {
      // Undo downvote
      handleVote(1);
    } else if (userVote === 1) {
      // Reverse upvote to downvote
      handleVote(-2);
    } else {
      // Apply downvote
      handleVote(-1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-sm md:text-md">Altitude Points: {votes}m</p>
      <div className="flex flex-row gap-2">
        <button onClick={handleUpvote} className="h-8 w-12 md:h-10 md:w-14">
          <img
            className={`h-full w-full p-1 rounded-lg ${
              userVote === 1 ? "bg-green-200" : "bg-white"
            }`}
            src={mountainUp}
            alt="upvote-button"
          />
        </button>
        <button onClick={handleDownvote} className="h-8 w-12 md:h-10 md:w-14">
          <img
            className={`h-full w-full p-1 rounded-lg ${
              userVote === -1 ? "bg-green-200" : "bg-white"
            }`}
            src={mountainDown}
            alt="downvote-button"
          />
        </button>
      </div>
    </div>
  );
}
