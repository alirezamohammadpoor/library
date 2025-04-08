const bookContainer = document.querySelector(".container");

const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.bookId = crypto.randomUUID();
  this.info = function () {
    let readStatus;
    if (this.read === true || this.read === "read") {
      readStatus = "read";
    } else {
      readStatus = "not read yet";
    }
    return (
      this.title +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages, " +
      readStatus
    );
  };
}

function addBookToLibrary(title, author, pages, read) {
  const userInput = new Book(title, author, pages, read);
  myLibrary.push(userInput);
}

addBookToLibrary("Harry Potter", "Rowling", 365, true);
addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, false);

function displayBooks() {
  myLibrary.forEach((item) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-div");
    bookDiv.dataset.id = item.bookId;
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = item.title;
    const bookAuthor = document.createElement("span");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = "by: " + item.author;
    const numberOfPages = document.createElement("span");
    numberOfPages.classList.add("book-pages");
    numberOfPages.textContent = "Number of pages: " + item.pages;

    const removeBook = document.createElement("button");
    removeBook.dataset.id = item.bookId;
    removeBook.classList.add("remove-book");
    removeBook.innerHTML = "Remove Book";
    removeBook.addEventListener("click", () => {
      const bookId = removeBook.dataset.id;
      const index = myLibrary.findIndex((book) => book.bookId === bookId);
      myLibrary.splice(index, 1);
      bookContainer.innerHTML = "";
      displayBooks();
    });

    const readBook = document.createElement("button");
    readBook.dataset.id = item.bookId;
    readBook.classList.add("read-book");
    readBook.innerHTML = "Read";
    readBook.addEventListener("click", () => {
      const readBookId = readBook.dataset.id;
      const index = myLibrary.findIndex((book) => book.bookId === readBookId);
      const book = myLibrary[index];
      book.read = !book.read;
      bookContainer.innerHTML = "";
      displayBooks();
    });

    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(numberOfPages);
    bookDiv.appendChild(removeBook);
    bookDiv.appendChild(readBook);
    bookContainer.appendChild(bookDiv);
  });
}

displayBooks();

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#pages");
  const readInput = document.querySelector("#read");

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const read = readInput.checked;
  console.log(title, author, pages, read); // Before addBookToLibrary
  addBookToLibrary(title, author, pages, read);
  console.log(myLibrary); // After addBookToLibrary
  bookContainer.innerHTML = "";
  displayBooks();
});
