document.addEventListener("DOMContentLoaded", () => {
  searchBooks("");
});
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const apiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
const listOfItems = document.getElementsByClassName("list_items")[0];
const defaultSearch = "software+development";
searchButton.addEventListener("click", handleSearch);
function handleSearch() {
  const searchQuery = searchInput.value.trim();
  searchBooks(searchQuery);
}

function searchBooks(query) {
  const formattedQuery = encodeURIComponent(query);
  const searchUrl = apiUrl + defaultSearch + formattedQuery;

  fetch(searchUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      listOfItems.innerHTML = "";
      const info = data.items;

      if (!info || info.length === 0) {
        throw new Error("No results found");
      }

      info.map((item) => {
        const li = document.createElement("li");
        const bookInfo = document.createElement("div");
        const author = document.createElement("h5");
        const title = document.createElement("h3");
        const image = document.createElement("img");
        title.innerHTML = item.volumeInfo.title;
        author.innerHTML = item.volumeInfo.authors;
        image.src =
          item.volumeInfo.imageLinks?.thumbnail || "./asset/default-image.jpg";
        bookInfo.appendChild(image);
        bookInfo.appendChild(title);
        bookInfo.appendChild(author);
        li.appendChild(bookInfo);
        li.addEventListener("click", goToNextPage);
        function goToNextPage() {
          window.location.href = "itemDetails.html";
          localStorage.setItem("selectedBook", JSON.stringify(item));
        }
        listOfItems.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
