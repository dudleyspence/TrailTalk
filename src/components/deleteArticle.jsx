import { useState } from "react";
import { deleteArticleById } from "../../api";
import binImg from "../assets/deletebin.png";

export default function DeleteArticle({
  articlesList,
  setArticlesList,
  article_id,
}) {
  const [isError, setIsError] = useState(false);

  function handleDeleteArticle() {
    deleteArticleById(article_id)
      .then(() => {
        const refreshedArticlesList = articlesList.filter(
          (singleArticle) => singleArticle.article_id !== article_id
        );
        setArticlesList(refreshedArticlesList);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }

  return isError ? (
    "Error Deleting"
  ) : (
    <div className="deleteArticleButton">
      <button className="deleteButton" onClick={handleDeleteArticle}>
        <img src={binImg} alt="a delete button" />
      </button>
    </div>
  );
}
