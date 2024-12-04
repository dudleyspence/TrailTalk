import useVotes from "../../hooks/useVotes";
import arrowUp from "../../assets/arrow-up.png";
import arrowDown from "../../assets/arrow-down.png";

export default function CommentVotesControl({ id, currVotes, updateVotes }) {
  const { votes, userVote, handleVote } = useVotes({
    id,
    currVotes,
    updateVotes,
  });

  return (
    <div className="comment-votes">
      <p className="current-comment-votes">{votes}</p>
      <div className="vote-controls">
        <button
          onClick={() => handleVote("upvote")}
          className={userVote === 1 ? "vote" : ""}
        >
          <img className="voteImg" src={arrowUp} alt="upvote-button" />
        </button>
        <button
          onClick={() => handleVote("downvote")}
          className={userVote === -1 ? "vote" : ""}
          disabled={votes === 0}
        >
          <img className="voteImg" src={arrowDown} alt="downvote-button" />
        </button>
      </div>
    </div>
  );
}
