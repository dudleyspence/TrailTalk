import { FaceSmileIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useDropzone } from "react-dropzone";

export function DragAndDropUploader({
  onFileSelect,
  previewUrl,
  setPreviewUrl,
  avatar = false,
}) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
        onFileSelect(file);
      }
    },
  });

  const removeImage = () => {
    setPreviewUrl(null);
    onFileSelect(null);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      {!previewUrl ? (
        <div
          {...getRootProps({
            className:
              "dropzone cursor-pointer p-4 text-center border-dashed border-2 border-gray-400 rounded-md",
          })}
        >
          <input {...getInputProps()} />
          <p>Drag and drop an image here, or click to select a file</p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center gap-2">
          <img
            src={previewUrl}
            alt="Preview"
            className={`aspect-square rounded-lg object-cover object-center ${
              avatar ? "w-[100px] h-[100px]" : "w-full"
            }`}
          />
          <button onClick={removeImage} className="text-red-500 underline">
            Remove Image
          </button>
        </div>
      )}
    </div>
  );
}
