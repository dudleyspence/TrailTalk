import { useState } from "react";
import mountainUp from "../../assets/mountain-up.png";
import mountainDown from "../../assets/mountain-down.png";
import arrowDown from "../../assets/arrow-down.png";
import arrowUp from "../../assets/arrow-up.png";

export default function VotesControl({
  id,
  currVotes,
  updateVotes,
  isArticle = true,
}) {
  const [votes, setVotes] = useState(currVotes);
  const [userVote, setUserVote] = useState(0);

  let upvoteImg = "";
  let downvoteImg = "";

  if (isArticle) {
    upvoteImg = mountainUp;
    downvoteImg = mountainDown;
  } else {
    // comment votes
    upvoteImg = arrowUp;
    downvoteImg = arrowDown;
  }

  const handleUpVote = () => {
    const initialUserVote = userVote;
    let voteChange = 0;
    if (userVote === 1) {
      // undo upvote
      voteChange = -1;
      setUserVote(0);
    } else if (userVote === -1) {
      //reverse the vote
      voteChange = 2;
      setUserVote(1);
    } else {
      voteChange = 1;
      setUserVote(1);
    }
    //update the votes optimistically ;)
    console.log(votes, "<<< Votes");
    setVotes(votes + voteChange);
    console.log(votes, "<<< Votes");

    updateVotes(id, userVote).catch((err) => {
      console.log(err);
      setVotes(votes - userVote);
      setUserVote(initialUserVote);
    });
  };

  const handleDownVote = () => {
    const initialUserVote = userVote;
    let voteChange = 0;
    if (userVote === -1) {
      // undo downvote
      voteChange = 1;
      setUserVote(0);
    } else if (userVote === 1) {
      //reverse the vote
      voteChange = -2;
      setUserVote(-1);
    } else {
      voteChange = -1;
      setUserVote(-1);
    }

    //update the votes optimistically ;)
    console.log(votes, "<<< Votes");
    setVotes(votes + voteChange);
    console.log(votes, "<<< Votes");

    updateVotes(id, userVote).catch((err) => {
      console.log(err);
      setVotes(votes - userVote);
      setUserVote(initialUserVote);
    });
  };

  // conditional class names for articles and comments as i dont want them to look like the same voting.

  return (
    <div className={isArticle ? "article-votes" : "comment-votes"}>
      {isArticle && (
        <p className="current-altitude-votes">Altitude Points: {votes}m</p>
      )}
      <div className="vote-controls">
        <button onClick={handleUpVote} className={userVote === 1 ? "vote" : ""}>
          <img className="voteImg" src={upvoteImg} alt="upvote-button" />
        </button>
        {!isArticle && <p className="current-comment-votes">{votes}</p>}
        <button
          onClick={handleDownVote}
          className={userVote === -1 ? "vote" : ""}
          disabled={votes === 0}
        >
          <img className="voteImg" src={downvoteImg} alt="downvote-button" />
        </button>
      </div>
    </div>
  );
}
