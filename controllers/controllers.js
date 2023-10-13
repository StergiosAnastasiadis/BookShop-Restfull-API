import mongoose from 'mongoose'
import schema from '../models/schema.js'
const Book = mongoose.model('Book', schema)

const getABook = (req, res) => {
  Book.findOne(
    {
      _id: req.params.id,
    },
    (err, foundBooks) => {
      if (foundBooks) {
        res
          .status(200)
          .json({ error: false, statusCode: 200, data: foundBooks })
      } else {
        res
          .status(404)
          .send({ error: true, statusCode: 404, message: '"Book not found"' })
      }
    }
  )
}

const addABook = (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
  })

  newBook.save(function (err) {
    if (!err) {
      res.status(201).send({
        error: false,
        statusCode: 201,
        data: 'Successfully added a Book',
      })
    } else {
      res.send(err)
    }
  })
}

const getAllBooks = (req, res) => {
  Book.find((err, foundBooks) => {
    if (!err) {
      res.send({ error: false, statusCode: 200, data: foundBooks })
    } else {
      console.log(err)
    }
  })
}

const updateABook = (req, res) => {
  Book.update(
    {
      _id: req.params.id,
    },
    {
      $set: req.body,
    },
    (err) => {
      if (!err) {
        res.send({
          error: false,
          statusCode: 200,
          message: 'Successfully updated book.',
        })
      } else {
        res.status(404).send({
          error: true,
          statusCode: 404,
          message: 'No books found mathing that id.',
        })
      }
    }
  )
}

const deleteABook = (req, res) => {
  Book.deleteOne(
    {
      _id: req.params.id,
    },
    (err, foundBook) => {
      if (foundBook) {
        res.status(202).send({
          error: false,
          statusCode: 202,
          message: 'Successfully deleted book',
        })
      } else {
        res.status(404).send({
          error: error,
          statusCode: 404,
          message: 'No books found mathing that id.',
        })
      }
    }
  )
}

export { addABook, getAllBooks, getABook, updateABook, deleteABook }
