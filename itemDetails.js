document.addEventListener("DOMContentLoaded", () => {
  const selectedBook = JSON.parse(localStorage.getItem("selectedBook"));
  if (selectedBook) {
    const bookImage = document.getElementById("bookImage");
    const bookTitle = document.getElementById("bookTitle");
    const bookAuthor = document.getElementById("bookAuthor");
    const bookDescription = document.getElementById("bookDescription");
    const bookPageCount = document.getElementById("bookPageCount");
    const bookPublishingDate = document.getElementById("bookPublishingDate");
    const bookAverageRating = document.getElementById("bookAverageRating");

    bookImage.src =
      selectedBook.volumeInfo.imageLinks?.thumbnail ||
      "./asset/default-image.jpg";
    bookTitle.innerHTML = selectedBook.volumeInfo.title;
    bookAuthor.innerHTML = selectedBook.volumeInfo.authors || "Unknown Author";
    bookDescription.innerHTML =
      selectedBook.volumeInfo.description || "No description available";
    bookPageCount.innerHTML =
      "Page Count: " + (selectedBook.volumeInfo.pageCount || "N/A");
    bookPublishingDate.innerHTML =
      "Publishing Date: " + (selectedBook.volumeInfo.publishedDate || "N/A");
    bookAverageRating.innerHTML =
      "Average Rating: " + (selectedBook.volumeInfo.averageRating || "N/A");
  } else {
    console.error("No selected book found.");
  }
});
