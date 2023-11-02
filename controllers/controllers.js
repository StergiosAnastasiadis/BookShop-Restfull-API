import { model } from 'mongoose'
// import bookSchema from '../models/schema.js'
import bookSchema from '../models/bookModel.js'
const Book = model('Book', bookSchema)

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

const addABook = async (req, res) => {
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
  })

  // newBook.save(function (err) {
  //   if (!err) {
  //     res.status(201).send({
  //       error: false,
  //       statusCode: 201,
  //       data: 'Successfully added a Book',
  //     })
  //   } else {
  //     res.send(err)
  //   }
  // })
  const book = await Book.create({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
  })

  if (book) {
    res.status(201).json({
      status: 201, 
      data: {
        book
      },
    })
  } else {
    res.status(400).send('Invalid book Data')
  }
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
