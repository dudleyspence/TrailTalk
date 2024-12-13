import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import DOMPurify from "dompurify";

export function PreviewModel({ title, topic, body, image, uploading }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="gradient"
        size="sm"
        disabled={!title || !topic || !body || !image || uploading}
      >
        Preview Article
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xxl"
        className="px-[6vw] md:px-[10vw] flex flex-col justify-center"
      >
        <DialogHeader>{title}</DialogHeader>
        <DialogBody className="overflow-scroll">
          <img
            className="h-auto w-full aspect-square md:aspect-video rounded-lg object-cover object-center"
            src={image}
          />
          <div
            id="article-content"
            className="prose prose-md max-w-none"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(body),
            }}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close Preview</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
