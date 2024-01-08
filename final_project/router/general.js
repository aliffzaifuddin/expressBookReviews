const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


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
  res.send(JSON.stringify(books, null,4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',  function (req, res) {
  const ISBN = req.params.isbn
  res.send(books[ISBN])
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const arraybooks = Object.keys(books);
    arraybooks.forEach((key, index)=>{
        if(books[key].author === author){
            res.send(books[key],null,10);
        }
        else{
            return res.status(300).json({message: "Can't find author with such a name"});
        }
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const arraybooks = Object.keys(books);
    arraybooks.forEach((key, index)=>{
        if(books[key].title === title){
            res.send(books[key],null,10);
        }
        else{
            return res.status(300).json({message: "Can't find title with such a name"});
        }
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const ISBN = req.params.isbn
    res.send(books[ISBN].reviews)
});

module.exports.general = public_users;
