import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateBook = () => {
  const { id } = useParams(); // 아이디를 가져온다.
  const navigate = useNavigate();
  const usernameCheck = useRef(null);
  const booknameCheck = useRef(null);
  const priceCheck = useRef(null);
  const quantityCheck = useRef(null);
  const destinationCheck = useRef(null);

  useEffect(() => {
    fetch(`https://6746607e512ddbd807fba991.mockapi.io/Book/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentBook(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  const [currentBook, setCurrentBook] = useState({
    username: "",
    bookname: "",
    price: "",
    coupon: false,
    quantity: "",
    date: "",
    destination: "",
  });
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <p>Loading...</p>;
  }

  const updateBook = () => {
    fetch(`https://6746607e512ddbd807fba991.mockapi.io/Book/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentBook),
    })
      .then((response) => {
        if (response.ok) {
          navigate("/list"); // useNavigate Hook
        }
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const checkValid = () => {
    let bool = true;

    if (currentBook.username === "") {
      alert("Please enter your name");
      usernameCheck.current.focus();
      bool = false;
    } else if (currentBook.bookname === "") {
      alert("Please enter book name");
      booknameCheck.current.focus();
      bool = false;
    } else if (!currentBook.price || currentBook.price <= 0) {
      alert("Please enter the price");
      priceCheck.current.focus();
      bool = false;
    } else if (!currentBook.quantity || currentBook.quantity <= 0) {
      alert("Please enter the quantity");
      quantityCheck.current.focus();
      bool = false;
    } else if (currentBook.destination === "") {
      alert("Please enter your shipping address");
      destinationCheck.current.focus();
      bool = false;
    }
    return bool;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValid()) {
      updateBook();
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
      <h2>Update Book in Shopping Basket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          className="form-control mb-2"
          ref={usernameCheck}
          value={currentBook.username}
          onChange={(e) =>
            setCurrentBook({ ...currentBook, username: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Book Name"
          className="form-control mb-2"
          ref={booknameCheck}
          value={currentBook.bookname}
          onChange={(e) =>
            setCurrentBook({ ...currentBook, bookname: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price"
          className="form-control mb-2"
          ref={priceCheck}
          value={currentBook.price}
          onChange={(e) =>
            setCurrentBook({ ...currentBook, price: e.target.value })
          }
        />
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="coupon"
            checked={currentBook.coupon}
            onChange={(e) =>
              setCurrentBook({ ...currentBook, coupon: e.target.checked })
            }
          />
          <label className="form-check-label">
            {currentBook.coupon ? "Use Coupon" : "No Coupon"}
          </label>
        </div>
        <input
          type="text"
          placeholder="Quantity"
          className="form-control mb-2"
          ref={quantityCheck}
          value={currentBook.quantity}
          onChange={(e) =>
            setCurrentBook({ ...currentBook, quantity: e.target.value })
          }
        />
        <input
          type="date"
          className="form-control mb-2"
          value={currentBook.date}
          onChange={(e) =>
            setCurrentBook({ ...currentBook, date: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Shipping Address"
          className="form-control mb-2"
          ref={destinationCheck}
          value={currentBook.destination}
          onChange={(e) =>
            setCurrentBook({
              ...currentBook,
              destination: e.target.value,
            })
          }
        />
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <Link to="/list" className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default UpdateBook;
