import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="container text-center"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/library.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 style={{ fontSize: "150px", color: "white" }}>BOOK</h1>
      <div style={{ marginTop: "20px" }}>
        <Link
          to="/add"
          className="btn btn-primary"
          style={{
            margin: "10px",
            width: "160px",
          }}
        >
          Add Book To Cart
        </Link>
        <Link
          to="/google"
          className="btn btn-primary"
          style={{
            margin: "10px",
            width: "160px",
          }}
        >
          Show Book List
        </Link>
      </div>
    </div>
  );
};

export default Home;
