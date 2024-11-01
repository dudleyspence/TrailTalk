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
  username
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
  if (username) {
    queries.params["author"] = username;
  }
  console.log(queries);
  return newsApi.get("/articles", queries);
};

export const fetchArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`);
};

export const updateArticleVotes = (article_id, voteChange) => {
  return newsApi.patch(`/articles/${article_id}`, { inc_votes: voteChange });
};

export const fetchCommentsByArticleId = (
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
  return newsApi.patch(`/comments/${comment_id}`, { inc_votes: voteChange });
};

export const getUserByUsername = (username) => {
  return newsApi.get(`/users/${username}`);
};

export const addArticleCommentByUsername = (article_id, username, body) => {
  console.log(article_id);
  console.log(username);
  console.log(body);
  const comment = {
    username: username,
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
  console.log(article_id);
  return newsApi.delete(`/articles/${article_id}`);
};

export const sendImage = (formData, config) => {
  newsApi.post("/images", formData, config);
};
