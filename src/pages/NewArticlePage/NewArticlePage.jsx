import React, { useState } from "react";
import axios from "axios";
import { Input, Button } from "@material-tailwind/react";
import useTopics from "../../hooks/useTopics";
import { DragAndDropUploader } from "../../components/Utils/ArticleImageDropzone";
import { useAuth } from "../../context/AuthContext";
import { addArticle } from "../../../api";
import BasicEditor from "../../components/PostArticle/TipTap/TipTapEditor";
import { useNavigate } from "react-router-dom";
import { PreviewModel } from "../../components/PostArticle/PreviewModel";

export default function NewArticlePage() {
  const { topics, loading, error } = useTopics();
  const [title, setTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      title,
      selectedTopic,
      articleContent,
      selectedImage,
      userLoggedIn.firebase_uid
    );

    if (
      !title.trim() ||
      !selectedTopic ||
      !articleContent.trim() ||
      !selectedImage
    ) {
      alert("Please fill all required fields, including an image.");
      return;
    }

    setUploading(true);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", uploadPreset);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      )
      .then((response) => {
        const imageUrl = response.data.secure_url;

        const articleData = {
          author: userLoggedIn.firebase_uid,
          title,
          topic: selectedTopic,
          body: articleContent,
          article_img_url: imageUrl,
        };

        return addArticle(articleData);
      })
      .then(() => {
        setUploading(false);
        alert("Article submitted successfully!");
        setTitle("");
        setSelectedTopic("");
        setArticleContent("");
        setSelectedImage(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while submitting the article.");
        setUploading(false);
      });
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto p-4">
      {loading && <p>Loading topics...</p>}
      {error && <p>Error loading topics</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Input
          variant="outlined"
          size="lg"
          label="Article Title"
          className="text-xl"
          placeholder="Enter your article title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {!loading && !error && (
          <div>
            <select
              id="topic-select"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose a topic...
              </option>
              {topics.map((topic) => (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}
        <BasicEditor setArticleContent={setArticleContent} />
        <DragAndDropUploader
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          onFileSelect={(file) => setSelectedImage(file)}
        />

        <div className="w-full flex flex-row justify-end gap-5">
          <PreviewModel
            title={title}
            topic={selectedTopic}
            body={articleContent}
            image={previewUrl}
            uploading={uploading}
          />
          <Button
            type="submit"
            size="sm"
            className="w-fit self-end"
            disabled={
              uploading ||
              !title.trim() ||
              !selectedTopic ||
              !articleContent.trim() ||
              !selectedImage
            }
          >
            {uploading ? "Uploading..." : "Submit Article"}
          </Button>
        </div>
      </form>
    </div>
  );
}
