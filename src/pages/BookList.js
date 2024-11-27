import React, { useState, useEffect } from "react";

const BookList = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [category, setCategory] = useState("All");

  const key = "AIzaSyCBFn95bvTPQaBPZnCS-SvQUO_rhgbRJUg";

  // load data
  const fetchAllBooks = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=all&key=${key}&maxResults=20`
    )
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.items || []);
        setFilteredBooks(data.items || []);
      })
      .catch((error) => console.error("Error fetching books:", error));
  };

  // search
  const searchBooks = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${key}&maxResults=20`
    )
      .then((response) => response.json())
      .then((data) => {
        setBooks(data.items || []);
        setFilteredBooks(data.items || []);
      })
      .catch((error) => console.error("Error searching books:", error));
  };

  // filtering along category
  const filterByCategory = (category) => {
    setCategory(category);
    if (category === "All") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) =>
        book.volumeInfo.categories
          ? book.volumeInfo.categories.includes(category)
          : false
      );
      setFilteredBooks(filtered);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    searchBooks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Google Books</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search for book"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "10px", width: "300px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", marginLeft: "10px" }}
        >
          Search
        </button>
      </form>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => filterByCategory("All")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: category === "All" ? "#ddd" : "#fff",
          }}
        >
          All
        </button>
        <button
          onClick={() => filterByCategory("Fiction")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: category === "Fiction" ? "#ddd" : "#fff",
          }}
        >
          Fiction
        </button>
        <button
          onClick={() => filterByCategory("Science")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: category === "Science" ? "#ddd" : "#fff",
          }}
        >
          Science
        </button>
        <button
          onClick={() => filterByCategory("History")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: category === "History" ? "#ddd" : "#fff",
          }}
        >
          History
        </button>
        <button
          onClick={() => filterByCategory("Art")}
          style={{
            padding: "10px 20px",
            backgroundColor: category === "Art" ? "#ddd" : "#fff",
          }}
        >
          Art
        </button>
      </div>

      <div>
        {filteredBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              {book.volumeInfo.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  style={{
                    width: "100px",
                    height: "150px",
                    objectFit: "cover", // 이미지 비율
                  }}
                />
              )}

              <div>
                <h5>{book.volumeInfo.title}</h5>
                <p>
                  Authors:{" "}
                  {book.volumeInfo.authors
                    ? book.volumeInfo.authors.join(", ")
                    : "Unknown"}
                  <br></br>
                  Categories:{" "}
                  {book.volumeInfo.categories
                    ? book.volumeInfo.categories.join(", ")
                    : "None"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;
