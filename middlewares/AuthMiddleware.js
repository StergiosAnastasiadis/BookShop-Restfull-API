import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt

  if (!token) {
    res.status(401).send({error: true, statusCode: 401,message: 'Not authorized, no token',})
    return
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  const user = await User.findById(decoded.userId).select('-password')

  if (!user) {
    res.status(401).send({error: true,statusCode: 401,message: 'Not authorized, token failed',})
    return
  }

  req.user = user
  next()
})

export { protect }











// You are a light user and you can access the protected methods,
// Do not Compare
// You are good
// set up your own project and have it if a buisiness comes


// let token;

// token = req.cookies.jwt;

// if (token) {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.userId).select('-password');

//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).send({error: true, statusCode: 401, message: 'Not authorized, token failed'})
//   }
// } else {
//   res.status(401).send({error: true, statusCode: 401, message: 'Not authorized, no token'})
// }
