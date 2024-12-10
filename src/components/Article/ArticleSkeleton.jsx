import React from "react";
import { Avatar, Typography } from "@material-tailwind/react";

export default function ArticleSkeleton() {
  return (
    <div className="w-full max-w-[1200px] flex flex-col items-center gap-5 py-5 md:py-10">
      <div className="w-full flex flex-col items-center gap-10">
        <div id="article_header" className="w-full">
          <div className="h-8 bg-gray-300 rounded-md w-3/4 mb-5 animate-pulse"></div>
          <div
            id="article_header_line2"
            className="flex flex-row justify-between items-end"
          >
            <div className="flex gap-2 flex-col sm:flex-row items-start sm:items-center">
              <Avatar
                variant="circular"
                className="h-[38px] w-[38px] sm:h-[58px] sm:w-[58px] bg-gray-300 ml-2 sm:ml-0 animate-pulse"
              />
              <div className="flex flex-col ml-3 text-sm">
                <span className="h-4 w-20 bg-gray-300 rounded-md animate-pulse"></span>
                <span className="h-3 w-32 bg-gray-300 rounded-md mt-2 animate-pulse"></span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-16 bg-gray-300 rounded-md animate-pulse"></div>
              <Typography className="h-4 w-24 bg-gray-300 rounded-md animate-pulse"></Typography>
            </div>
          </div>
        </div>
        <div id="article_body" className="w-full">
          <div className="h-64 md:h-96 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
        <div id="article-content" className="w-full">
          <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-4/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-3/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-2/6 mb-3 animate-pulse"></div>
        </div>
        <div id="article-content" className="w-full">
          <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-4/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-3/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-2/6 mb-3 animate-pulse"></div>
        </div>
        <div id="article-content" className="w-full">
          <div className="h-4 bg-gray-300 rounded-md w-5/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-4/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-3/6 mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded-md w-2/6 mb-3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
