const mongoose = require("mongoose");
const express = require("express");
const schema = require("../models/schema");
const Book = mongoose.model('Book', schema);

const app = express();


const getABook = (req, res) => {
  Book.findOne({
    _id: req.params.id
  }, (err, foundBooks) => {
    if (foundBooks) {
      res.json(foundBooks)
    } else {
      res.status(404).send("No Book found with that id");
    }
  })
};

const addABook = (req, res) => {

  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price
  });

  newBook.save(function(err) {
    if (!err) {
      res.status(201).send("Successfully added a Book");
    } else {
      res.send(err);
    }
  });
}

const getAllBooks = (req, res) => {
  Book.find((err, foundBooks) => {
    if (!err) {
      res.send(foundBooks);
    } else {
      console.log(err);
    }
  })
};

const updateABook = (req, res) => {
  Book.update({
    _id: req.params.id
  }, {
    $set: req.body
  }, (err) => {
    if (!err) {
      res.send("Successfully updated book.");
    } else {
      res.status(404).send("No books found mathing that id.");
    }
  });
};

const deleteABook = (req, res) => {
  Book.deleteOne({
      _id: req.params.id
    },
    (err, foundBook) => {
      if (foundBook) {
        res.status(202).send("Successfully deleted book")
      } else {
        res.status(404).send("No books found mathing that id.");
      }
    })
};

module.exports = {
  addABook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook
};
