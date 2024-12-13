import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useHelpModal } from "../../context/HelpModelContext";
import logo from "../../assets/Brand/Logo/TrailLogo.png";

export function HelpModel() {
  const { isOpen, closeHelpModal } = useHelpModal();

  return (
    <>
      <Dialog
        size="xxl"
        open={isOpen}
        handler={closeHelpModal}
        className="overflow-scroll p-2"
      >
        <DialogHeader className="justify-center flex-col">
          <img className="h-14" src={logo} alt="logo" />
          <Typography color="black" variant="h4" className="w-full mt-5">
            Welcome to TrailTalk
          </Typography>

          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            className="right-3 top-3 !absolute"
            onClick={closeHelpModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <Typography color="black" variant="h5" className="w-full mt-5">
            What is TrailTalk?
          </Typography>
          <Typography color="black" className="w-full mt-5">
            TrailTalk is a vibrant blogging and social platform for outdoor
            enthusiasts who love Hiking, Trails, Camping, and all things wild
            and adventurous. Whether you're sharing your own experiences,
            discovering new destinations, or connecting with like-minded
            adventurers, TrailTalk is your go-to space for exploring and
            celebrating the great outdoors.
          </Typography>

          <Typography color="black" variant="h5" className="w-full mt-8">
            Getting Started
          </Typography>
          <Typography color="black" className="w-full mt-5">
            <ol className="list-decimal ml-5">
              <li>
                <strong>Create an Account:</strong> Sign up with your email and
                password or easily use your Gmail account to get started.
              </li>
              <li>
                <strong>Browse Articles:</strong> Explore a wide variety of
                articles written by fellow enthusiasts. Filter your search to
                find topics and trails that inspire you the most.
              </li>
              <li>
                <strong>Engage with the Community:</strong> Read, comment, and
                vote on articles to show your support and keep the conversation
                going.
              </li>
            </ol>
          </Typography>

          <Typography color="black" variant="h5" className="w-full mt-8">
            How Voting Works
          </Typography>
          <Typography color="black" className="w-full mt-5">
            TrailTalk uses a unique voting system where every upvote adds to an
            article's "altitude." The higher the altitude, the more visibility
            the article gains, helping great content reach more readers. On your
            profile, you can see your total accumulated altitude, showcasing
            your contributions to the community and your engagement with the
            platform.
          </Typography>

          <Typography color="black" variant="h5" className="w-full mt-8">
            Creating Your First Article
          </Typography>
          <Typography color="black" className="w-full mt-5">
            Writing your first article on TrailTalk is simple and intuitive. The
            platform requires you to provide four key inputs:
            <ul className="list-disc ml-5 mt-2">
              <li>
                <strong>Title:</strong> A catchy and descriptive headline for
                your article.
              </li>
              <li>
                <strong>Topic:</strong> Choose a category or tag that best
                describes your article.
              </li>
              <li>
                <strong>Article Body:</strong> The main content of your article,
                written using our rich text editor. The editor allows for basic
                formatting, such as bold, italics, headings, lists, and more,
                giving your article a polished and professional look.
              </li>
              <li>
                <strong>Image:</strong> Upload a single image that visually
                represents your article. This image will be featured prominently
                in your post.
              </li>
            </ul>
            Once you’ve filled out these inputs, you can preview your article
            before publishing it to the community.
          </Typography>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeHelpModal}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
