import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import useTopics from "../../hooks/useTopics";

export default function TopicSorting() {
  const { topics, loading, error } = useTopics();

  return error ? (
    "oh no an error loading the topic"
  ) : loading ? (
    "loading topics"
  ) : (
    <div className="my-10">
      <nav className="w-full flex flex-row justify-evenly">
        {topics.map((topic) => (
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
