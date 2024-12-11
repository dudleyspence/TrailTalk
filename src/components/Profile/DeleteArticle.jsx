import { useState } from "react";
import { deleteArticleById } from "../../../api";

import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function DeleteArticle({ article_id, setArticles, articles }) {
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  function handleDeleteArticle() {
    console.log(article_id);
    deleteArticleById(article_id)
      .then(() => {
        const refreshedArticlesList = articles.filter(
          (singleArticle) => singleArticle.article_id !== article_id
        );
        setArticles(refreshedArticlesList);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }

  if (error) {
    return "there seems to be an error";
  }

  return (
    <>
      <Button onClick={handleOpen} className="p-0" variant="gradient">
        <svg
          className="h-12 w-12 fill-white"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby="trashCanTitle"
          role="img"
        >
          <title id="trashCanTitle">Trash Can Icon</title>
          <path d="M667.8 362.1H304V830c0 28.2 23 51 51.3 51h312.4c28.4 0 51.4-22.8 51.4-51V362.2h-51.3z" />
          <path d="M750.3 295.2c0-8.9-7.6-16.1-17-16.1H289.9c-9.4 0-17 7.2-17 16.1v50.9c0 8.9 7.6 16.1 17 16.1h443.4c9.4 0 17-7.2 17-16.1v-50.9z" />
          <path d="M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c0.1-20.2-16.9-36.8-37.7-36.8z m-293.5-41.5h145.3v41.5H439.8v-41.5z m-146.2 83.1H729.5v41.5H293.6v-41.5z m404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z" />
          <path
            d="M511.6 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.4 9.3 20.7 20.8 20.7zM407.8 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0.1 11.4 9.4 20.7 20.8 20.7zM615.4 799.6c11.5 0 20.8-9.3 20.8-20.8V467.4c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.5 9.3 20.8 20.8 20.8z"
            fill="#211F1E"
          />
        </svg>
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          Are you sure you want to delete this article?
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleDeleteArticle();
              handleOpen();
            }}
          >
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
