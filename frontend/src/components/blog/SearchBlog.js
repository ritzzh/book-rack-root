import React, { useEffect } from "react";

function SearchBlog() {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery) {
      fetch(`${baseURL}/api/search?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.log(error));
    } 
  }, [searchQuery]);
  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBlog;
