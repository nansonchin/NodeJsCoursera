const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid

    let filter_username=users.filter((user)=>{
    return user.username===username
    });

    if(filter_username.length>0){
        return false;
    }else{
        return true;

    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
let allowed=users.filter((user)=>{
    return(user.username===username && user.password===password)
});
if(allowed.length>0){
    return true;
}else{
    return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here'
  const username=req.body.username;
  const password=req.body.password;
  if(!username || !password){
      return res.status(404).json({message:"Error Login"});
  }
  if(authenticatedUser(username,password)){
      let accessToken=jwt.sign({
          data:password
      },'access',{expiresIn:60*60});
      req.session.authorization={
          accessToken,username
      }
      return res.status(200).json({message:"User is now login"});
  }else
  return res.status(208).json({message: "Check Your Login username and password"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const username=req.session.authorization.username;
  const isbn=req.params.isbn;
  const reviewText=req.query.reviews;
  //runnable
  if(!isbn ||!reviewText){
      res.status(404).json({message:"Reveiew and ISBN number is empty"});
  }
  if(books[isbn]){
     //update review
      if(books[isbn].reviews[username]){
          books[isbn].reviews[username]=reviewText;
          return res.status(300).json({message:"Review have been updated"});
      }else{
          //add review
          books[isbn].reviews[username]=reviewText;
          return res.status(300).json({message:"Review have been added"});
      }
  }


});

regd_users.delete("/auth/review/:isbn",(req, res) => {
    const isbn=req.params.isbn;
    const username=req.session.authorization.username;

    if(books[isbn]){
        if(books[isbn].reviews[username]){
            delete books[isbn].reviews[username];
            res.status(300).json({message:"The review has been deleted"})
        }else{
            res.status(404).json({message:"Review for this books is not found"});
        }
    }else{
        res.status(404).json({message:"Book for this ISBN is not found"})
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
