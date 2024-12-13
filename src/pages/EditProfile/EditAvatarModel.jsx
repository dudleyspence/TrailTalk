import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { DragAndDropUploader } from "../../components/Utils/ArticleImageDropzone";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { updateUser } from "../../../api";
import LoadingAnimation from "../../components/UI/Lotties/Loading/LoadingAnimation";

export function EditAvatarModel() {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { userLoggedIn, setUserLoggedIn } = useAuth();

  const handleOpen = () => setOpen(!open);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "TrailAvatars");

    axios
      .post("https://api.cloudinary.com/v1_1/dvb1ktpjd/image/upload", formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;

        const userUpdate = { avatar_img_url: imageUrl };

        return updateUser(userLoggedIn.firebase_uid, userUpdate);
      })
      .then(({ data }) => {
        console.log(data.stats.avatar_img_url);

        setUploading(false);
        alert("Avatar successfully updated!");
        setUserLoggedIn({
          ...userLoggedIn,
          avatar_url: data.stats.avatar_img_url,
        });
        setOpen(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while uploading the avatar");
        setUploading(false);
      });
  };

  return (
    <>
      <Button
        size="sm"
        className="h-10"
        onClick={handleOpen}
        variant="gradient"
      >
        Edit Avatar
      </Button>
      <Dialog open={open} handler={handleOpen} className="flex flex-col">
        <DialogHeader>Upload a new profile image</DialogHeader>
        <DialogBody className="overflow-scroll">
          {uploading ? (
            <div className="flex flex-col justify-center items-center gap-1">
              <LoadingAnimation />
              <p>Uploading... This may take a minute</p>
            </div>
          ) : (
            <div className="w-full">
              <DragAndDropUploader
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                onFileSelect={(file) => setSelectedImage(file)}
                avatar={true}
              />
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setPreviewUrl(null);
              setSelectedImage(null);
              handleOpen();
            }}
            className="mr-1"
            disabled={uploading}
          >
            <span>Cancel</span>
          </Button>
          <Button
            disabled={uploading}
            variant="gradient"
            color="green"
            onClick={handleSubmit}
          >
            <span>{uploading ? "uploading..." : "Confirm"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
