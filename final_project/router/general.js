const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// registering a new user
public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',  function (req, res) {
  bookList = JSON.stringify(books,null,4)
  const getBooks = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(res.send(bookList))
    }, 2000)
  })
  getBooks;
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',  function (req, res) {
  const ISBN = req.params.isbn
  const getBooksByIsbn = new Promise((resolve,reject) => {
    setTimeout(() => {
        if(books[ISBN]) {
            resolve(res.send(books[ISBN]))
        }
        else {
            reject(res.status(404).json({message:"book not found"}));
        }
    }, 2000)
  })
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author
  let newBookArray = []
  for(let isbn in books) {
      if(books[isbn].author === author){
          newBookArray.push(books[isbn])
      }
  }
  res.send(newBookArray)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title
  let newBookArray = []
  for (let isbn in books) {
      if (books[isbn].title === title) {
          newBookArray.push(books[isbn])
      }
  }
  res.send(newBookArray)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const ISBN = req.params.isbn
    res.send(books[ISBN].reviews)
});

module.exports.general = public_users;
