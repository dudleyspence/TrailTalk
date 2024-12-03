import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "./api"; // Import the function from api.js

function ImageUpload({ setImageURL }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      uploadImage(file)
        .then((response) => {
          setImageURL(response.data.imageUrl); // Use the image URL from response
        })
        .catch((error) => {
          console.error("Error uploading the file: ", error);
        });
    },
    [setImageURL]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <p>Drag 'n' drop an image here, or click to select one</p>
    </div>
  );
}

export default ImageUpload;
