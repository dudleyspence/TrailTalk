import { useState, useEffect, useContext } from "react";
import { getTopics } from "../../../api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD:src/components/Articles/AddArticle.jsx
import { addArticle, sendImage } from "../../../api";
=======
import { addArticle, sendImage } from "../../api";
>>>>>>> a572cc3737869d58859fc0babae60ca73f75cf5f:src/components/AddArticle.jsx

export default function AddArticle() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currTopics, setTopics] = useState([]);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [articleTopic, setArticleTopic] = useState("general");
  const [articleImg, setArticleImg] = useState("");
  const { userLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [file, setFile] = useState();

  function handleArticleBodyChange(event) {
    setArticleBody(event.target.value);
  }

  function handleArticleImgChange(event) {
    setArticleImg(event.target.value);
  }

  function handleArticleTitleChange(event) {
    setArticleTitle(event.target.value);
  }

  function handleArticleTopicChange(event) {
    setArticleTopic(event.target.value);
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handlePostArticle(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    sendImage(formData, config).then((articleImg) => {
      const article = {
        author: userLoggedIn.username,
        title: articleTitle,
        body: articleBody,
        topic: articleTopic,
        article_img_url: articleImg,
      };
      addArticle(article)
        .then(({ data }) => {
          console.log(data);
          setIsLoading(false);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        });
    });
  }

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
    "error"
  ) : isLoading ? (
    "loading"
  ) : (
    <div className="AddArticle">
      <form>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleArticleTitleChange}
            required
          />
        </label>

        <label htmlFor="img">
          Article Image URL:
          <input
            type="file"
            name="img"
            id="img"
            onChange={handleFileChange}
            required
          />
        </label>

        <label htmlFor="img">
          Topic:
          <select
            value={articleTopic}
            name="topic"
            id="topic"
            onChange={handleArticleTopicChange}
          >
            {currTopics.map((topic) => (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="article" className="articleInputArea">
          Article:
          <textarea
            onChange={handleArticleBodyChange}
            placeholder="Type your article here"
            className="articleInputArea"
            name="article"
            id="article"
            required
          ></textarea>
        </label>
        <button
          type="submit"
          onClick={handlePostArticle}
          className="styled-button "
          disabled={
            articleBody === "" || articleTitle === "" || articleImg === ""
          }
        >
          <p>Add Article</p>
        </button>
      </form>
    </div>
  );
}
