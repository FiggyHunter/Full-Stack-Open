import React from "react";

export default function Filter({ searchTerm, handleSearchTerm }) {
  return (
    <div>
      filter shown with:{" "}
      <input value={searchTerm} onChange={handleSearchTerm} />
    </div>
  );
}
