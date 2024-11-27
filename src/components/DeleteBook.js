const DeleteBook = (id, fetchBooks) => {
  if (window.confirm("Are you sure you want to delete this book?")) {
    fetch(`https://6746607e512ddbd807fba991.mockapi.io/Book/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) fetchBooks();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }
};

export default DeleteBook;
