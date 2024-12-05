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
      <div className="flex flex-row gap-2">
        <button onClick={() => handleVote("upvote")} className="h-10 w-14">
          {console.log(userVote)}
          <img
            className={`h-full w-full p-1 rounded-lg ${
              userVote === 1 ? "bg-green-200" : "bg-white"
            }`}
            src={mountainUp}
            alt="upvote-button"
          />
        </button>
        <button
          onClick={() => handleVote("downvote")}
          className="h-10 w-14"
          disabled={votes === 0}
        >
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