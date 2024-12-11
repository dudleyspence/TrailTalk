import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserStats } from "../../api";

export function useStats() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    fetchUserStats(userLoggedIn.firebase_uid).then(({ data }) => {
      setTotalPosts(Number(data.stats.totalposts));
      setTotalVotes(Number(data.stats.totalvotes));
    });
  }, [userLoggedIn]);

  return { totalPosts, totalVotes };
}
