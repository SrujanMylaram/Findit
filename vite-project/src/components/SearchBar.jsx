import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function SearchBar({ data, onResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const Visible = ["/report-lost", "/report-found"];

  const isVisible = Visible.includes(location.pathname);  

    if (!data || data.length === 0) {
        return null; 
    }

  const handleSearch = (e) => {
    e.preventDefault();

    if (!data) return;

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    onResults(filtered);
    console.log("Search Results:", filtered);
  };

  if( !isVisible ) {
    return null; 
  }

  return (
    <form onSubmit={handleSearch} className="search-form mb-4">
      <div className="input-group search-input-group">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search for lost or found items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-primary search-btn" type="submit">
          <i className="fas fa-search me-2"></i> Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
