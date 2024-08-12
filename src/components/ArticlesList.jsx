import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticles } from "../../api";
import ArticleCard from "./ArticleCard";
import TopicsNav from "./TopicsNav";
import ListControls from "./ListControls";
import PageControls from "./PageControls";

export default function ArticlesList({
  username = undefined,
  notProfilePage = true,
}) {
  const [articlesList, setArticlesList] = useState([]);
  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(5);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [totalResults, setTotalResults] = useState(0);
  let navigate = useNavigate();

  function handleAddArticle() {
    navigate("/addarticle");
  }

  useEffect(() => {
    setPageNo(1);
    setSortBy("created_at");
    setOrder("desc");
  }, [topic]);

  useEffect(() => {
    setIsLoading(true);
    fetchArticles(topic, sortBy, order, pageNo, articlesPerPage, username)
      .then(({ data }) => {
        setTotalResults(data.total);
        setArticlesList(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [
    topic,
    setArticlesList,
    sortBy,
    order,
    pageNo,
    articlesPerPage,
    username,
  ]);

  return isError ? (
    "Error"
  ) : isLoading ? (
    <h2>is loading...</h2>
  ) : (
    <section className="section-container">
      <div className="addArticleButton">
        <button className="styled-button" onClick={handleAddArticle}>
          Add Article
        </button>
      </div>

      {notProfilePage && <TopicsNav />}
      <ListControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
        pageNo={pageNo}
        setPageNo={setPageNo}
        elementsPerPage={articlesPerPage}
        setElementsPerPage={setArticlesPerPage}
        canSortByComments={true}
      />
      <div id="articles-list-container">
        <ul className="articles-list">
          {articlesList.map((article) => (
            <li key={article.article_id} style={{ listStyle: "none" }}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
      <PageControls
        pageNo={pageNo}
        setPageNo={setPageNo}
        elementsPerPage={articlesPerPage}
        element_count={totalResults}
      />
    </section>
  );
}
