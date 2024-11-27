import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link, useLocation } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const usernameCheck = useRef(null);
  const booknameCheck = useRef(null);
  const priceCheck = useRef(null);
  const quantityCheck = useRef(null);
  const destinationCheck = useRef(null);

  const [newBook, setNewBook] = useState({
    username: "",
    bookname: location.state?.bookname || "",
    price: location.state?.price || "",
    coupon: false,
    quantity: "",
    date: "",
    destination: "",
  });

  const addBook = () => {
    fetch("https://6746607e512ddbd807fba991.mockapi.io/Book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Book added successfully");
          setNewBook({
            username: "",
            bookname: "",
            price: "",
            coupon: false,
            quantity: "",
            date: "",
            destination: "",
          });
          navigate("/list"); // useNavigate Hook
        }
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  const checkValid = () => {
    let bool = true;

    if (newBook.username === "") {
      alert("Please enter your name");
      usernameCheck.current.focus();
      bool = false;
    } else if (newBook.bookname === "") {
      alert("Please enter book name");
      booknameCheck.current.focus();
      bool = false;
    } else if (!newBook.price || newBook.price <= 0) {
      alert("Please enter the price");
      priceCheck.current.focus();
      bool = false;
    } else if (!newBook.quantity || newBook.quantity <= 0) {
      alert("Please enter the quantity");
      quantityCheck.current.focus();
      bool = false;
    } else if (newBook.destination === "") {
      alert("Please enter your shipping address");
      destinationCheck.current.focus();
      bool = false;
    }
    return bool;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValid()) {
      addBook();
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "600px",
        width: "100%",
        padding: "20px",
      }}
    >
      <br></br>
      <h2>Add Book in Shopping Basket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          className="form-control mb-2"
          ref={usernameCheck}
          value={newBook.username}
          onChange={(e) => setNewBook({ ...newBook, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Book Name"
          className="form-control mb-2"
          ref={booknameCheck}
          value={newBook.bookname}
          onChange={(e) => setNewBook({ ...newBook, bookname: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          className="form-control mb-2"
          ref={priceCheck}
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
        />
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="coupon"
            checked={newBook.coupon}
            onChange={(e) =>
              setNewBook({ ...newBook, coupon: e.target.checked })
            }
          />
          <label className="form-check-label">Use Coupon</label>
        </div>
        <input
          type="text"
          placeholder="Quantity"
          className="form-control mb-2"
          ref={quantityCheck}
          value={newBook.quantity}
          onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })}
        />
        <input
          type="date"
          className="form-control mb-2"
          value={newBook.date}
          onChange={(e) => setNewBook({ ...newBook, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Shipping Address"
          className="form-control mb-2"
          ref={destinationCheck}
          value={newBook.destination}
          onChange={(e) =>
            setNewBook({ ...newBook, destination: e.target.value })
          }
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
        <Link to="/list" className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AddBook;
