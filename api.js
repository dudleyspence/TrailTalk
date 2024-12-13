import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://be-news-api-production.up.railway.app/api",
});

export const fetchArticles = (
  topic,
  sortBy,
  order,
  pageNo,
  articlesPerPage,
  firebaseUID = null
) => {
  const queries = {
    params: {
      topic: topic,
      sort_by: sortBy,
      order: order,
      p: pageNo,
      limit: articlesPerPage,
    },
  };
  if (firebaseUID) {
    queries.params["author"] = firebaseUID;
  }
  return newsApi.get("/articles", queries);
};

export const fetchArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`);
};

export const fetchUserStats = (firebase_uid) => {
  return newsApi.get(`/users/stats/${firebase_uid}`);
};

export const updateArticleVotes = (article_id, voteChange) => {
  return newsApi.patch(`/articles/${article_id}`, { inc_votes: voteChange });
};

export const fetchComments = (
  article_id,
  pageNo,
  commentsPerPage,
  sortBy,
  order
) => {
  const queries = {
    params: {
      limit: commentsPerPage,
      p: pageNo,
      sort_by: sortBy,
      order: order,
    },
  };
  return newsApi.get(`/articles/${article_id}/comments`, queries);
};

export const updateCommentVotes = (comment_id, voteChange) => {
  console.log(comment_id, voteChange);
  return newsApi.patch(`/comments/${comment_id}`, { inc_votes: voteChange });
};

export const fetchUserByFirebaseUID = (firebase_uid) => {
  return newsApi.get(`/users/${firebase_uid}`);
};

export const addComment = (article_id, firebase_uid, body) => {
  console.log("firebase_uid:", firebase_uid);
  console.log("article_id:", article_id);
  console.log("body:", body);

  const comment = {
    author: firebase_uid,
    body: body,
  };
  return newsApi.post(`/articles/${article_id}/comments`, comment);
};

export const deleteCommentByCommentId = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};

export const getTopics = () => {
  return newsApi.get("/topics");
};

export const addArticle = (article) => {
  console.log(article);
  return newsApi.post("/articles", article);
};

export const deleteArticleById = (article_id) => {
  return newsApi.delete(`/articles/${article_id}`);
};

export const addUser = (firebase_uid, username, name, avatar_url) => {
  const body = {
    firebase_uid,
    username,
    name,
  };
  if (avatar_url) {
    body["avatar_url"] = avatar_url;
  }
  console.log(body);

  return newsApi.post("/users", body);
};

export const updateUser = (firebase_uid, update) => {
  const body = update;

  return newsApi.patch(`/users/${firebase_uid}`, body);
};
