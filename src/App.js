import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ShowBooks from "./components/ShowBooks";
import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import BookList from "./pages/BookList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="list" element={<ShowBooks />} />
          <Route path="add" element={<AddBook />} />
          <Route path="update/:id" element={<UpdateBook />} />
          <Route path="google" element={<BookList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
