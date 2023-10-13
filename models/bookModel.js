import { Schema } from 'mongoose'

// Harry Potter 1 Book img: https://m.media-amazon.com/images/I/51SkIDTd9rL._SY445_SX342_.jpg
// harry Potter 2 Book img:
// harry Potter 3 Book img:
// harry Potter 4 Book img:
// harry Potter 5 Book img:
// harry Potter 6 Book img:
// harry Potter 7 Book img:

// Lord of the rings 1,2,3
// Find well known books
// cracking the coding Interview
// Clean Code


const schema = new Schema({
  title: {
    type: String,
    required: [true, 'No Title.'],
  },
  author: {
    type: String,
    required: [true, 'No Last Name.'],
  },
  price: {
    type: Number,
    required: [true, 'No Price.'],
  },
  img: {
    type: String,
  },
})

export default schema
