import { model } from 'mongoose'
// import bookSchema from '../models/schema.js'
import bookSchema from '../models/bookModel.js'
const Book = model('Book', bookSchema)
import asyncHandler from 'express-async-handler'

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

const addABook = asyncHandler(async (req, res) => {
  const data = req.body

  const book = await Book.create(data)

  if (book) {
    res.status(201).json({ error: false, statusCode: 201, data: book, })
  } else {
    res.status(400).send({ error: true, statusCode: 400, message: 'Invalid book data' })
  }
})

// const addABook = async (req, res) => {
//   const newBook = new Book({
//     title: req.body.title,
//     author: req.body.author,
//     price: req.body.price,
//   })

//   const book = await Book.create({
//     title: req.body.title,
//     author: req.body.author,
//     price: req.body.price,
//   })

//   if (book) {
//     res.status(201).json({
//       status: 201,
//       data: {
//         book
//       },
//     })
//   } else {
//     res.status(400).send('Invalid book Data')
//   }
// }


const getAllBooks = async (req, res) => {
  const books = await Book.find({})
  res.send(books)
}

// const updateABook = (req, res) => {
//   Book.update(
//     {
//       _id: req.params.id,
//     },
//     {
//       $set: req.body,
//     },
//     (err) => {
//       if (!err) {
//         res.send({
//           error: false,
//           statusCode: 200,
//           message: 'Successfully updated book.',
//         })
//       } else {
//         res.status(404).send({
//           error: true,
//           statusCode: 404,
//           message: 'No books found mathing that id.',
//         })
//       }
//     }
//   )
// }
const updateABook = asyncHandler(async (req, res) => {
  const id = req.params.id
  const bookUpdated = await Book.updateOne({ _id: id }, { $set: req.body }, { new: true })
  res.send({ error: false, statusCode: 200, data: bookUpdated })
})

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
