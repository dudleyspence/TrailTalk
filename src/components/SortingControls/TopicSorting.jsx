import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../../../api";
import { Typography } from "@material-tailwind/react";

export default function TopicSorting() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currTopics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then(({ data: { topics } }) => {
        setLoading(false);
        setTopics(topics);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return error ? (
    "oh no an error loading the topic"
  ) : loading ? (
    "loading topics"
  ) : (
    <div className="my-10">
      <nav className="w-full flex flex-row justify-evenly">
        {currTopics.map((topic) => (
          <Link key={topic.slug} to={`/topics/${topic.slug}`}>
            <Typography className="text-lg lg:text-2xl font-bold hover:underline hover:underline-offset-[10px]">
              {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
            </Typography>
          </Link>
        ))}
      </nav>
    </div>
  );
}
