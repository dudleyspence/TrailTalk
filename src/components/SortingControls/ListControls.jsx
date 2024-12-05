import { Option, Select } from "@material-tailwind/react";
import React from "react";

export default function ListControls({
  sortBy,
  setSortBy,
  order,
  setOrder,
  setPageNo,
  elementsPerPage,
  setElementsPerPage,
  canSortByComments = false,
}) {
  function handleSortElements(event) {
    const selectedSortBy = event.target.value;

    if (selectedSortBy === "votes_desc") {
      setSortBy("votes");
      setOrder("desc");
    } else if (selectedSortBy === "votes_asc") {
      setSortBy("votes");
      setOrder("asc");
    } else if (selectedSortBy === "created_at_desc") {
      setSortBy("created_at");
      setOrder("desc");
    } else if (selectedSortBy === "created_at_asc") {
      setSortBy("created_at");
      setOrder("asc");
    } else if (canSortByComments && selectedSortBy === "comment_count_asc") {
      setSortBy("comment_count");
      setOrder("asc");
    } else if (canSortByComments && selectedSortBy === "comment_count_desc") {
      setSortBy("comment_count");
      setOrder("desc");
    }
  }

  function handleElementsPerPage(event) {
    const selectedElementsPerPage = Number(event.target.value);
    setElementsPerPage(selectedElementsPerPage);
    setPageNo(1);
  }

  return (
    <div className="flex flex-row gap-5 justify-center items-center">
      <div className="w-full max-w-sm min-w-[100px]">
        <div className="relative">
          <select
            label="Sort By:"
            onChange={handleSortElements}
            value={`${sortBy}_${order}`}
            size="sm"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
          >
            <option value="votes_desc">Most Popular</option>
            <option value="votes_asc">Least Popular</option>
            <option value="created_at_desc">Newest</option>
            <option value="created_at_asc">Oldest</option>
            {canSortByComments && (
              <option value="comment_count_desc">Most Comments</option>
            )}
            {canSortByComments && (
              <option value="comment_count_asc">Least Comments</option>
            )}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="h-5 w-5 ml-1 absolute top-2 right-2.5 text-slate-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </div>
      </div>

      <div className="w-full max-w-sm min-w-[40px]">
        <div className="relative">
          <select
            label={
              canSortByComments ? "Articles Per Page:" : "Comments Per Page:"
            }
            onChange={handleElementsPerPage}
            value={elementsPerPage}
            size="sm"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
          >
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="h-5 w-5 ml-1 absolute top-2 right-2.5 text-slate-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
