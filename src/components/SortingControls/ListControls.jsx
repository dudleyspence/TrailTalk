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
    const selectedSortBy = event;

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
    const selectedElementsPerPage = Number(event);
    setElementsPerPage(selectedElementsPerPage);
    setPageNo(1);
  }

  return (
    <div className="flex flex-row gap-5 justify-center items-center w-[200px]">
      <Select
        label="Sort By:"
        onChange={handleSortElements}
        value={`${sortBy}_${order}`}
      >
        <Option value="votes_desc">Most Popular</Option>
        <Option value="votes_asc">Least Popular</Option>
        <Option value="created_at_desc">Newest</Option>
        <Option value="created_at_asc">Oldest</Option>
        {canSortByComments && (
          <Option value="comment_count_desc">Most Comments</Option>
        )}
        {canSortByComments && (
          <Option value="comment_count_asc">Least Comments</Option>
        )}
      </Select>
      <Select
        label={
          canSortByComments ? "Articles Per Page: " : "Comments Per Page: "
        }
        onChange={handleElementsPerPage}
        value={elementsPerPage.toString()}
      >
        <Option value={"6"}>6</Option>
        <Option value={"10"}>10</Option>
        <Option value={"20"}>20</Option>
      </Select>
    </div>
  );
}
