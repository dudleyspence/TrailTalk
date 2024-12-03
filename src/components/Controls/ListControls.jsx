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
    <div className="listControls">
      <div className="sortBy">
        <label htmlFor="sortBy">Sort By:</label>
        <select
          name="sortBy"
          id="sortBy"
          onChange={handleSortElements}
          value={`${sortBy}_${order}`}
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
      </div>
      <div className="elementsPerPage">
        <label htmlFor="elementsPerPage">
          {canSortByComments ? "Articles Per Page: " : "Comments Per Page: "}
        </label>
        <select
          name="commentsPerPage"
          id="commentsPerPage"
          onChange={handleElementsPerPage}
          value={elementsPerPage}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}
