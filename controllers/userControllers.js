import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../services/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      companyName: user.companyName,
      address: user.address,
    })
  } else {
    res.status(400).send({
      error: true,
      statusCode: 400,
      message: 'Invalid email or password',
    })
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(409).send('Email already exists')
  }

  const userRights = 'User'
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    userRights,
  })

  if (user) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userRights: user.userRights,
    })
  } else {
    res.status(400).send('Invalid user data')
  }
})

export { registerUser, authUser }
