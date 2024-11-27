import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DeleteProduct from "./DeleteBook";
import { Link } from "react-router-dom";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    fetch("https://6746607e512ddbd807fba991.mockapi.io/Book")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h2 style={{ fontSize: "50px" }}>Shopping Basket</h2>
      <button className="btn btn-primary me-2" onClick={fetchProducts}>
        Bring all products data
      </button>

      <Link to="/add" className="btn btn-primary">
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
            border: "1px solid lightgray",
            borderRadius: "5px",
            margin: "10px",
          }}
        >
          <div
            className="row mb-2 font-weight-bold text-black"
            style={{
              padding: "4px",
              fontSize: "20px",
            }}
          >
            <div className="col">Username</div>
            <div className="col">Bookname</div>
            <div className="col">Price</div>
            <div className="col">Coupon</div>
            <div className="col">Quantity</div>
            <div className="col">Date</div>
            <div className="col">Destination</div>
            <div className="col">Actions</div>
          </div>
          {products.map((product) => (
            <div className="row mb-2" key={product.id}>
              <div className="col">{product.username}</div>
              <div className="col">{product.bookname}</div>
              <div className="col">${product.price}</div>
              <div className="col">{product.coupon ? "Yes" : "No"}</div>
              <div className="col">{product.quantity}</div>
              <div className="col">{product.date}</div>
              <div className="col">{product.destination}</div>
              <div className="col">
                <Link
                  to={`/update/${product.id}`}
                  className="btn btn-info btn-sm text-white"
                >
                  Modify
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => DeleteProduct(product.id, fetchProducts)}
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

export default ShowProducts;
