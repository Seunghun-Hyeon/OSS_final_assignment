import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteBook from "./DeleteBook";
import { Link } from "react-router-dom";

const ShowBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setLoading(true);
    fetch("https://6746607e512ddbd807fba991.mockapi.io/Book")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "50px" }}>My Cart</h2>
      <Link
        to="/add"
        className="btn btn-primary mb-3"
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          width: "100px",
          margin: "45px",
        }}
      >
        Add Book
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          id="contents"
          style={{
            backgroundColor: "#ffffff",
            padding: "10px",
            // border: "1px solid lightgray",
            borderRadius: "5px",
            margin: "10px",
          }}
        >
          {/* Header Row */}
          <div
            className="row font-weight-bold text-black"
            style={{
              padding: "4px",
              fontSize: "20px",
              display: "none", // 기본적으로 헤더를 숨김
            }}
          >
            <div className="col-12 col-md">Username</div>
            <div className="col-12 col-md">Bookname</div>
            <div className="col-12 col-md">Price</div>
            <div className="col-12 col-md">Coupon</div>
            <div className="col-12 col-md">Quantity</div>
            <div className="col-12 col-md">Date</div>
            <div className="col-12 col-md">Destination</div>
            <div className="col-12 col-md">Actions</div>
          </div>
          {/* Data Rows */}
          {books.map((book) => (
            <div
              className="row mb-3 p-2"
              key={book.id}
              style={{
                borderBottom: "1px solid lightgray",
              }}
            >
              <div className="col-12 col-md">
                <strong>Username:</strong> {book.username}
              </div>
              <div className="col-12 col-md">
                <strong>Bookname:</strong> {book.bookname}
              </div>
              <div className="col-12 col-md">
                <strong>Price:</strong> ₩{book.price}
              </div>
              <div className="col-12 col-md">
                <strong>Coupon:</strong> {book.coupon ? "Yes" : "No"}
              </div>
              <div className="col-12 col-md">
                <strong>Quantity:</strong> {book.quantity}
              </div>
              <div className="col-12 col-md">
                <strong>Date:</strong> {book.date}
              </div>
              <div className="col-12 col-md">
                <strong>Destination:</strong> {book.destination}
              </div>
              <div
                className="col-12 col-md mt-2"
                style={{ display: "flex", gap: "10px" }}
              >
                <Link
                  to={`/update/${book.id}`}
                  className="btn btn-info btn-sm text-white"
                  style={{ height: "30px" }}
                >
                  Modify
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ height: "30px" }}
                  onClick={() => DeleteBook(book.id, fetchBooks)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
