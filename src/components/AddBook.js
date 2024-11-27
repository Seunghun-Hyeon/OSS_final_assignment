import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";

const AddProduct = ({ fetchProducts }) => {
  const [newProduct, setNewProduct] = useState({
    // product 추가 위해
    username: "",
    bookname: "",
    price: "",
    coupon: false,
    quantity: "",
    date: "",
    destination: "",
  });

  const navigate = useNavigate(); // hook : 페이지 전환에 용이. onclick, window.href로도 할 수 있긴 하나, 이것도 훅이니 사용

  const usernameCheck = useRef(null);
  const booknameCheck = useRef(null);
  const priceCheck = useRef(null);
  const quantityCheck = useRef(null);
  const destinationCheck = useRef(null);

  // Product 추가 기능
  const addProduct = () => {
    fetch("https://6746607e512ddbd807fba991.mockapi.io/Book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Product added successfully");
          setNewProduct({
            username: "",
            bookname: "",
            price: 0,
            coupon: false,
            quantity: 0,
            date: "",
            destination: "",
          });
          navigate("/list"); // useNavigate Hook
        }
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const checkValid = () => {
    let bool = true;

    if (newProduct.username === "") {
      alert("Please enter your name");
      usernameCheck.current.focus();
      bool = false;
    } else if (newProduct.bookname === "") {
      alert("Please enter book name");
      booknameCheck.current.focus();
      bool = false;
    } else if (!newProduct.price || newProduct.price <= 0) {
      alert("Please enter the price");
      priceCheck.current.focus();
      bool = false;
    } else if (!newProduct.quantity || newProduct.quantity <= 0) {
      alert("Please enter the qualtity");
      quantityCheck.current.focus();
      bool = false;
    } else if (newProduct.destination === "") {
      alert("Please enter your shipping address");
      destinationCheck.current.focus();
      bool = false;
    }
    return bool;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValid()) {
      addProduct();
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
          value={newProduct.username}
          onChange={(e) =>
            setNewProduct({ ...newProduct, username: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Book Name"
          className="form-control mb-2"
          ref={booknameCheck}
          value={newProduct.bookname}
          onChange={(e) =>
            setNewProduct({ ...newProduct, bookname: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price"
          className="form-control mb-2"
          ref={priceCheck}
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="coupon"
            checked={newProduct.coupon}
            onChange={(e) =>
              setNewProduct({ ...newProduct, coupon: e.target.checked })
            }
          />
          <label className="form-check-label">Use Coupon</label>
        </div>
        <input
          type="text"
          placeholder="Quantity"
          className="form-control mb-2"
          ref={quantityCheck}
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity: e.target.value })
          }
        />
        <input
          type="date"
          className="form-control mb-2"
          value={newProduct.date}
          onChange={(e) =>
            setNewProduct({ ...newProduct, date: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Shipping Address"
          className="form-control mb-2"
          ref={destinationCheck}
          value={newProduct.destination}
          onChange={(e) =>
            setNewProduct({ ...newProduct, destination: e.target.value })
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

export default AddProduct;
