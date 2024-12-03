import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../../../api";

export default function TopicsNav() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currTopics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then(({ data: { topics } }) => {
        console.log(topics);
        setIsLoading(false);
        setTopics(topics);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return isError ? (
    "oh no an error"
  ) : isLoading ? (
    "loading topics"
  ) : (
    <div>
      <nav className="topics-nav">
        <ul>
          {currTopics.map((topic) => (
            <li key={topic.slug}>
              <Link className="topicLink" to={`/topics/${topic.slug}`}>
                {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
