import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateProduct = () => {
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
        setCurrentProduct(data);
        setLoading(false);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [id]);

  const [currentProduct, setCurrentProduct] = useState({
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

  const updateProduct = () => {
    fetch(`https://6746607e512ddbd807fba991.mockapi.io/Book/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentProduct),
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

    if (currentProduct.username === "") {
      alert("Please enter your name");
      usernameCheck.current.focus();
      bool = false;
    } else if (currentProduct.bookname === "") {
      alert("Please enter book name");
      booknameCheck.current.focus();
      bool = false;
    } else if (!currentProduct.price || currentProduct.price <= 0) {
      alert("Please enter the price");
      priceCheck.current.focus();
      bool = false;
    } else if (!currentProduct.quantity || currentProduct.quantity <= 0) {
      alert("Please enter the qualtity");
      quantityCheck.current.focus();
      bool = false;
    } else if (currentProduct.destination === "") {
      alert("Please enter your shipping address");
      destinationCheck.current.focus();
      bool = false;
    }
    return bool;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValid()) {
      updateProduct();
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
          placeholder=""
          className="form-control mb-2"
          ref={usernameCheck}
          value={currentProduct.username}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, username: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Book Name"
          className="form-control mb-2"
          ref={booknameCheck}
          value={currentProduct.bookname}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, bookname: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price"
          className="form-control mb-2"
          ref={priceCheck}
          value={currentProduct.price}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, price: e.target.value })
          }
        />
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="coupon"
            checked={currentProduct.coupon}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct, coupon: e.target.checked })
            }
          />
          <label className="form-check-label">
            {currentProduct.coupon ? "Use Coupon" : "No Coupon"}
          </label>
        </div>
        <input
          type="text"
          placeholder="Quantity"
          className="form-control mb-2"
          ref={quantityCheck}
          value={currentProduct.quantity}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, quantity: e.target.value })
          }
        />
        <input
          type="date"
          className="form-control mb-2"
          value={currentProduct.date}
          onChange={(e) =>
            setCurrentProduct({ ...currentProduct, date: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Shipping Address"
          className="form-control mb-2"
          ref={destinationCheck}
          value={currentProduct.destination}
          onChange={(e) =>
            setCurrentProduct({
              ...currentProduct,
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

export default UpdateProduct;
