import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: false,
    },
    lastName: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    address: {
      type: String,
    },
    userRights: {
      type: String,
      require: true,
    },
    credits: {
      type: Number,
      default: 0,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CV',
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// the same as above but for the update user password
userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate()
  if (!update.password) {
    return next() // If password is not being updated, skip password rehashing
  }

  const salt = await bcrypt.genSalt(10)
  update.password = await bcrypt.hash(update.password, salt)
  return next()
})

const User = mongoose.model('User', userSchema)

export default User
