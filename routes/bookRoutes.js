const { Router, json } = require("express");
const router = Router();
const { readFile, writeFile } = require("../utils/fileHandler");
const { v4: uuid4 } = require("uuid");
const { errorResponse, successResponse } = require("../utils/response");
const addBookSchema = require("../utils/validator");

/////////////////////////////////////////////////////// GETTING ALL BOOKS
router.get("/books", async (req, res) => {
  const allBooks = await readFile("books.json");
  const message = successResponse("Books Retrieved Succesfully!", allBooks);
  res.json(message);
});

//////////////////////////////////////////////////////// GETTING A SINGLE BOOK
router.get("/books/:id", async (req, res) => {
  //getting id from url
  const id = req.params.id;
  //getting all books
  const allBooks = await readFile("books.json");
  //finding a matching book
  const book = allBooks.find((book) => book.id === id);
  if (!book) {
    const message = errorResponse(
      `Book with id: ${id} not found!`,
      null,
      `Book with id: ${id} not found!`
    );
    return res.json(message);
  }
  const message = successResponse("Book retrieved successfully!", book);
  res.json(message);
});

////////////////////////////////////////////////////////////// ADDING A BOOK
router.post("/books", async (req, res) => {
  // getiting data from  request body and validating

  const { value, error } = addBookSchema.validate(req.body);
  if (error) {
    const message = errorResponse(
      error.details[0].message,
      value,
      error.details[0]
    );
    return res.json(message);
  }

  //creating a new book
  const newBook = {
    id: uuid4(),
    genre: value.genre,
    title: value.title,
    author: value.author,
    year: value.year,
    description: value.description,
    image: value.image,
  };
  //getting all books
  const allBooks = await readFile("books.json");
  //adding new book to array
  allBooks.push(newBook);
  //rewriting books Array
  writeFile("books.json", allBooks);
  //responding with added book
  const message = successResponse("Book added successfully!", newBook);
  res.json(message);
});

////////////////////////////////////////////////////////////// UPDATING A BOOK
router.put("/books/:id", async (req, res) => {
  //getting id from url
  const id = req.params.id;
  // getiting data from  request body
  const { genre, title, author, year, description, image } = req.body;
  //getting all books
  const allBooks = await readFile("books.json");
  // finding a matching book
  const matchedBookIndex = allBooks.findIndex((book) => book.id === id);
  if (matchedBookIndex === -1) {
    const message = errorResponse(
      "No matching book found!",
      { genre, title, author, year, description, image },
      "No matching book found!"
    );
    return res.json(message);
  }
  // updating the matched book
  allBooks[matchedBookIndex] = {
    id: allBooks[matchedBookIndex].id,
    genre: !genre ? allBooks[matchedBookIndex].genre : genre,
    title: !title ? allBooks[matchedBookIndex].title : title,
    author: !author ? allBooks[matchedBookIndex].author : author,
    year: !year ? allBooks[matchedBookIndex].year : year,
    description: !description
      ? allBooks[matchedBookIndex].description
      : description,
    image: !image ? allBooks[matchedBookIndex].image : image,
  };
  //rewriting books Array
  writeFile("books.json", allBooks);
  //sending updated book
  const updatedBook = allBooks[matchedBookIndex];
  const message = successResponse("Book Updated successfully!", updatedBook);
  res.json(message);
});

////////////////////////////////////////////////////////////// DELETING A BOOK

router.delete("/books/:id", async (req, res) => {
  //getting id from url
  const id = req.params.id;
  //getting all books
  let allBooks = await readFile("books.json");
  //finding a matching book
  const matchedBook = allBooks.find((book) => book.id === id);
  if (!matchedBook) {
    const message = errorResponse(
      `Book with id : ${id} not found!`,
      null,
      `Book with id : ${id} not found!`
    );
    return res.json(message);
  }
  //deleting the matched book
  allBooks = allBooks.filter((book) => book.id !== id);
  //rewriting books Array
  writeFile("books.json", allBooks);
  //sending deleted book
  const message = successResponse("Book deleted successfully!", matchedBook);
  res.json(message);
});

module.exports = router;
