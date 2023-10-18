const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios=require('axios');

public_users.post("/register", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (isValid(username)) {
            users.push({ "username": username, "password": password });
            res.status(300).json({ message: "User name is successfully register ino database" });
        }
        else {
            res.status(300).json({ message: "Username exist. Please Change!" });
        }
    }
    else {
        res.status(404).json({ message: "Server Error Unable Register" });
    }

});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here
//   return res.status(300).json(books);
// });

//get all book using async and promise Callback

public_users.get('/',function (req, res) {
  //Write your code here
  let promise=new Promise((resolve,reject)=>{
      setTimeout(()=>{
          resolve(books);
      },6000);
  });
  promise
    .then((data)=>{
        res.status(200).json({data})
    })
    .catch((error)=>{
        res.status(404).json({message:"Erro when getting book list"})
    });

});


// Get book details based on ISBN
// public_users.get('/isbn/:isbn', function (req, res) {
//     //Write your code here
//     const bookISBN = parseInt(req.params.isbn);
//     return res.status(300).json(books[bookISBN]);
// });

// Get book details based on ISBN async and promise
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    const bookISBN = parseInt(req.params.isbn);
    let promise=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(books[bookISBN]);
        },6000);
    });
    promise
      .then((data)=>{
          res.status(200).json({data})
      })
      .catch((error)=>{
          res.status(404).json({message:"Error when searching By ISBN"})
      });
  
  });


// Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//     //Write your code here
//     const authorToFind = req.params.author;

//     const booksValue = Object.values(books);
//     let filtered_author = booksValue.filter((book) => book.author === authorToFind)

//     if (filtered_author.length > 0) {
//         return res.status(200).json(filtered_author);
//     } else {
//         return res.status(401).json({ message: "Book Author Not Found" });
//     }
// });

// Get all books based on author async and promise
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const authorToFind = req.params.author;
    const booksValue = Object.values(books);

    let promise=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const filtered_author=booksValue.filter((book)=>book.author===authorToFind);
            if(filtered_author.length>0){
                resolve(filtered_author);
            }else{
                reject("Book Author Not Found");
            }
        },6000);
    });
    promise
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((error)=>{
        res.status(404).json({message:error});
    })
});


// Get all books based on title 
// public_users.get('/title/:title', function (req, res) {
//     //Write your code here
//     const titleFinding = req.params.title;
//     const booksValue = Object.values(books);

//     let filtered_title = booksValue.filter((book) => book.title === titleFinding)

//     if (filtered_title.length > 0) {
//         return res.status(200).json(filtered_title);
//     } else {
//         return res.stats(401).json({ message: "Book Title not Found" });
//     }
// });

// Get all books based on title async and promise
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const titleFinding = req.params.title;
    const booksValue = Object.values(books);

    let promise=new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const filtered_title=booksValue.filter((book)=>book.title===titleFinding);
            if(filtered_title.length>0){
                resolve(filtered_title);
            }else{
                reject("Book Title Not Found");
            }
        },6000);
    });
    promise
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((error)=>{
        res.status(404).json({message:error});
    })
});


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const reviewISBN = parseInt(req.params.isbn);
    const booksValues = Object.values(books);

    if (books[reviewISBN - 1]) {
        const b_review = booksValues[reviewISBN - 1].reviews
        res.status(300).json(b_review);
    } else {
        return res.status(300).json({ message: "Books Review Based ISBN NOT FOUND" });
    }

});

module.exports.general = public_users;
