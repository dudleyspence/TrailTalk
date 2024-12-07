import { useState } from "react";

const useVotes = ({ id, currVotes, updateVotes }) => {
  const [votes, setVotes] = useState(currVotes);
  const [userVote, setUserVote] = useState(0); // 1 for upvote, -1 for downvote, 0 for no vote

  const handleVote = (voteType) => {
    const initialUserVote = userVote;
    let voteChange = 0;

    // Determine vote change
    if (voteType === "upvote") {
      if (userVote === 1) {
        // Undo upvote
        voteChange = -1;
        setUserVote(0);
      } else if (userVote === -1) {
        // Reverse from downvote to upvote
        voteChange = 2;
        setUserVote(1);
      } else {
        // Cast an upvote
        voteChange = 1;
        setUserVote(1);
      }
    } else if (voteType === "downvote") {
      if (userVote === -1) {
        // Undo downvote
        voteChange = 1;
        setUserVote(0);
      } else if (userVote === 1) {
        // Reverse from upvote to downvote
        voteChange = -2;
        setUserVote(-1);
      } else {
        // Cast a downvote
        voteChange = -1;
        setUserVote(-1);
      }
    }

    // Optimistically update the votes
    setVotes(votes + voteChange);

    // Call the updateVotes function (e.g., API call)
    updateVotes(id, userVote).catch((err) => {
      console.log(err);
      setVotes(votes - userVote); // Revert to previous votes if error
      setUserVote(initialUserVote); // Revert to previous user vote
    });
  };

  return { votes, userVote, handleVote };
};

export default useVotes;
