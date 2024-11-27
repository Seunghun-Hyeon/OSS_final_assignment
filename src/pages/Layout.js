import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <div
        style={{ padding: "7px", backgroundColor: "#007BFF", border: "3px" }}
      >
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            gap: "10px",
            margin: "0",
          }}
        >
          <li>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "white",
                padding: "10px 20px",
                display: "inline-block",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/list"
              style={{
                textDecoration: "none",
                color: "white",
                padding: "10px 20px",
                display: "inline-block",
              }}
            >
              Go To My Cart
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              style={{
                textDecoration: "none",
                color: "white",
                padding: "10px 20px",
                display: "inline-block",
              }}
            >
              Add Book To Cart
            </Link>
            <Link
              to="/google"
              style={{
                textDecoration: "none",
                color: "white",
                padding: "10px 20px",
                display: "inline-block",
              }}
            >
              Go To Book List
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
}
