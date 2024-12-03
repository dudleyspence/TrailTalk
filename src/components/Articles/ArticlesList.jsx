import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticles } from "../../../api";
import ArticleCard from "./ArticleCard";
import TopicsNav from "./TopicsNav";
import ListControls from "../Controls/ListControls";
import PageControls from "../Controls/PageControls";
import DeleteArticle from "./deleteArticle";
import LoadingAnimation from "../UI/LoadingAnimation";
import { Button } from "@material-tailwind/react";

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
    console.log(username);
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
    <LoadingAnimation />
  ) : (
    <section className="section-container">
      <div>
        <Button
          size="sm"
          className="text-[10px] bg-TrailGreen"
          onClick={handleAddArticle}
        >
          Add Article
        </Button>
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
              <ArticleCard
                article={article}
                deleteComponent={
                  notProfilePage ? undefined : (
                    <DeleteArticle
                      article_id={article.article_id}
                      articlesList={articlesList}
                      setArticlesList={setArticlesList}
                    />
                  )
                }
              />
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
