import { useState, useEffect } from "react";
import { getTopics } from "../../api";

const useTopics = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then(({ data: { topics } }) => {
        setLoading(false);
        setTopics(topics);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return { topics, loading, error };
};

export default useTopics;
