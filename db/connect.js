import { connect } from 'mongoose'

export async function connectDB() {
  try {
    const conn = await connect(process.env.DB_URL)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
