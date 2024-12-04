import useVotes from "../../hooks/useVotes";
import mountainUp from "../../assets/mountain-up.png";
import mountainDown from "../../assets/mountain-down.png";

export default function ArticleVotesControl({ id, currVotes, updateVotes }) {
  const { votes, userVote, handleVote } = useVotes({
    id,
    currVotes,
    updateVotes,
  });

  return (
    <div className="article-votes">
      <p className="current-altitude-votes">Altitude Points: {votes}m</p>
      <div className="vote-controls">
        <button
          onClick={() => handleVote("upvote")}
          className={userVote === 1 ? "vote" : ""}
        >
          <img className="voteImg" src={mountainUp} alt="upvote-button" />
        </button>
        <button
          onClick={() => handleVote("downvote")}
          className={userVote === -1 ? "vote" : ""}
          disabled={votes === 0}
        >
          <img className="voteImg" src={mountainDown} alt="downvote-button" />
        </button>
      </div>
    </div>
  );
}
